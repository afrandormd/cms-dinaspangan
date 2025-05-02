import { getFormattedDateOnly, getFormattedDateTime, getFormattedMOnthOnly } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Artikel {
    thumbnail: string,
    title: string,
    shortdesc: string,
    slug: string,
    category: string
}

const timeAgo = (date:any) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

const CardBerita = ({thumbnail,title,shortdesc,slug,category,time}:{thumbnail:any,title:any,shortdesc:any,slug:any,category:any,time:any}) => {
  return (
    <div className="rounded overflow-hidden shadow-lg min-w-full">

            <a href="#"></a>
            <div className="relative">
                <Link href={`/artikel/${slug}`}>
                  <div className="relative h-52 w-full">
                    <Image
                      src={thumbnail}
                      alt={title}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded"
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                  </div>
                </Link>
                <a href="#!">
                    <div
                        className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        {category}
                    </div>
                </a>

                <a href="!#">
                    <div
                        className="text-sm absolute top-0 right-0 bg-indigo-600 px-2 py-1 text-white flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        <span className="font-bold text-xs">{getFormattedDateOnly(time.toISOString())}</span>
                        <small className='text-xs'>{getFormattedMOnthOnly(time.toISOString())}</small>
                    </div>
                </a>
            </div>
            <div className="px-3 py-2">

                <Link href={`/artikel/${slug}`}
                    className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{title}</Link>
                
            </div>
            <div className="px-3 py-2 flex flex-row items-center gap-2">
                <div className="text-sm text-gray-600 line-clamp-3">
                    <div dangerouslySetInnerHTML={{ __html: shortdesc }} />
                </div>
                <Link href={`/artikel/${slug}`}
                    className="ml-auto font-semibold text-sm text-indigo-600 hover:text-indigo-600 transition duration-500 ease-in-out">
                    Selengkapnya...
                </Link>
            </div>
        </div>
  )
}

export default CardBerita