'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconLocation,
  IconMail,
  IconArrowUp
} from '@tabler/icons-react';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-green-900 text-white w-full py-12 px-6 sm:px-8 md:px-12 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 text-center md:text-left">

        {/* Brand & Mission Statement */}
        <div className="flex flex-col items-center md:items-start md:col-span-2 lg:col-span-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 mb-4">
            <Image
              src="/img/logo-lampung.svg"
              alt="Logo Lampung"
              width={24}
              height={24}
              className="object-contain"
            />
            <Image
              src="/img/logo-bandar-lampung.svg"
              alt="Logo Bandar Lampung"
              width={30}
              height={24}
              className="object-contain"
            />
            <Image
              src="/img/logo-badan-pangan.svg"
              alt="Logo Dinas Pangan"
              width={70}
              height={18}
              className="object-contain"
              priority
            />
            <Image
              src="/img/logo-b2sa.svg"
              alt="Logo B2SA"
              width={45}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-sm text-green-200 leading-relaxed max-w-sm">
            Dinas Pangan Kota Bandar Lampung berkomitmen mewujudkan ketahanan pangan yang berkelanjutan dan gizi seimbang untuk masyarakat.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 text-green-100">Link Cepat</h3>
          <nav className="text-sm space-y-2 text-green-200">
            <Link href="/" className="block hover:underline hover:text-white transition-colors">Beranda</Link>
            <Link href="/sejarah" className="block hover:underline hover:text-white transition-colors">Profil Dinas</Link>
            <Link href="/" className="block hover:underline hover:text-white transition-colors">Program Unggulan</Link>
            <Link href="/galeri" className="block hover:underline hover:text-white transition-colors">Galeri Kegiatan</Link>
            <Link href="/kontak" className="block hover:underline hover:text-white transition-colors">Kontak Kami</Link>
          </nav>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 text-green-100">Hubungi Kami</h3>
          <div className="flex items-start justify-center md:justify-start gap-2 text-sm text-green-200 leading-relaxed mb-2">
            <IconLocation className="flex-shrink-0 mt-0.5" size={18} />
            <address className="not-italic">
              Jalan Dokter Susilo Nomor 2 Sumur Batu, Gedung Batu Atas Lt 10, Bandar Lampung, Lampung 35214
            </address>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-green-200">
            <IconMail className="flex-shrink-0" size={18} />
            <a href="mailto:dinaspangan@bandarlampungkota.go.id" className="hover:underline hover:text-white transition-colors">
              dinaspangan@bandarlampungkota.go.id
            </a>
          </div>

          {/* Social Media (integrated under contact) */}
          <h3 className="text-lg font-semibold mt-6 mb-3 text-green-100">Ikuti Kami</h3>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/dinaspangan.kotabdl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <IconBrandInstagram size={24} />
            </a>
            <a
              href="https://www.facebook.com/dinaspangan.bdl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <IconBrandFacebook size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@dinaspangan.bdl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <IconBrandTiktok size={24} />
            </a>
            <a
              href="https://www.youtube.com/@DinasPanganKotaBandarLampung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <IconBrandYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <hr className="border-green-700 w-full max-w-7xl my-8" />

      {/* Copyright */}
      <div className="text-center text-xs sm:text-sm text-green-300">
        Copyright &copy; {new Date().getFullYear()} Dinas Pangan Kota Bandar Lampung. Hak Cipta Dilindungi.
      </div>

      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="fixed bottom-6 right-6 bg-white text-green-800 rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        aria-label="Kembali ke atas"
      >
        <IconArrowUp size={24} />
      </button>
    </div>
  );
};

export default Footer;