import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import NextTopLoader from 'nextjs-toploader';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import Script from "next/script";

import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import ToasterContext from "@/components/ToasetContex";
import Providers from "./get-panel/providers";
import { SessionProvider } from "next-auth/react";
import Session from "@/components/Session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dinas Pangan Kota Bandar Lampung",
  description: "Dinas Pangan Bandar Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Session>
          <ToasterContext />
            <NextTopLoader color="green" />
            <MantineProvider>
              <Notifications position="top-center" />
              {children}
            </MantineProvider>
        </Session>
      </body>
    </html>
  );
}
