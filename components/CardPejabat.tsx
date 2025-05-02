"use client";
import { getStrapiMedia } from '@/utils/api-helper'
import { Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ModalPejabat from './ModalPejabat';

interface Profile {
    url: string,
    NamaPejabat: string,
    Jabatan: string,
    Profil: string,
}

const CardPejabat = ({url,NamaPejabat,Jabatan,Profil}:Profile) => {
  return (
    <div className='bg-white shadow-lg p-4 rounded-md flex flex-col items-center gap-2 justify-center'>

        <div>
            <Image src={`${getStrapiMedia(url)}`} alt='struktur organisasi' width={250} height={150} />
        </div>

        <div className='text-center flex flex-col gap-1'>
            <h2 className="text-xl font-bold">{NamaPejabat}</h2>
            <p className="text-gray-600 text-xs">{Jabatan}</p>
            <Link href={""} className='text-center'><ModalPejabat profil={Profil} /></Link>
        </div>
    </div>
  )
}

export default CardPejabat