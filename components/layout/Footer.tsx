'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconHome,
  IconLocation,
  IconMail,
} from '@tabler/icons-react';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-green-800 w-full text-white relative pb-27">
      {/* Logo Section */}
      <div className="absolute top-4 right-4 flex items-center gap-10 z-20">
        <Image 
          src="/img/logo-lampung.svg" 
          alt="Logo Lampung" 
          width={40} 
          height={40} 
        />
        <Image 
          src="/img/logo-bandar-lampung.svg" 
          alt="Logo Bandar Lampung" 
          width={50} 
          height={40} 
        />
        <Image 
          src="/img/logo-badan-pangan.svg" 
          alt="Logo Dinas Pangan" 
          width={120} 
          height={30} 
        />
        <Image 
          src="/img/logo-b2sa.svg" 
          alt="Logo B2SA" 
          width={70} 
          height={40} 
          priority 
        />
      </div>

      {/* Contact Section */}
      <div className="px-8 py-6 relative z-10">
        <h2 className="text-xl font-bold mb-4">HUBUNGI KAMI MELALUI</h2>

        {/* Address */}
        <div className="flex items-start gap-2 mb-3">
          <IconLocation className="text-white mt-1 flex-shrink-0" size={22} />
          <div>
            Jalan Dokter Susilo Nomor 2 Sumur Batu, Gedung Batu Atas Lt 10, Bandar Lampung, Lampung
            35214
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 mb-6">
          <IconMail className="flex-shrink-0" size={20} />
          <div>dinaspangan@bandarlampungkota.go.id</div>
        </div>

        {/* Social Media */}
        <h2 className="text-xl font-bold mb-3">SOSIAL MEDIA</h2>
        <div className="flex gap-3 mb-4">
          <a 
            href="https://www.instagram.com/dinaspangan.kotabdl" 
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity z-20 relative"
          >
            <div className="bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full p-2">
              <IconBrandInstagram size={24} />
            </div>
          </a>
          <a 
            href="https://www.facebook.com/dinaspangan.bdl" 
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity z-20 relative"
          >
            <div className="bg-blue-600 rounded-full p-2">
              <IconBrandFacebook size={24} />
            </div>
          </a>
          <a 
            href="https://www.tiktok.com/@dinaspangan.bdl" 
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity z-20 relative"
          >
            <div className="bg-black rounded-full p-2">
              <IconBrandTiktok size={24} />
            </div>
          </a>
          <a 
            href="http://www.youtube.com/@DINASPANGANKOTABANDARLAMPUNG" 
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity z-20 relative"
          >
            <div className="bg-red-600 rounded-full p-2">
              <IconBrandYoutube size={24} />
            </div>
          </a>
        </div>
      </div>

       {/* Bottom Illustration */}
      <div className="w-full h-72 relative bg-cover bg-center">
        <div className="absolute bottom-0 flex justify-center">
          <div className="flex items-end justify-center">
            <Image
              src="/img/DinasPanganFooter.png"
              alt="Footer Illustration"
              width={2500}
              height={90}
              className="w-full w-[2200px] h-full h-[540px]"
            />
          </div>
        </div>
      </div>

      {/* Visitor Counter */}
      {/* <div className="absolute top-40 right-4 transform -translate-y-1/2 p-1 bg-white shadow-md rounded-md border border-gray-300 z-20"> */}
      {/*   <div */}
      {/*     dangerouslySetInnerHTML={{ */}
      {/*       __html: ` */}
      {/*         <a href='http://www.freevisitorcounters.com'>freevisitorcounters</a>  */}
      {/*         <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=1347aecaf4031ea0741d7899495bbfeb8f5174ca'></script> */}
      {/*         <script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1340067/t/0"></script> */}
      {/*       `, */}
      {/*     }} */}
      {/*   /> */}
      {/* </div> */}

      {/* Copyright */}
      <div className="absolute bottom-0 w-full flex justify-center pb-3 z-10">
        <div className="bg-gray-800 bg-opacity-100 text-white text-lg rounded-md text-center px-7 py-2">
          Copyright © 2025 Dinas Pangan Kota Bandar Lampung All rights reserved
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={handleBackToTop}
        className="absolute bottom-4 right-4 bg-yellow-500 rounded-full p-3 cursor-pointer hover:bg-yellow-600 transition-colors z-20"
        aria-label="Back to top"
      >
        <IconHome size={24} />
      </button>
    </div>
  );
};

export default Footer;
