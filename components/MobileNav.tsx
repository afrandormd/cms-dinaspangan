"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
  BadgePlusIcon,
  Building2Icon,
  FilesIcon,
  GalleryThumbnails,
  Home,
  Package,
  Package2,
  PanelLeft,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { IconBroadcast, IconHeadset } from "@tabler/icons-react";

const MobileNav = () => {
  const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/get-panel"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Dinas Pangan</span>
          </Link>
          <Link
            href="/get-panel"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          {session?.user.level == "admin" && (
            <>
              <Link
                href="/get-panel/artikel"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <BadgePlusIcon className="h-5 w-5" />
                Artikel dan Berita
              </Link>
              <Link
                href="/get-panel/artikel"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <IconBroadcast className="h-5 w-5" />
                Pengumuman
              </Link>
              <Link
                href="/get-panel/dokumen"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <FilesIcon className="h-5 w-5" />
                Dokumen
              </Link>
              <Link
                href="/get-panel/master-data"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Package className="h-5 w-5" />
                Master Data
              </Link>
              <Link
                href="/get-panel/media"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <GalleryThumbnails className="h-5 w-5" />
                Media Library
              </Link>
              <Link
                href="/get-panel/profil-pejabat"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 className="h-5 w-5" />
                Profil Pejabat
              </Link>
              <Link
                href="/get-panel/manage-site"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Building2Icon className="h-5 w-5" />
                Manajemen Website
              </Link>
            </>
          )}

          {(session?.user.level == "admin" ||
            session?.user.level == "operator-helpdesk") && (
            <Link
              href="/get-panel/manage-layanan"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <IconHeadset className="h-5 w-5" />
              Manajemen Layanan dan Konsultasi
            </Link>
          )}
          {session?.user.level == "admin" && (
            <Link
              href="/get-panel/user"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              User
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
