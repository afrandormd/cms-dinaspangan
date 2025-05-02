import Footer from "@/components/layout/Footer";
import HeaderComponent from "@/components/layout/Header";
import HeaderDetailComponent from "@/components/layout/HeaderDetail";
import { ScrollArea } from "@mantine/core";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4 min-h-screen w-full">
        <HeaderDetailComponent />
            <div className="pt-5" />
            <div className="flex flex-row gap-4 pt-28">
                <div className="w-full px-32 pr-2 pl-2 md:pl-10">
                    {children}
                </div>
                <div className="hidden md:flex md:pr-10 w-[300px] pt-24">
                  <div className="flex flex-col gap-2 w-full">
                    {/* <h1 className="text-sm text-slate-800 italic">Berita Terkini</h1> */}
                    {/* <ArticleSideList /> */}
                  </div>
                </div>
            </div>
        <Footer />
    </div>
  );
}
