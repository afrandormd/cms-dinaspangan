"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link";

interface ProfileCardProps {
  title?: string
  description?: string
  backgroundImageUrl?: string
  logoUrl?: string
  buttonText?: string
  buttonLink?: string
}

export default function ProfileCard({
  title = "PROFILE SINGKAT",
  description = "Dinas Pangan Kota Bandar Lampung mulai dibentuk pada Tahun 2016 berdasarkan Peraturan Daerah Nomor 07 Tahun 2016 tentang Pembentukan Susunan Perangkat Daerah Kota Bandar Lampung dan berdasarkan Peraturan Walikota Bandar Lampung, Nomor 46 Tahun 2016 tentang Tugas Fungsi dan Tata Kerja Dinas Pangan Kota Bandar Lampung.",
  backgroundImageUrl = "/img/gedung-pemkot.png",
  logoUrl = "/img/logo-bandar-lampung.svg",
  buttonText = "LIHAT PROFILE",
  buttonLink = "/sejarah",

}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
  <motion.div className="container mx-auto" 
    initial={{ opacity: 0, y: 50}} 
    whileInView={{ opacity: 1, y: 0}}
    transition={{ duration: 1, delay: 0.4}} 
    >
    <div className="flex flex-col md:flex-row justify-between items-stretch my-24 w-full rounded-xl overflow-hidden">
      {/* Image Container */}
      <div
        className="relative md:w-2/5 h-64 md:h-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={backgroundImageUrl || "/placeholder.svg"}
          alt="Background"
          fill
          className="object-cover"
        />

        {/* Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-green-800/80"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isHovered ? 0.8 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Logo */}
        <motion.div
          className="absolute top-1/2 right-1/2 md:right-22 transform -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-18 -my-12 -mx-12 h-18 md:w-24 md:h-24">
            <Image
              src={logoUrl || "/placeholder.svg"}
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="md:w-3/5 p-6 bg-white flex flex-col md:ml-12">
        <motion.h2
          className="text-3xl font-bold text-green-800 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-gray-700 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={buttonLink}
            className="inline-block border-2 border-green-700 text-green-700 px-4 py-2 rounded-md hover:bg-green-900 hover:text-white transition-colors"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
  )
}
