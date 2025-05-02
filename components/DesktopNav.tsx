"use client";
import { NavItem } from "@/app/get-panel/nav-item";
import { IconBroadcast, IconHeadset, IconListCheck } from "@tabler/icons-react";
import {
  BadgePlusIcon,
  Building2Icon,
  FilesIcon,
  GalleryThumbnails,
  Globe2Icon,
  Home,
  Package,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useSession } from "next-auth/react";

const DesktopNav = () => {
  const { data: session } = useSession();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/get-panel"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            width={30}
            height={20}
            alt="logo"
            src={"/balam.png"}
            style={{ width: "auto" }}
          />
          <span className="sr-only">DINAS PANGAN BANDAR LAMPUNG</span>
        </Link>

        <NavItem href="/get-panel" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>

        {session?.user.level == "admin" && (
          <>
            <NavItem href="/get-panel/artikel" label="Artikel dan Berita">
              <BadgePlusIcon className="h-5 w-5" />
            </NavItem>

            <NavItem href="/get-panel/pengumuman" label="Pengumman">
              <IconBroadcast className="h-5 w-5" />
            </NavItem>

            <NavItem href="/get-panel/dokumen" label="Dokumen">
              <FilesIcon className="h-5 w-5" />
            </NavItem>

            <NavItem href="/get-panel/master-data" label="Master Data">
              <Package className="h-5 w-5" />
            </NavItem>

            <NavItem href="/get-panel/media" label="Media Library">
              <GalleryThumbnails className="h-5 w-5" />
            </NavItem>

            <NavItem href="/get-panel/profil-pejabat" label="Profil Pejabat">
              <Users2 className="h-5 w-5" />
            </NavItem>

            <NavItem href="/get-panel/manage-site" label="Site">
              <Building2Icon className="h-5 w-5" />
            </NavItem>
          </>
        )}

        {(session?.user.level == "admin" ||
          session?.user.level == "operator-helpdesk") && (
          <NavItem
            href="/get-panel/manage-layanan"
            label="Manajemen Layanan dan Konsultasi"
          >
            <IconHeadset className="h-5 w-5" />
          </NavItem>
        )}

        {session?.user.level == "admin" && (
          <NavItem href="/get-panel/user" label="User">
            <Users2 className="h-5 w-5" />
          </NavItem>
        )}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Globe2Icon className="h-5 w-5" />
              <span className="sr-only">Website Utama</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Website Utama</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default DesktopNav;
