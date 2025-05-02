"use server";
import prisma from "@/lib/prisma"

export async function getTugasFungsi() {
    try {
        const result = await prisma.site.findFirst({
            where: {
                id: 1,
            },
        });
        if(result) {
            return {
                status: true,
                data: JSON.parse(JSON.stringify(result))
            }
        } else {
            return {
                status: false,
                data: null
            }
        }
    } catch (error) {
        return {
            status: false,
            data: null
        }
    }
   
}