import { getArtikel, getArtikelBySlug } from '@/actions/artikel.action';
import BreadCrumb from '@/components/BreadCrumb';
import { Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ViewArtikel from '../view';
import ErrorDocument from '@/components/ErrorDocument';
import DetailArtikelView from './view';
import { ReportView } from './report-view';

export const revalidate = 30;

const DetailArtikel = async ({ params }: { params: { slug: string } }) => {
  const {status,data} = await getArtikelBySlug(params.slug);
  
  return (
    <main className='flex flex-col gap-2 pb-36'>
      <ReportView slug={params.slug} />
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Artikel</span> <IconChevronRight /> {status && data.judul}
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>{status && data.judul}</h1>
        </BreadCrumb>
        <div className='flex flex-col gap-2'>
            <div className='p-4 min-h-[400px]'>
                <Suspense fallback={<>
                    <Skeleton height={35} radius="md" />
                    <Skeleton height={35} mt={6} radius="md" />
                    <Skeleton height={35} mt={6} width="70%" radius="md" />
                    <Skeleton height={35} mt={10} radius="md" />
                    <Skeleton height={35} mt={6} radius="md" />
                    <Skeleton height={35} mt={6} width="70%" radius="md" />
                </>}>
                    {
                        status && <DetailArtikelView data={data} />
                    }
                    {
                        status === false && <ErrorDocument />
                    }
                </Suspense>
            </div>
        </div>
    </main>
  )
}

export default DetailArtikel