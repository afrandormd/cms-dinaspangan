"use client";
import Link from "next/link";
import React from "react";
import { IconMenu2, IconSearch } from "@tabler/icons-react";
import FlyoutLink from "./FlyoutLink";
import Image from "next/image";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const NavigationDetailComponent = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const profilContent = () => {
    return (
      <div className="h-full w-96 bg-green-900 shadow-xl text-white flex flex-col gap-0 p-2">
        <Link
          href={"/sejarah"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Sejarah Pendirian
        </Link>
        <Link
          href={"/visi-misi"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Visi Misi
        </Link>
        <Link
          href={"/tugas-fungsi"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Tugas dan Fungsi
        </Link>
        <Link
          href={"/struktur-organisasi"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Struktur Organisasi
        </Link>
      </div>
    );
  };
  const publikasiContent = () => {
    return (
      <div className="h-full w-96 bg-green-900 shadow-xl text-white flex flex-col gap-0 p-2">
        <Link
          href={"/galeri"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Galeri
        </Link>
        <Link
          href={"/pengumuman"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Pengumuman
        </Link>
        <Link
          href={"/artikel"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Artikel dan Berita
        </Link>
        <Link
          href={"/dokumen"}
          className="text-white hover:text-black transition-colors duration-500 hover:border hover:border-green-900 px-2 py-3 hover:bg-white rounded-md"
        >
          Dokumen
        </Link>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-700 to-transparent px-10 pt-4 pb-4">
      <div className="hidden md:flex flex-row justify-around text-white font-bold items-center">
        <Link href="/"></Link>
        <FlyoutLink href="/">Home</FlyoutLink>
        <FlyoutLink href="#" FlyoutContent={profilContent}>
          Profil
        </FlyoutLink>
        <FlyoutLink href="#" FlyoutContent={publikasiContent}>
          Publikasi
        </FlyoutLink>
        <FlyoutLink href="/layanan-konsultasi">Layanan</FlyoutLink>
        <FlyoutLink href="/kontak">Kontak</FlyoutLink>
      </div>

      <div className="md:hidden flex flex-row justify-between">
        <Drawer opened={opened} onClose={close} title="Menu">
          <div className="flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/sejarah">Sejarah Pendirian</Link>
            <Link href="/visi-misi">Visi Misi</Link>
            <Link href="/tugas-fungsi">Tugas Dan Fungsi</Link>
            <Link href="/struktur-organisasi">Struktur Organisasi</Link>
            <Link href="/galeri">Galeri</Link>
            <Link href="/pengumuman">Pengumuman</Link>
            <Link href="/artikel">Artikel dan Berita</Link>
            <Link href="/dokumen">Dokumen</Link>
            <Link href="/layanan-konsultasi">Layanan</Link>
            <Link href="/kontak">Kontak</Link>
          </div>
        </Drawer>

        <FlyoutLink href="/">
          <div className="flex flex-row gap-2">
            <Image
              width={30}
              height={20}
              alt="logo"
              src={"/balam.png"}
              style={{ width: "auto" }}
            />
            <div className="flex flex-col gap-0">
              <small>
                DINAS PANGAN
                <br />
                BANDAR LAMPUNG
              </small>
            </div>
          </div>
        </FlyoutLink>
        <Button
          onClick={open}
          variant="outline"
          c={"white"}
          color={"white"}
          size="sm"
        >
          <IconMenu2 />
        </Button>
      </div>
    </div>
  );
};

export default NavigationDetailComponent;
