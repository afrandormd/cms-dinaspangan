import { getFormattedDateTime } from '@/lib/utils'
import { IconCalendar, IconEye, IconTimeDuration0 } from '@tabler/icons-react'
import { TimerIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DetailArtikelView = ({data}:{data:any}) => {
  return (
    <div className='flex flex-col'>
        <h1 className='text-2xl font-bold leading-tight'>{data.judul}</h1>

        <div className='flex flex-row mt-2 gap-2'>
            <div className='flex flex-row text-xs items-center justify-center gap-1'><IconCalendar size={15} /> {getFormattedDateTime(data.createdAt.toISOString())}</div>
            <div className='flex flex-row text-xs items-center justify-center gap-1'><IconEye size={15} /> {data.counterView}</div>
            <div className='flex flex-row text-xs items-center justify-center'><span className='bg-green-50 rounded px-2 py-1'>{data.kategoriArtikel.namaKategori}</span></div>
        </div>

        <div className='mt-5'>
        <Image
                src={data.thumbnail.replace("uploads/","api/files/")}
                alt={data.judul}
                width={800}
                height={100}
                className="object-cover rounded-md"
            />
        </div>
        <div className='mt-10' dangerouslySetInnerHTML={{ __html: data.isi }} />
    </div>
  )
}

export default DetailArtikelView