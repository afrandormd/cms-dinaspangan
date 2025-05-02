import Footer from "@/components/layout/Footer";
import HeaderComponent from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
        <HeaderComponent />
        {children}
        <Footer />
    </div>
  );
}
