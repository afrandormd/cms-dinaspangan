import BreadCrumb from '@/components/BreadCrumb'
import { getDokumenPublishAll } from '@/services/dokumen'
import { getKategoriDokumen } from '@/services/master-data'
import { IconChevronRight } from '@tabler/icons-react'
import React from 'react'
import ViewDokumen from './view'

export const revalidate = 30;

const DokumenPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page= searchParams["p"] ?? "1"; 
  const search= searchParams["search"] ?? ""; 
  const kategori= searchParams["kategori"] ?? ""; 

  const dataKategori = await getKategoriDokumen();
  const {dokumen,total} = await getDokumenPublishAll(parseInt(page.toString()), 20, search.toString(), kategori.toString(),)
  return (
    <main className='flex flex-col gap-2 pb-36'>
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Publikasi</span> <IconChevronRight /> Dokumen
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Dokumen</h1>
        </BreadCrumb>
        <div className='flex flex-col gap-2'>
            <div className='p-4 min-h-[400px]'>
                <ViewDokumen kategori={dataKategori} currentPage={page} dokumen={dokumen} total={total} />
            </div>
        </div>
    </main>
  )
}

export default DokumenPage