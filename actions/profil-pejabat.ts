"use server";
import axiosInstance from "@/utils/axios";

export async function getProfilPejabat() {
    try {
        const result = await axiosInstance.get('profil-pejabats');
        if(result.status == 200) {
            return {
                status: true,
                data: JSON.parse(JSON.stringify(result.data))
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

export async function getProfilPejabatById(id:string) {
    try {
        const result = await axiosInstance.get(`profil-pejabats/${id}?populate[pejabats][populate][0]=Poto`);
        if(result.status == 200) {
            return {
                status: true,
                data: JSON.parse(JSON.stringify(result.data))
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