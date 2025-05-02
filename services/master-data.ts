"use server";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";


export async function getKategoriArtikel() {
    const katArtikel = await prisma.kategoriArtikel.findMany();
    return katArtikel;
}

export async function saveKategoriArtikel({
    namaKategori
}:{
    namaKategori: string
}) {
    try {
        const save = await prisma.kategoriArtikel.create({
            data: {
                namaKategori: namaKategori
            }
        })

        revalidatePath('/get-panel/master-data', 'page');
        return {
            status: true
        }

    } catch (error) {
        return {
            status: false
        }
    }
}

export async function updateKategoriArtikel({
    id,
    namaKategori
}:{
    id: number,
    namaKategori: string
}) {
    try {
        const up = await prisma.kategoriArtikel.update({
            where: {
                id: id
            },
            data: {
                namaKategori: namaKategori
            }
        })
        
        revalidatePath('/get-panel/master-data', 'page');
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}

export async function deleteKategoriArtikel({
    id
}:{id: number}) {
    try {
        const del = await prisma.kategoriArtikel.delete({
            where: {
                id: id
            }
        })
        revalidatePath('/get-panel/master-data', 'page');
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}


export async function getKategoriDokumen() {
    const katDokumen = await prisma.kategoriDokumen.findMany();
    return katDokumen;
}

export async function saveKategoriDokumen({
    namaKategori
}:{
    namaKategori: string
}) {
    try {
        const save = await prisma.kategoriDokumen.create({
            data: {
                namaKategori: namaKategori
            }
        })

        revalidatePath('/get-panel/master-data', 'page');
        return {
            status: true
        }

    } catch (error) {
        return {
            status: false
        }
    }
}

export async function updateKategoriDokumen({
    id,
    namaKategori
}:{
    id: number,
    namaKategori: string
}) {
    try {
        const up = await prisma.kategoriDokumen.update({
            where: {
                id: id
            },
            data: {
                namaKategori: namaKategori
            }
        })
        
        revalidatePath('/get-panel/master-data', 'page');
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}

export async function deleteKategoriDokumen({
    id
}:{id: number}) {
    try {
        const del = await prisma.kategoriDokumen.delete({
            where: {
                id: id
            }
        })
        revalidatePath('/get-panel/master-data', 'page');
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}


export async function getKategoriLayanan() {
    const kat = await prisma.kategoriLayanan.findMany();
    return kat;
}

export async function saveKategoriLayanan({
    namaKategori
}:{
    namaKategori: string
}) {
    try {
        const save = await prisma.kategoriLayanan.create({
            data: {
                namaKategori: namaKategori
            }
        })

        revalidatePath('/get-panel/manage-layanan', 'page');
        return {
            status: true
        }

    } catch (error) {
        return {
            status: false
        }
    }
}

export async function updateKategoriLayanan({
    id,
    namaKategori
}:{
    id: number,
    namaKategori: string
}) {
    try {
        const up = await prisma.kategoriLayanan.update({
            where: {
                id: id
            },
            data: {
                namaKategori: namaKategori
            }
        })
        
        revalidatePath('/get-panel/manage-layanan', 'page');
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}

export async function deleteKategoriLayanan({
    id
}:{id: number}) {
    try {
        const del = await prisma.kategoriLayanan.delete({
            where: {
                id: id
            }
        })
        revalidatePath('/get-panel/manage-layanan', 'page');
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}