"use server";
import { sendEmail } from "@/lib/email";
import prisma from "@/lib/prisma"
import { StatusAduan } from "@prisma/client";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

export async function getLayananAduan(page = 1, limit = 20) {
    const [tiket, total] = await prisma.$transaction([
        prisma.tiketAduan.findMany({
            include: {
                kategoriLayanan: true
            },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.tiketAduan.count()
    ]);

    return { tiket, total };
}

export async function saveLayananAduan({
    nik,
    nama,
    noTelepon,
    email,
    kategoriLayananId,
    isiAduan
}:{
    nik: string,
    nama: string,
    noTelepon: string,
    email: string,
    kategoriLayananId: number,
    isiAduan: string
}) {
    try {

        const save = await prisma.tiketAduan.create({
            data: {
                nik: nik,
                nama: nama,
                noTelepon: noTelepon,
                email: email,
                isiAduan: isiAduan,
                statusAduan: StatusAduan.START,
                kategoriLayananId: kategoriLayananId,
                notiket: uuidv4(),
                keyToken: generateRandomMixedString()
            }
        });

        if(!save) {
            return {
                status: false,
                data: null
            }
        }

        //send notiket ke email
        const url = process.env.NEXTAUTH_URL;
        sendEmail({
            to: email,
            subject: "Notifikasi Tiket Aduan",
            html: `Terima kasih atas ketepatan anda dalam melaporkan aduan. Kami akan segera merespon anda.
            <br/>Nomor Tiket Aduan anda adalah : <strong>${save.notiket}</strong><br/><br/>
            Untuk memantau tiket anda, silahkan klik link ${url}/tracking-layanan/${save.notiket}?key=${save.keyToken}`
        });

        return {
            status: true,
            data: save
        }
    } catch(err) {
        console.log(err);
        return {
            status: false,
            data: null
        }
    }
}

export async function getDetailTiket(id: string, key: string) {
    try {
        const tiket = await prisma.tiketAduan.findFirst({
            where: {
                notiket: id,
                keyToken: key
            },
            include: {
                kategoriLayanan: true,
                ChatAduan: true
            }
        });
        if(!tiket) {
            return {
                status: false,
                data: null
            }
        }
        return {
            status: true,
            data: tiket
        }
    }catch(err) {
            console.log(err);
            return {
                status: false,
                data: null
            }
    }
}

export async function sendChatAduan({
    notiket,
    tiketAduanId,
    adminText,
    aduanText,
    imgText,
    userId
}: {
    notiket:string,
    tiketAduanId: number,
    adminText?: string,
    aduanText?: string,
    imgText?: string,
    userId?: number
}) {
    try {
        const save = await prisma.chatAduan.create({
            data: {
                tiketAduanId: tiketAduanId,
                userId: userId,
                adminText: adminText,
                aduanText: aduanText,
                imgText: imgText
            }
        });
        if(!save) {
            return {
                status: false
            }
        }
        revalidatePath(`/tracking-layanan/${notiket}`)
        return {
            status: true
        }
    } catch (e) {
        return {
            status: false
        }
    }
}

export async function deleteAduan(id: string) {
    try {
        await prisma.chatAduan.deleteMany({
            where: {
                tiketAduanId: parseInt(id)
            }
        })
    
        await prisma.tiketAduan.delete({
            where: {
                id: parseInt(id),
            }
        });

        revalidatePath('/get-panel/manage-layanan', 'page');
        return {
            status: true
        }
    } catch (e) {
        console.log(e);
        return {
            status: false
        }
    }
}

export async function closeLayanan(id:string) {
    try {
        const tiket = await prisma.tiketAduan.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                statusAduan: true,
                notiket: true,
                keyToken: true
            }
        });

        // Check if the tiket exists
        if (!tiket) {
            return {
                status: false,
                message: 'Tiket tidak ditemukan'
            };
        }

        // Determine the new status based on the current status
        const newStatus = tiket.statusAduan === 'START' ? 'FINISH' : 'START';
        const d = await prisma.tiketAduan.update({
            where: {
                id: parseInt(id),
            },
            data: {
                statusAduan: newStatus
            }
        });
        revalidatePath(`/tracking-layanan/${d.notiket}?key=${d.keyToken}`)
        return {
            status: true
        }
    } catch (e) {
        return {
            status: false
        }
    }
}

function generateRandomMixedString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    // Function to generate 4 random characters from the specified set
    const getRandomChars = (length: number) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
  
    const part1 = getRandomChars(6);
    const part2 = getRandomChars(6);
  
    return `${part1}-${part2}`;
}