import BreadCrumb from '@/components/BreadCrumb'
import { IconChevronRight } from '@tabler/icons-react'
import React from 'react'
import FormPsatPage from './form-psat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CekPsatPage from './cek-psat'

const LayananPage = () => {
  return (
    <main className='flex flex-col gap-2 pb-36'>
        <BreadCrumb>
            <div className="flex flex-row text-slate-600 text-sm">
                <span>Home</span> <IconChevronRight /> <span>Layanan</span>
            </div>
            <h1 className='text-slate-800 font-bold text-3xl'>Layanan</h1>
        </BreadCrumb>
        <div className='flex flex-col gap-2'>
            <div className='p-4 min-h-[400px]'>
                <h1 className='font-bold'>Registrasi PSAT</h1>
                <p>Proses pendaftaran PSAT dapat dilakukan melalui layanan ini. Silahkan lengkapi data yang diperlukan.</p>

                {/* Formulir registrasi PSAT */}
                <div>
                <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">Form Registrasi</TabsTrigger>
                    <TabsTrigger value="cek">Cek Nomor Registrasi</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all">
                  <FormPsatPage />
                </TabsContent>
                <TabsContent value="cek">
                  <CekPsatPage />
                </TabsContent>
              </Tabs>

              </div>
          </div>
        </div>
    </main>
  )
}

export default LayananPage