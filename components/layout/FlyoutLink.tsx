"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import {motion, AnimatePresence}  from 'framer-motion';

const FlyoutLink = ({children,href,FlyoutContent}:{children:React.ReactNode,href:string,FlyoutContent?:() => React.JSX.Element}) => {
    const [open, setOpen] = useState(false);
  return (
    <div 
    onMouseEnter={()=>setOpen(true)}
    onMouseLeave={()=>setOpen(false)}
    className='group relative h-fit w-fit'>
        <Link className='relative text-white font-bold' href={href}>{children} 
        <span 
        style={{
            transform: open ? 'scaleX(1)' :'scaleX(0)'
        }}
        className='absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out'/></Link>

        <AnimatePresence>
        {
           open &&  FlyoutContent && <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 15 }}
           style={{ translateX: "-50%" }}
           transition={{ duration: 0.3, ease: 'easeOut' }}
           className='absolute left-1/2 top-12 bg-white text-black'>
            <div className='absolute -top-6 left-0 right-0 h-6 bg-tranparent' />
            {/* <div className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blue-500'/> */}
            <FlyoutContent /></motion.div>
        }
        </AnimatePresence>
    </div>
  )
}

export default FlyoutLink