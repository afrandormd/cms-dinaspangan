"use server";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";


export async function getPengumuman(page = 1, limit = 20) {
    const [pengumuman, total] = await prisma.$transaction([
        prisma.pengumuman.findMany({
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.pengumuman.count()
    ]);

    return { pengumuman, total };
}

export async function savePengumuman({judul,isi}:{judul:string,isi:string}) {
    try {
        const newPengumuman = await prisma.pengumuman.create({
            data: {
                judul,
                isi
            }
        });
        revalidatePath('/get-panel/pengumuman', 'page');
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

export async function updatePengumuman({id,judul,isi}:{id:number,judul:string,isi:string}) {
    try {
        const newPengumuman = await prisma.pengumuman.update({
            where: {
                id: id,
            },
            data: {
                judul,
                isi
            }
        });
        revalidatePath('/get-panel/pengumuman', 'page');
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


export async function deletePengumuman({id}:{id:number}) {
    try {
        const newPengumuman = await prisma.pengumuman.delete({
            where: {
                id: id,
            },
        });
        revalidatePath('/get-panel/pengumuman', 'page');
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