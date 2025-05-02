import { getSejarah } from '@/actions/sejarah.action'
import { Loader, Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ViewSejarah from './view';
import ErrorDocument from '@/components/ErrorDocument';
import BreadCrumb from '@/components/BreadCrumb';

export const revalidate = 30;

const SejarahPage = async () => {
    const fetchSejarah = await getSejarah();
  return (
    <main className='flex flex-col gap-2 pb-36'>
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Profil</span> <IconChevronRight /> Sejarah
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Sejarah</h1>
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
                        fetchSejarah.status && <ViewSejarah data={fetchSejarah.data} />
                    }
                    {
                        fetchSejarah.status === false && <ErrorDocument />
                    }
                </Suspense>
            </div>
        </div>
    </main>
  )
}

export default SejarahPage