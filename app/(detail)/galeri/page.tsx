
import BreadCrumb from '@/components/BreadCrumb'
import GalleryPhoto from '@/components/GalleryPhoto'
import { getGallery } from '@/services/site'
import { IconChevronRight } from '@tabler/icons-react'
import React from 'react'

export const revalidate = 30;

const GaleriPage = async () => {
    const galeri = await getGallery();
  return (
    <main className='flex flex-col gap-2 pb-36'>
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Publikasi</span> <IconChevronRight /> <span>Galeri</span>
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Galeri</h1>
        </BreadCrumb>
        <div className='flex flex-col gap-2'>
            <div className='p-4 min-h-[400px]'>
                {
                    galeri && <GalleryPhoto images={galeri} />
                }
                
            </div>
        </div>
    </main>
  )
}

export default GaleriPage