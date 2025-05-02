"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePejabat({
  nama,
  nip,
  isShow,
  foto,
  jenisKelamin,
  agama,
  golongan,
  jabatan,
  pendidikanTerakhir,
}: {
  nama: string;
  nip: string;
  isShow: boolean;
  foto: string;
  jenisKelamin: string;
  agama: string;
  golongan: string;
  jabatan: string;
  pendidikanTerakhir: string;
}) {
  try {
    const sa = await prisma.identitasPegawai.create({
      data: {
        namaPejabat: nama,
        nip: nip,
        isShow: isShow,
        foto: foto,
        jenisKelamin: jenisKelamin,
        jabatan: jabatan,
        agama: agama,
        golongan: golongan,
        pendidikanTerakhir: pendidikanTerakhir,
      },
    });

    revalidatePath("/get-panel/profil-pejabat", "page");
    return {
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
    };
  }
}

export async function getPegawai(page = 1, limit = 20) {
  const [pegawai, total] = await prisma.$transaction([
    prisma.identitasPegawai.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.artikel.count(),
  ]);

  return { pegawai, total };
}

export async function getDokumenById(id: number) {
  try {
    const results = await prisma.dokumen.findFirst({
      where: {
        id: id,
      },
      include: {
        kategoriDokumen: true,
      },
    });
    if (results) {
      return {
        status: true,
        data: results as any,
      };
    } else {
      return {
        status: false,
        data: {},
      };
    }
  } catch (e) {
    console.log(e);
    return {
      status: false,
      data: {},
    };
  }
}

export async function updatePegawai({
  id,
  nama,
  nip,
  isShow,
  foto,
  jenisKelamin,
  agama,
  golongan,
  jabatan,
  pendidikanTerakhir,
}: {
  id: number;
  nama: string;
  nip: string;
  isShow: boolean;
  foto: string;
  jenisKelamin: string;
  agama: string;
  golongan: string;
  jabatan: string;
  pendidikanTerakhir: string;
}) {
  try {
    const up = await prisma.identitasPegawai.update({
      where: {
        id: id,
      },
      data: {
        ...(foto && { foto: foto }),
        namaPejabat: nama,
        nip: nip,
        isShow: isShow,
        jenisKelamin,
        agama,
        golongan,
        jabatan,
        pendidikanTerakhir,
      },
    });

    revalidatePath("/get-panel/profil-pejabat", "page");
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
}

export async function deletePegawai({ id }: { id: string }) {
  try {
    const del = await prisma.identitasPegawai.delete({
      where: {
        id: parseInt(id),
      },
    });

    revalidatePath("/get-panel/profil-pejabat", "page");
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
}

export async function getDokumenPublishAll(
  page = 1,
  limit = 20,
  judul?: string,
  kategori?: string
) {
  const [dokumen, total] = await prisma.$transaction([
    prisma.dokumen.findMany({
      where: {
        isPublish: true,
        ...(judul && {
          judul: {
            contains: judul,
          },
        }),
        ...(kategori && { kategoriDokumenId: parseInt(kategori) }),
      },
      include: {
        kategoriDokumen: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.dokumen.count({
      where: {
        isPublish: true,
        ...(judul && {
          judul: {
            contains: judul,
          },
        }),
        ...(kategori && { kategoriDokumenId: parseInt(kategori) }),
      },
    }),
  ]);

  return { dokumen, total };
}
