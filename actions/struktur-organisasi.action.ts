"use server";
import prisma from "@/lib/prisma";

export async function getStrukturOrganisasi() {
  try {
    const results = await prisma.identitasPegawai.findMany({
      where: {
        isShow: true,
      },
    });

    if (results) {
      return {
        status: true,
        data: JSON.parse(JSON.stringify(results)),
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
  } catch (error) {
    return {
      status: false,
      data: null,
    };
  }
}

export async function getStrukturOrganisasiById(id: any) {
  try {
    const results = await prisma.identitasPegawai.findFirst({
      where: {
        isShow: true,
        id: parseInt(id),
      },
    });

    if (results) {
      return {
        status: true,
        data: JSON.parse(JSON.stringify(results)),
      };
    } else {
      return {
        status: false,
        data: null,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      data: null,
    };
  }
}
