import Link from 'next/link'
import React from 'react'

export default function ScrollToTop() {
  return (
    <Link
      href={"#beranda"}
      className="fixed bottom-10 right-10 p-2 bg-[#F0A434] rounded-full shadow-lg cursor-pointer transition-all hover:bg-black z-99"
    >
      up
    </Link>
  )
}

