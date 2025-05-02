"use client"
import { IconChevronCompactRight, IconChevronRight } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
const ContentKontakPage = () => {
 
  return (
   
        <div className='flex flex-col gap-2'>
            <div className='p-4 min-h-[400px]'>
                <div className='border bg-white rounded-md p-4'>
                <div className='flex flex-col gap-2'>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.9659194818723!2d105.2638006756276!3d-5.42214909455712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dbb354546c87%3A0xae5742278acf2938!2sPemerintah%20Kota%20Bandar%20Lampung!5e0!3m2!1sen!2sid!4v1722768316214!5m2!1sen!2sid" width="100%" height="450" style={{border:0}} loading="lazy" />
              
                  <div className='mb-10 mt-10'>
                      <div className='flex flex-col gap-2'>
                          <div className='flex flex-row gap-2'>
                              <IconChevronRight />
                              <h1 className='text-gray-400'>Alamat : Jalan Doktor Susilo Nomor 2 Sumur Batu, Gedung Satu Atap Lt 10, Bandar Lampung, Lampung 35214</h1>
                          </div>
                          <div className='flex flex-row gap-2'>
                              <IconChevronRight />
                              <h1 className='text-gray-400'>Email : dinaspangan@bandarlampungkota.go.id</h1>
                          </div>     
                      </div>
                  </div>

              </div>
                </div>
            </div>
            </div>
  )
}

export default ContentKontakPage