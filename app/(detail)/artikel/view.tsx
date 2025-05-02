"use client";
import { getArtikel } from '@/actions/artikel.action';
import CardBerita from '@/components/CardBerita';
import ErrorDocument from '@/components/ErrorDocument';
import { getStrapiMedia } from '@/utils/api-helper';
import { ActionIcon, Button, ButtonGroup, Card, Input, Select, Skeleton } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconHeart, IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewArtikel = ({kategori,berita,total,loading,currentPage}:{kategori:any[],berita:any[],total:number,loading:boolean,currentPage:any}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listKategori,setListKategori] = useState<any[]>([]);
  const [searchTitle, setSearchTitle] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('kategori') || '');

  useEffect(()=>{
    if(kategori) {
      let wrapKategori:any[] = [];
      kategori.forEach(k => {
        wrapKategori.push({value:k.id.toString(),label:k.namaKategori})
      })
      setListKategori(wrapKategori);
    }
  },[kategori])

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= total) {
      const query = new URLSearchParams({
        p: page.toString(),
        search: searchTitle,
        kategori: selectedCategory
      });
      router.push(`/artikel?${query.toString()}`);
    }
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      p: '1',
      search: searchTitle,
      kategori: selectedCategory
    });
    router.push(`/artikel?${query.toString()}`);
  };

  return (
    <div className='flex flex-col gap-2'>
        <div className='flex flex-row mb-5 items-center gap-1'>
          <Input
            leftSection={<IconSearch />}
            placeholder='Cari judul'
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.currentTarget.value)}
          />
          <Select
            data={listKategori}
            placeholder='Pilih Kategori'
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value || '')}
          />
          <ActionIcon
            variant="gradient"
            size="lg"
            aria-label="Gradient action icon"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={handleSearch}
          >
            <IconSearch />
          </ActionIcon>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
               
            { berita && berita.map((item:any,index:number) => { 
                return (
                <div key={index}>
                    <CardBerita category={item.kategoriArtikel.namaKategori} thumbnail={item.thumbnail.replace("uploads/","api/files/")} title={item.judul} shortdesc={item.isi} slug={item.slug} time={item.createdAt} />
                </div>
            )})}
        </div>
        <ButtonGroup className='mt-10'>
          <Button size={'icon'}  disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <IconChevronLeft />
          </Button>
          {[...Array(total)].map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? 'secondary' : 'outline'}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button size={'icon'} disabled={currentPage === total} onClick={() => handlePageChange(currentPage + 1)}>
            <IconChevronRight />
          </Button>
        </ButtonGroup>

    </div>
  )
}

export default ViewArtikel