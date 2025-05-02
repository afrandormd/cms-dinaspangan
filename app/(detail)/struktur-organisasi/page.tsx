import { getStrukturOrganisasi } from '@/actions/struktur-organisasi.action';
import BreadCrumb from '@/components/BreadCrumb';
import { ScrollArea, Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ViewStrukturOrganisasi from './view';
import ErrorDocument from '@/components/ErrorDocument';

export const revalidate = 30;

const StrukturOrganisasiPage = async () => {
    const fetchData = await getStrukturOrganisasi();
    return (
      <main className='flex flex-col gap-2 pb-36'>
          <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Profil</span> <IconChevronRight /> Struktur Organisasi
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Struktur Organisasi</h1>
          </BreadCrumb>
          <div className='flex flex-col gap-2'>
            <ScrollArea>
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
                          fetchData.status && <ViewStrukturOrganisasi data={fetchData.data} />
                      }
                      {
                          fetchData.status === false && <ErrorDocument />
                      }
                  </Suspense>
              </div>
            </ScrollArea>
          </div>
      </main>
    )
}

export default StrukturOrganisasiPage