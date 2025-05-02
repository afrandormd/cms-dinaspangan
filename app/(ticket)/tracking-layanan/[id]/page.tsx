import { getDetailTiket } from '@/services/layanan'
import React, { Suspense } from 'react'
import ContentDetailTiket from './content';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const TrackingTicketPage = async ({ params, searchParams }: { params: { id: string }, searchParams?: {
  key?: string;
} }) => {

  const key = searchParams?.key || '';
  if(!key) {
    notFound();
  }

  const isiTiket = await getDetailTiket(params.id.toString(),key);
  return (
    <div className='w-full m-auto flex bg-stone-100 h-screen px-2'>
      <div className='flex flex-col mx-auto bg-white overflow-y-auto shadow-md w-[500px]'>
        <div className='bg-green-300 p-2'>
          <h1 className='text-xs'>No Tiket : <b>#{params.id}</b></h1>
        </div>
        <Suspense>
          {
            isiTiket && isiTiket.status ? <ContentDetailTiket data={isiTiket.data} /> : <div className='text-center w-full'>
                <div className="text-center flex justify-center flex-col items-center mb-5 mt-10 w-full">
                  <img src="/balam.png" width={50} />
                  <h1 className="text-2xl font-bold leading-tight uppercase text-gray-800">Layanan dan Konsultasi</h1>
                  <h1 className="text-gray-600">DINAS PANGAN KOTA BANDAR LAMPUNG</h1>
                  <h1 className='font-bold mt-10 bg-red-50 p-4 rounded'>Nomor Tiket Tidak Ditemukan</h1>
                  <Link className='mt-4 text-slate-600' href={"/"}>Kembali ke Home</Link>
              </div>
              </div>
          }
        </Suspense>
      </div>
    </div>
  )
}

export default TrackingTicketPage