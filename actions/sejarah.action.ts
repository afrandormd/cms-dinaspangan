"use server";
import prisma from "@/lib/prisma"

export async function getSejarah() {
    try {
        const sejarah = await prisma.site.findFirst({
            where: {
                id: 1
            }
        });
        if(sejarah) {
            return {
                status: true,
                data: JSON.parse(JSON.stringify(sejarah))
            }
        } else {
            return {
                status: false,
                data: null
            }
        }
    } catch(error) {
        return {
            status: false,
            data: null
        }
    }
}