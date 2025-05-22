"use client"
import { getPengumuman, getPengumumanLast } from "@/actions/pengumuman.action";
import { getSlider } from "@/actions/slider.action";
import CardBerita from "@/components/CardBerita";
import FaqSection from "@/components/FaqSection";
import ProductSlider from "@/components/ProductSlider";
import ProfileCard from "@/components/ProfileCard";
import OurAppsSection from "@/components/ui/OurAppsSection";
import ViewFileComponent from "@/components/view-file";
import { getStrapiMedia } from "@/utils/api-helper";
import { Button, Divider, ScrollArea, Tabs } from "@mantine/core";
import { IconHeadphonesFilled, IconUserPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { LatLngExpression } from "leaflet";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ContentLanding({
    slider,
    artikel,
    artikelHome,
}:{
    slider:any[],
    artikel:any[]
    artikelHome:any[]
}) {

  const [index, setIndex] = useState(0);
  const [indexNews, setIndexNews] = useState(0);
  const [listPengumuman, setListPengumuman] = useState<any[]>([]);
  const [loadlist, setLoadlist] = useState(false);
  const [loadPengumuman, setLoadPengumuman] = useState(false);

  useEffect(()=>{
    const callApi = async () => {
      setLoadlist(true);
      
      setLoadlist(false);
    }

    callApi();
  },[]);

  useEffect(()=>{
    const callApi = async () => {
      // setLoadlist(true);
      const fetchPengumuman = await getPengumumanLast();
      if(fetchPengumuman.status) {
        setListPengumuman(fetchPengumuman.data);
      }else {
        setListPengumuman([]);
      }
      // setLoadlist(false);
    }

    callApi();
  },[])

  const handleNextNews = () => {
    setIndexNews((prevIndex) => (prevIndex + 1) % artikel.length);
  };

  const handlePrevNews = () => {
    setIndexNews((prevIndex) => (prevIndex - 1 + artikel.length) % artikel.length);
  };

  const handleNext = () => {
    if(slider && slider.length>0) {
      setIndex((prevIndex) => (prevIndex + 1) % slider!.length);
    }
  }

  const handlePrev = () => {
    if(slider && slider.length>0) {
      setIndex((prevIndex) => (prevIndex - 1 + slider!.length) % slider!.length);
    }
  }

//   useEffect(() => {
//       const interval = setInterval(handleNext, 3000); // Auto slide every 3 seconds
//       return () => clearInterval(interval);
//   }, [slider]);

  useEffect(() => {
    const interval = setInterval(handleNextNews, 5000); // Auto slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // data gambar logo showcase
  const logos = [
    { src: "/img/logo-lampung.svg", alt: "Logo Lampung" },
    { src: "/img/logo-bandar-lampung.svg", alt: "Logo Bandar Lampung" },
    { src: "/img/logo-badan-pangan.svg", alt: "Logo Badan Pangan Nasional" },
    { src: "/img/logo-b2sa.svg", alt: "Logo B2SA" },
  ];

  return (
    <main className="flex flex-col items-center justify-between">
      {/* SECTION SLIDER TOP */}
      <div className="h-[500px] w-full">
        <div className="h-[500px]">
              {
              !loadlist && slider.length > 0 &&
                <AnimatePresence initial={false} 
                key={index}>
                  <motion.div
                    className="absolute inset-0"
                  >

                    <Image
                      src={`${slider[index].image.replace("uploads/","api/files/")}`}
                      height={400}
                      width={400}
                      objectFit="cover"
                      style={{width: '100%', height: '500px'}}
                      alt={`Slide ${index}`}
                      className="object-cover"
                    />
                    
                  </motion.div>
                </AnimatePresence>
              }
              {
                !loadlist && <div className="w-full bg-slate-700 text-white text-center h-[500px] flex flex-col items-center justify-center" ></div>
              }
        </div>
        { slider.length > 0 && <>
        <div className="absolute top-1/3 left-5 z-5 cursor-pointer" onClick={handlePrev}>
          <ChevronLeftCircle className="text-white size-8 hover:text-green-400" />
        </div>
        <div className="absolute top-1/3 right-5 z-5 cursor-pointer" onClick={handleNext}>
          <ChevronRightCircle className="text-white size-8 hover:text-green-400" />
        </div>
        <div className="absolute w-full text-center bottom-2/4 z-5 cursor-pointer">
          <div className="inline-block bg-white bg-opacity-60 p-2 rounded-md">
            <h3 className="text-2xl flex flex-row font-bold text-slate-900">{slider[index].text}</h3>
        </div>
        </div> </>}
      </div>
      
      <div className="z-8 w-full">
        {/* SECTION LOGO SHOWCASE */}
        <div id="#logo-showcase">
          <div className="w-full my-24 overflow-x-auto -z-10">
            <div className="flex flex-nowrap justify-center gap-12 md:gap-32 px-4 md:px-0">
              {logos.map((logo, index) => (
                <motion.div
                  key={index}
                  className="relative w-20 sm:w-24 md:w-28 lg:w-32 h-auto aspect-square"
                  initial={{ opacity: 0, scale: 0.8}}
                  animate={{ opacity: 1, scale: 1}}
                  transition={{ duration: 0.5, delay: index * 0.2}}
                  whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 120px"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>


        {/* SECTION PROFILE CARD */}
        <ProfileCard />

        {/* SECTION LAYANAN */}
        <div className="relative w-full mt-5 bg-green-800 mb-10">
            <div className="relative z-20 mt-5 px-5 md:px-28 lg:px-44 py-4 flex flex-col gap-3">
                <h2 className="text-white font-bold text-2xl md:text-3xl  py-4 text-center">LAYANAN KAMI</h2>
                <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.9, delay: 0.8}} className="flex flex-row gap-4 flex-wrap items-center justify-center mt-2 my-4">
                    <div className="bg-white w-[300px] rounded flex flex-col gap-3 shadow-lg p-4 items-center text-center hover:cursor-pointer hover:scale-110 transition-all">
                        <IconHeadphonesFilled size={72} className="text-green-900" />
                        <Link href={"/layanan-konsultasi"}><h1 className="text-xl px-2 font-bold text-green-900 py-2 rounded">Layanan Konsultasi</h1></Link>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* SECTION SLIDE BERITA DAN LIST PENGUMUMAN */}
        <h2 className="text-center text-3xl font-bold text-green-900 py-4">Berita Terbaru & Pengumuman</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 mt-5 px-4 md:px-28 lg:px-44 gap-0 md:gap-4">

          <div className="col-span-8">
            <div className="relative w-full h-[300px] bg-white border rounded-xl shadow-lg overflow-hidden">
              <div className="absolute inset-0">
                <AnimatePresence initial={false}>
                {artikel.map((item, i) =>
                    i === indexNews ? (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col md:flex-row p-4 bg-white"
                      >
                        <Image
                          src={item.thumbnail.replace("uploads/","api/files/")}
                          alt={item.judul}
                          width={300}
                          height={100}
                          className="object-cover rounded-md"
                        />
                        <div className="w-full ml-0 md:ml-4">
                            <Link href={`artikel/${item.slug}`} rel="noopener noreferrer">
                                <h2 className="text-xl font-semibold line-clamp-1">
                                    {item.judul}
                                </h2>
                            </Link>
                          <div className="text-gray-600 mt-2 line-clamp-2 md:line-clamp-6">
                          <div dangerouslySetInnerHTML={{ __html: item.isi }} />
                          </div>
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {artikel.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === indexNews ? 'bg-blue-500' : 'bg-gray-400'}`}
                    onClick={() => setIndexNews(i)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 mt-4 md:mt-0">
            <div className="bg-green-900 rounded-xl h-full p-4 flex flex-col gap-2 shadow-lg items-start">
              <h2 className="text-gray-200 font-bold font-sans">PENGUMUMAN</h2>
              <Divider />
              <ScrollArea className="h-[200px]">
                <div className="flex flex-col gap-2 text-white">
                  {
                    listPengumuman && listPengumuman.length > 0 &&
                      listPengumuman.map((item:any, index:number) => (
                      <div className="flex flex-row gap-1" key={index}>
                        <span>{index + 1}.</span> <Link href={"/pengumuman"} className="hover:underline underline-offset-4">{item.judul}</Link>
                      </div>
                      ))
                  }
                </div>
              </ScrollArea>
            </div>
          </div>

        </div>

        {/* SECTION LIST BERITA/ARTIKEL */}
        <div className="relative w-full mt-5 bg-transparent mb-10">
            <div className="relative z-20 mt-5 px-5 md:px-28 lg:px-44 py-4 flex flex-col gap-3">
                <h1 className="text-green-900 py-2 font-bold text-2xl md:text-3xl text-center">ARTIKEL TERKINI</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  { artikelHome?.slice(0, 6).map((item:any,index:number) => { 
                      return (
                      <div key={index}>
                          <CardBerita category={item.kategoriArtikel.namaKategori} thumbnail={item.thumbnail.replace("uploads/","api/files/")} title={item.judul} shortdesc={item.isi} slug={item.slug} time={item.createdAt} />
                      </div>
                  )})}
                </div>
            </div>
            <div className="mt-6 flex justify-center">
              <a href="/artikel" className="px-6 py-2 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-lg transition">Lihat Semua Artikel</a>
            </div>
        </div>

        {/* SECTION APLIKASI KAMI */}
        <OurAppsSection />

        {/* SECTION FREQUENTLY ASK QUESTIONS */}
        <FaqSection/>

        {/* SECTION GALERI */}
        {/* <div className="relative w-full mt-5 bg-transparent mb-10"> */}
        {/*     <div className="relative z-20 mt-5 px-5 md:px-28 lg:px-44 py-4 flex flex-col gap-3"> */}
        {/*         <h1 className="text-slate-700 font-bold text-xl text-center">Link Terkait</h1> */}
        {/*     </div> */}
        {/* </div> */}


      </div>
    </main>
  );
}
