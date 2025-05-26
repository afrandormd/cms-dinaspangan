"use client"; // This directive is crucial for client-side functionality in Next.js

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Home,
  Users,
  Eye,
  Target,
  Building,
  Image as ImageIcon,
  Bell,
  FileText,
  File,
  Headphones,
  Phone,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const NavigationDetailComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const menuItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/sejarah", label: "SEJARAH PENDIRIAN", icon: Users },
    { href: "/visi-misi", label: "VISI MISI", icon: Eye },
    { href: "/tugas-fungsi", label: "TUGAS & FUNGSI", icon: Target },
    { href: "/struktur-organisasi", label: "STRUKTUR ORGANISASI", icon: Building },
    { href: "/galeri", label: "GALERI", icon: ImageIcon },
    { href: "/pengumuman", label: "PENGUMUMAN", icon: Bell },
    { href: "/artikel", label: "ARTIKEL & BERITA", icon: FileText },
    { href: "/dokumen", label: "DOKUMEN", icon: File },
    { href: "/layanan-konsultasi", label: "LAYANAN KONSULTASI", icon: Headphones },
    { href: "/kontak", label: "KONTAK", icon: Phone },
  ];

  const getItemDetails = (href: string) => {
    return menuItems.find(item => item.href === href);
  };

  const renderFlyoutContent = (hrefs: string[]) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-2.5 space-y-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
      {hrefs.map((href, index) => {
        const item = getItemDetails(href);
        if (!item) return null;
        const IconComponent = item.icon;
        return (
          <Link
            key={index}
            href={href}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
            // Close mobile menu if it's open and a link from a flyout is clicked (though flyouts are desktop-only here)
            onClick={closeMobileMenu}
          >
            <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-300" />
            {item.label}
            <ChevronRight className="ml-auto w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
        );
      })}
    </div>
  );

  const profilContent = () =>
    renderFlyoutContent([
      "/sejarah",
      "/visi-misi",
      "/tugas-fungsi",
      "/struktur-organisasi",
    ]);

  const publikasiContent = () =>
    renderFlyoutContent([
      "/galeri",
      "/pengumuman",
      "/artikel",
      "/dokumen",
    ]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-green-800 px-6 md:px-12 py-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row justify-between items-center max-w-7xl mx-auto">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={"/balam.png"}
            alt="Dinas Pangan Logo"
            width={45} // Slightly larger logo
            height={45}
            className="rounded-full shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white text-xl font-extrabold tracking-tight">
              DINAS PANGAN
            </span>
            <span className="text-gray-300 text-sm font-light uppercase">
              Bandar Lampung
            </span>
          </div>
        </Link>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-white font-semibold hover:text-green-400 transition-colors duration-300 relative group py-2">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Profil Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-white font-semibold hover:text-green-400 transition-colors duration-300 py-2"
              aria-expanded={isMobileMenuOpen ? "true" : "false"} // Good for accessibility
              aria-haspopup="true" // Indicates a dropdown menu
            >
              Profil <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {profilContent()}
          </div>

          {/* Publikasi Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-white font-semibold hover:text-green-400 transition-colors duration-300 py-2"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              aria-haspopup="true"
            >
              Publikasi <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {publikasiContent()}
          </div>

          <Link href="/layanan-konsultasi" className="text-white font-semibold hover:text-green-400 transition-colors duration-300 relative group py-2">
            Layanan
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link href="/kontak" className="text-white font-semibold hover:text-green-400 transition-colors duration-300 relative group py-2">
            Kontak
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between">
        {/* Mobile Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src={"/balam.png"}
            alt="Dinas Pangan Logo"
            width={40} // Mobile logo size
            height={40}
            className="rounded-full shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white text-lg font-extrabold tracking-tight">
              DINAS PANGAN
            </span>
            <span className="text-gray-300 text-xs font-light uppercase">
              Bandar Lampung
            </span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={openMobileMenu}
          className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-white/20 active:scale-95 shadow-md"
          aria-label="Open mobile menu"
          aria-expanded={isMobileMenuOpen ? "true" : "false"} // For accessibility
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Mobile Drawer (Custom Implementation) */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 animate-fadeIn"
              onClick={closeMobileMenu}
              aria-hidden="true"
            ></div>

            {/* Drawer Content */}
            <div className={`
              fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 z-[100] shadow-2xl
              transform transition-transform duration-300 ease-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              flex flex-col
            `}>
              {/* Drawer Header */}
              <div className="bg-gradient-to-r from-green-800 to-green-600 p-6 text-white flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Menu</h2>
                  <button
                    onClick={closeMobileMenu}
                    className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/30"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="h-px bg-white/20"></div>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-2">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-green-100 dark:bg-gray-700 dark:group-hover:bg-green-900 rounded-lg flex items-center justify-center transition-colors duration-200">
                        <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-300" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-base">{item.label}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Powered by</div>
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src="/balam.png"
                      alt="Mini Logo"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">Dinas Pangan</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default NavigationDetailComponent;