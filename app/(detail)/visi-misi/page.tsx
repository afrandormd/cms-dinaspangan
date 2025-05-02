import { getVisiMisi } from '@/actions/visi-misi.action';
import BreadCrumb from '@/components/BreadCrumb';
import { Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ViewVisiMisi from './view';
import ErrorDocument from '@/components/ErrorDocument';

export const revalidate = 30;

const VisiMisiPage = async () => {
    const fetchData = await getVisiMisi();
    return (
      <main className='flex flex-col gap-2 pb-36'>
          <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Profil</span> <IconChevronRight /> Visi Misi
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Visi Misi</h1>
          </BreadCrumb>
          <div className='flex flex-col gap-2'>
              <div className='min-h-[400px]'>
                  <Suspense fallback={<>
                      <Skeleton height={35} radius="md" />
                      <Skeleton height={35} mt={6} radius="md" />
                      <Skeleton height={35} mt={6} width="70%" radius="md" />
                      <Skeleton height={35} mt={10} radius="md" />
                      <Skeleton height={35} mt={6} radius="md" />
                      <Skeleton height={35} mt={6} width="70%" radius="md" />
                  </>}>
                      {
                          fetchData.status && <ViewVisiMisi data={fetchData.data} />
                      }
                      {
                          fetchData.status === false && <ErrorDocument />
                      }
                  </Suspense>
              </div>
          </div>
      </main>
    )
}

export default VisiMisiPage