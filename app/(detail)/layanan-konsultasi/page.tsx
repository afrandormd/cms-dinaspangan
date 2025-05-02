
import BreadCrumb from '@/components/BreadCrumb'
import { IconChevronRight } from '@tabler/icons-react'
import React, { Suspense } from 'react'
import ContentLayananPage from './content';
import { getKategoriLayanan } from '@/services/master-data';

export const revalidate = 30;

const LayananPage = async () => {
    const kategoriLayanan = await getKategoriLayanan();
  return (
    <main className='flex flex-col gap-2 pb-36'>
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Layanan dan Konsultasi</span>
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Layanan dan Konsultasi</h1>
        </BreadCrumb>
        <Suspense fallback={"Sedang mengambil data..."}>
            <ContentLayananPage kategoriLayanan={kategoriLayanan} />
        </Suspense>
    </main>
  )
}

export default LayananPage