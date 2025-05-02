"use server";
import prisma from "@/lib/prisma"

export async function getSlider() {
    try {
        const results = await prisma.slider.findMany();
    
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
    } catch (error) {
        return {
            status: false,
            data: []
        }
    }
   
}