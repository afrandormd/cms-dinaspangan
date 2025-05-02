import { getPengumuman } from '@/actions/pengumuman.action';
import BreadCrumb from '@/components/BreadCrumb';
import { Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ViewPengumuman from './view';
import ErrorDocument from '@/components/ErrorDocument';

export const revalidate = 30;

const PengumumanPage = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) => {
    const page= searchParams["p"] ?? "1"; 

    const {pengumuman,total} = await getPengumuman(parseInt(page.toString()), 20);
    return (
      <main className='flex flex-col gap-2 pb-36'>
          <BreadCrumb>
              <div className="flex flex-row text-slate-600 text-sm">
                  <span>Home</span> <IconChevronRight /> <span>Publikasi</span> <IconChevronRight /> Pengumuman
              </div>
              <h1 className='text-slate-800 font-bold text-3xl'>Pengumuman</h1>
          </BreadCrumb>
          <div className='flex flex-col gap-2 min-h-screen'>
                <Suspense fallback={<>
                    <Skeleton height={35} radius="md" />
                    <Skeleton height={35} mt={6} radius="md" />
                    <Skeleton height={35} mt={6} width="70%" radius="md" />
                    <Skeleton height={35} mt={10} radius="md" />
                    <Skeleton height={35} mt={6} radius="md" />
                    <Skeleton height={35} mt={6} width="70%" radius="md" />
                </>}>
                     <ViewPengumuman currentPage={page} pengumuman={pengumuman} total={total} loading={ pengumuman ? true : false} />
                </Suspense>
          </div>
      </main>
    )
}

export default PengumumanPage