import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckSquare2Icon, PlusCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import Content from './content'
import { getKategoriArtikel } from '@/services/master-data'
import { getBerita } from '@/services/artikel'
import { getPengumuman } from '@/actions/pengumuman.action'
import { getPsat } from '@/actions/psat.action'

const PsatPage = async ({
    searchParams
  }: {
    searchParams: { page: string };
  }) => {
    const page = parseInt(searchParams.page) || 1;
    const limit = 20;
    const { psat, total } = await getPsat(page, limit);

    const totalPages = Math.ceil(total / limit);

  return (
    <div className='w-full flex mt-2'>
        <Content 
            data={psat}
            currentPage={page}
            totalPages={totalPages} 
        />
    </div>
  )
}

export default PsatPage