import { getPengumuman } from '@/actions/pengumuman.action';
import BreadCrumb from '@/components/BreadCrumb';
import { Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import ErrorDocument from '@/components/ErrorDocument';
import ViewArtikel from './view';
import { getArtikel } from '@/actions/artikel.action';
import { getKategoriArtikel } from '@/services/master-data';

export const revalidate = 30;

const ArtikelPage = async ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) => {

    const page= searchParams["p"] ?? "1"; 
    const search = searchParams["search"] ?? ""; 
    const kategori = searchParams["kategori"] ?? ""; 

    const {berita,total} = await getArtikel(parseInt(page.toString()), 10, search.toString(), kategori.toString());
    const dataKategori = await getKategoriArtikel();
    return (
      <main className='flex flex-col gap-2 pb-36'>
          <BreadCrumb>
              <div className="flex flex-row text-slate-600 text-sm">
                  <span>Home</span> <IconChevronRight /> <span>Publikasi</span> <IconChevronRight /> Artikel dan Berita
              </div>
              <h1 className='text-slate-800 font-bold text-3xl'>Artikel dan Berita</h1>
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
                     <ViewArtikel kategori={dataKategori} currentPage={page} berita={berita} total={total} loading={ berita ? true : false} />
                </Suspense>
              </div>
          </div>
      </main>
    )
}

export default ArtikelPage