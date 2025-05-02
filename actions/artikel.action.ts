"use server";
import axiosInstance from "@/utils/axios";
import prisma from '@/lib/prisma';

export async function getArtikel(page = 1, limit = 20, q = "", k = "") {
    const [berita, total] = await prisma.$transaction([
        prisma.artikel.findMany({
            include: {
                kategoriArtikel: true
            },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                isPublish: true,
                ...(q && {judul : {
                    contains: q
                }}),
                ...(k && {kategoriArtikelId: parseInt(k)})
            }
        }),
        prisma.artikel.count({
            where: {
                isPublish: true,
                ...(q && {judul : {
                    contains: q
                }}),
                ...(k && {kategoriArtikelId: parseInt(k)})
            }
        })
    ]);

    return { berita, total };
}

export async function getArtikelBySlug(slug: string){
    try {
        const results = await prisma.artikel.findFirst({
            where: {
                slug: slug
            },
            include: {
                kategoriArtikel: true
            }
        });
        if(results) {
            return {
                status: true,
                data: results as any
            }
        } else {
            return {
                status: false,
                data: {}
            }
        }
    }catch(e) {
        console.log(e)
        return {
            status: false,
            data: {}
        }
    } 
}

export async function getArtikelLast(){
    try {
        const results = await prisma.artikel.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
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
        console.log(e)
        return {
            status: false,
            data: []
        }
    } 
}

export async function getArtikelForHome(){
    try {
        const results = await prisma.artikel.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 13,
            include: {
                kategoriArtikel: true
            }
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
        console.log(e)
        return {
            status: false,
            data: []
        }
    } 
}