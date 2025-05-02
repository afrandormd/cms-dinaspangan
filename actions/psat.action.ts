"use server";
import { sendEmail } from "@/lib/email";
import prisma from "@/lib/prisma"
import { format } from "date-fns";
import { revalidatePath } from "next/cache";


export async function getPsat(page = 1, limit = 20) {
    const [psat, total] = await prisma.$transaction([
        prisma.layananPsat.findMany({
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.layananPsat.count()
    ]);

    return { psat, total };
}

export async function savePsat({
    pelakuUsaha,
    namaPimpinan,
    pic,
    noPic,
    alamat,
    komoditasUtama,
    komoditasTambahan,
    keterangan,
    email,
    doc,
}:{
    pelakuUsaha :string,
    nomorRegister :string,
    statusPengajuan :string,
    namaPimpinan:string,
    pic         :string,
    noPic       :string,
    alamat      :string,
    komoditasUtama    :string,
    komoditasTambahan :string,
    keterangan  :string,
    email       :string,
    doc         :string,}) {
    try {
        let newNo = await generateNomorRegister();
        const newPsat = await prisma.layananPsat.create({
            data: {
                jenisRegistrasi:'PSAT',
                pelakuUsaha :pelakuUsaha,
                nomorRegister :newNo,
                statusPengajuan : "PERMOHONAN",
                namaPimpinan :namaPimpinan,
                pic         :pic,
                noPic       :noPic,
                alamat      :alamat,
                komoditasUtama    :komoditasUtama,
                komoditasTambahan :komoditasTambahan,
                keterangan  :keterangan,
                email       :email,
                doc         :doc,
            }
        });

        if(newPsat) {
            //send mailer nomor register
            sendEmail({
                to: email,
                subject: "Nomor Pendaftaran Layanan PSAT",
                html: `Terima kasih atas kepercayaan Anda dalam melakukan pendaftaran layanan PSAT. Berikut ini nomor pendaftaran Anda: ${newPsat.nomorRegister}. Silahkan tunggu hingga admin Dinas Pangan memberikan respon Anda.`  
            })
        }

        revalidatePath('/layanan', 'page');
        return {
            status: true,
            data: newPsat
        }
    } catch (e) {
        return {
            status: false,
            data: null
        }
    }
}

export async function checkStatusPsat({nomorRegister}:{nomorRegister:string}) {
    try {
        const result = await prisma.layananPsat.findFirst({
            where: {
                nomorRegister: nomorRegister
            }
        });
        if(result) {
            return result.statusPengajuan;
        }
        return "ERROR";
    } catch (e) {
        return "ERROR";
    }
}

async function generateNomorRegister() {
    const today = format(new Date(), "yyyyMMdd");
    const lastRegister = await prisma.layananPsat.findFirst({
        where: {
          nomorRegister: {
            startsWith: today,
          },
        },
        orderBy: {
            nomorRegister: "desc",
        },
      });
    
      let increment = 1;
    
      if (lastRegister) {
        const lastIncrement = parseInt(lastRegister.nomorRegister!.slice(-3));
        increment = lastIncrement + 1;
      }
    
      const newRegisterNumber = `${today}${String(increment).padStart(3, "0")}`;
    
      return newRegisterNumber;
}

export async function updatePsat({id,statusPengajuan,tanggalTerbit,tanggalBerakhir}:{id:number,statusPengajuan:string,tanggalTerbit:string,tanggalBerakhir:string}) {
    try {

        const res = await prisma.layananPsat.update({
            where: {
                id: id,
            },
            data: {
                statusPengajuan: statusPengajuan,
                tanggalTerbit: statusPengajuan === "DITERIMA" ? new Date(tanggalTerbit) : null,
                tanggalBerakhir: statusPengajuan === "DITERIMA" ? new Date(tanggalBerakhir) : null,
            }
        });
        revalidatePath('/get-panel/psat', 'page');
        return {
            status: true,
            data: res
        }
    } catch (e) {
        return {
            status: false,
            data: null
        }
    }
}


export async function deletePsat({id}:{id:number}) {
    try {
        const newPengumuman = await prisma.layananPsat.delete({
            where: {
                id: id,
            },
        });
        revalidatePath('/get-panel/psat', 'page');
        return {
            status: true,
            data: newPengumuman
        }
    } catch (e) {
        return {
            status: false,
            data: null
        }
    }
}

export async function getPengumumanLast(){
    try {
        const results = await prisma.pengumuman.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 5
        });
        if(results) {
            return {
                status: true,
                data: results
            }
        } else {
            return {
                status: false,
                data: []
            }
        }
    }catch(e) {
        return {
            status: false,
            data: []
        }
    } 
}