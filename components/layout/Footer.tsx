import { Divider, rem } from '@mantine/core'
import { IconBrandFacebook, IconBrandInstagram, IconBrowser, IconBrowserCheck, IconCopyright, IconGlobe, IconGlobeFilled, IconLocation, IconMail, IconPhone, IconPhoneCall, IconPin, IconPinned, IconWorld } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  
  return (
    <div className='bg-green-900 w-full'>
        <div className="flex flex-col gap-4 px-10 md:px-32 py-3">
           <div className="flex flex-row justify-center items-center gap-3">
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconBrandFacebook style={{ width: rem(30), height: rem(30) }} /></Link>
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconBrandInstagram style={{ width: rem(30), height: rem(30) }} /></Link>
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconMail style={{ width: rem(30), height: rem(30) }} /></Link>
                <Link href={""} className='bg-white rounded-full p-1 text-slate-600'><IconPhone style={{ width: rem(30), height: rem(30) }} /></Link>
           </div>
           <Divider />

           <div className="flex flex-col justify-between md:flex-row gap-1">
            <div className="flex flex-col gap-1 text-white">
                <h4>DINAS PANGAN</h4>
                <h3>KOTA BANDAR LAMPUNG</h3>
                <h4 className='text-sm flex flex-row gap-1'><IconPinned style={{width:rem(20), height:rem(20) }} /> Bandar Lampung</h4>
                <h4 className='text-sm flex flex-row gap-1'><IconMail style={{width:rem(20), height:rem(20) }} /> dinaspangan@bandarlampungkota.go.id</h4>
                <h4 className='text-sm flex flex-row gap-1'><IconPhoneCall style={{width:rem(20), height:rem(20) }} /> (0721) 88888</h4>
            </div>

            <div className=''>
                <h4 className='text-white text-sm flex flex-row gap-1'><IconCopyright /> 2024 Dinas Pangan Bandar Lampung</h4>
                <p className='text-white mt-5'>Data Realtime Visitor</p>
                {/* Visitor Counter */}
                <div className='-my-3' 
                  dangerouslySetInnerHTML={{
                    __html: `
                      <a href='http://www.freevisitorcounters.com'>freevisitorcounters</a> <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=1347aecaf4031ea0741d7899495bbfeb8f5174ca'></script>
                    <script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1340067/t/0"></script>
                    `
                  }}
                />
            </div>
           </div>

      </div>

    </div>
  )
}

export default Footer
