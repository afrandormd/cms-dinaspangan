import { IconDownload } from "@tabler/icons-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export const OurAppsSection = () => {
  return (
    <section className="bg-[#1a6334] py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide text-center text-white">APLIKASI KAMI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            {/* Simple placeholder for app images */}
            <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{duration: 1, delay: 0.4}} className="relative w-[450px] h-[450px] flex items-center justify-center">
              <Image
                src="/img/MockupSipanda.png?height=500&width=500"
                alt="SIPANDA SAI HAGOM App"
                width={500}
                height={500}
                className="object-contain"
              />
              {/* Tambahkan gambar aplikasi di sini nanti */}
            </motion.div>
          </div>

          <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1, delay: 0.8}} className="text-white text-center md:text-left">
            {/* <h3 className="text-xl md:text-2xl font-bold mb-6">SIPANDA SAI HAGOM</h3> */}
              <div className="bg-white rounded-full p-2 flex items-center my-4">
                <div className="bg-[#1a6334] rounded-full w-10 h-10 flex items-center justify-center mr-2">
                  <Image
                    src="/img/logoapps.png?height=500&width=500"
                    alt="Logo Apps SIPANDA"
                    width={500}
                    height={500}
                    className="object-contain"
                  />
                </div>
                <span className="text-[#1a6334] font-bold pr-2">SIPANDA SAI HAGOM</span>
              </div>
            <p className="mb-8 text-lg leading-relaxed">
              Dinas Pangan Kota Bandar Lampung memiliki sebuah aplikasi mobile, yang digunakan untuk memantau harga
              pangan di pasar kota bandar lampung, yang dikemas dengan baik dan mudah digunakan.
            </p>

            {/* Tailwind button */}
            <Link
              href={"https://play.google.com/store/apps/details?id=id.go.bandarlampungkota.sipandamobile&hl=en-US"}
              className="inline-flex items-center px-6 py-2 bg-white text-[#1a6334] rounded-full font-medium hover:bg-green-900 hover:text-white transition-colors"
            >
              <IconDownload size={20} className="mr-2" />
              DAPATKAN APLIKASI
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OurAppsSection
