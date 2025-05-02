import BreadCrumb from '@/components/BreadCrumb';
import { Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ErrorDocument from '@/components/ErrorDocument';
import { getTugasFungsi } from '@/actions/tugas-fungsi.action';
import ViewTugasFungsi from './view';

export const revalidate = 30;

const TugasFungsiPage = async () => {
    const fetchData = await getTugasFungsi();
    return (
      <main className='flex flex-col gap-2 pb-36'>
          <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Profil</span> <IconChevronRight /> Tugas dan Fungsi
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Tugas dan Fungsi</h1>
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
                          fetchData.status && <ViewTugasFungsi data={fetchData.data} />
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

export default TugasFungsiPage