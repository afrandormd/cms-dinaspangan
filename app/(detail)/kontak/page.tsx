
import BreadCrumb from '@/components/BreadCrumb'
import { IconChevronRight } from '@tabler/icons-react'
import React, { Suspense } from 'react'
import ContentLayananPage from './content';

const KontakPage = async () => {
  return (
    <main className='flex flex-col gap-2 pb-36'>
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Kontak</span>
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Kontak</h1>
        </BreadCrumb>
        <Suspense fallback={"Sedang mengambil data..."}>
            <ContentLayananPage />
        </Suspense>
    </main>
  )
}

export default KontakPage