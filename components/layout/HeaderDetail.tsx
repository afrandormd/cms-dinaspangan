
"use client";
import React, { useEffect, useState } from 'react'
import NavigationComponent from './NavigationComponent'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import NavigationDetailComponent from './NavigationDetailComponent';
import { rem } from '@mantine/core';
import { IconBrandFacebook, IconBrandInstagram, IconMail, IconPhone } from '@tabler/icons-react';

const HeaderDetailComponent = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isRootPath = pathname === '/';

  return (
    <div className={`fixed w-full z-50 flex flex-col`}>
        <div className='w-full h-2 bg-green-900'></div>
      <div className='bg-white shadow px-10 pt-4 pb-4'>
        <div className="flex flex-row justify-between">
          <Link href="/">
              <div className='flex flex-row gap-2 items-center'>
                <Image width={30} height={20} alt='logo' src={"/balam.png"} style={{width:'auto'}}  />
                <div className='flex flex-col gap-0 text-slate-800 font-bold text-xl'>
                </div>
              </div>
          </Link>
          <div className="flex flex-row justify-center items-center gap-3">
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconBrandFacebook style={{ width: rem(30), height: rem(30) }} /></Link>
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconBrandInstagram style={{ width: rem(30), height: rem(30) }} /></Link>
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconMail style={{ width: rem(30), height: rem(30) }} /></Link>
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconPhone style={{ width: rem(30), height: rem(30) }} /></Link>
           </div>
        </div>
      </div>
      <NavigationDetailComponent />
    </div>
  )
}

export default HeaderDetailComponent