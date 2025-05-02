"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircleIcon, CheckSquare2Icon, PlusCircle, SaveAllIcon, SaveIcon } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { ActionIcon, Alert, ButtonGroup, FileButton, Input, Modal, Select, TextInput } from '@mantine/core'
import { IconChevronLeft, IconChevronRight, IconFile, IconInfoCircle, IconPencil, IconTrashFilled } from '@tabler/icons-react'
import axios from 'axios'
import { notifications } from '@mantine/notifications'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import ViewFileComponent from '@/components/view-file'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteBerita, saveBerita, updateBerita } from '@/services/artikel'
import { useDisclosure } from '@mantine/hooks'
import MediaList from '../media/media-list'
import { getFormattedDate, getFormattedDateOnly, getFormattedDateTime } from '@/lib/utils'
import { deletePengumuman, savePengumuman, updatePengumuman } from '@/actions/pengumuman.action'
import { deletePsat, updatePsat } from '@/actions/psat.action'

const Content = ({ data, currentPage, totalPages }:{data:any,currentPage:any,totalPages:any}) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const [openDialog, setOpenDialog] = useState(false);
    const [statusPengajuan, setStatusPengajuan] = useState('');
    const [judul,setJudul] = useState('');
    const [isi,setIsi] = useState('');
    const [tanggalTerbit,setTanggalTerbit] = useState('');
    const [tanggalBerakhir,setTanggalBerakhir] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [id,setId] = useState('');
    const [fileModal,setFileModal] = useState("");
    
    const [loading,setLoading] = useState(false);

    const [opened, { open, close }] = useDisclosure(false);

    const router = useRouter();


    useEffect(() => {},[])

    const resetForm = () => {
      setStatusPengajuan('');
      setId('');
      setTanggalTerbit('');
      setTanggalBerakhir('');
    }

    const deleteData = (id:any) => {
      setOpenDialog(!openDialog)
      setId(id);
  }

  const confirmDelete = async () => {
      const del = await deletePsat({
          id: parseInt(id)
      });
      if(del.status) {
          notifications.show({
              title: 'Informasi',
              message: 'Berhasil menghapus data',
              color: 'green',
              position: 'top-center',
          });
          setOpenDialog(false);
      }else {
          notifications.show({
              title: 'Informasi',
              message: 'Gagal menghapus data',
              color:'red',
              position: 'top-center',
          });
          setOpenDialog(false);
      }
  }

  const save = async () => {
    setLoading(true);
    let dataToSend = {
      id: parseInt(id),
      tanggalTerbit: tanggalTerbit,
      tanggalBerakhir: tanggalBerakhir,
      statusPengajuan: statusPengajuan
    }
  
    const res = await updatePsat(dataToSend);

    if(res.status) {
      notifications.show({
        title: 'Informasi',
        message: 'Berhasil menyimpan data',
        color: 'green',
        position: 'top-center',
      });
      resetForm();
      setShowForm(false);
      setLoading(false);
    } else {
      notifications.show({
        title: 'Informasi',
        message: 'Gagal menyimpan data',
        color:'red',
        position: 'top-center',
      });
      setLoading(false);
    }

  }

    const updateData = (item:any) => {
      setId(item.id.toString());
      setStatusPengajuan(item.statusPengajuan);
      setTanggalTerbit(item.tanggalTerbit);
      setTanggalTerbit(item.tanggalBerakhir);
      setShowForm(true);
    }

    const handlePageChange = (page:any) => {
      if (page >= 1 && page <= totalPages) {
        router.push(`/get-panel/pengumuman?page=${page}`);
      }
    };

    const showFile = (url:string) => {
      setFileModal(url);
      open();
    }

  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>
                <div className='flex flex-row justify-between'>
                    <h1>Layanan PSAT</h1>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
          {
            showForm && <div className='flex flex-row gap-2'>
              <div className='border p-4 flex flex-col gap-2 w-[400px]'>
                <TextInput value={tanggalTerbit} type='date' onChange={(e)=>setTanggalTerbit(e.target.value)} placeholder='Tanggal Terbit' label="Tanggal Terbit" />
                <TextInput value={tanggalBerakhir} type='date' onChange={(e)=>setTanggalBerakhir(e.target.value)} placeholder='Tanggal Berakhir' label="Tanggal Berakhir" />
                  <Select label="Status Registrasi" data={['PERMOHONAN','DIPROSES','DITERIMA','DITOLAK']} defaultValue={statusPengajuan} 
                    onChange={(_value, option) => setStatusPengajuan(_value!)}/>
                <Button onClick={save} variant={'default'} disabled={loading}>{ loading ? 'Sedang menyimpan...' : 'Simpan'}</Button>
              </div>
            </div>
          }

          <section className={`${showForm && 'mt-20' }`}>
            <h1 className='text-slate-600 font-bold'>Data Registrasi PSAT</h1>
            <Table className='border rounded-md'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Nomor Register</TableHead>
                  <TableHead>Pelaku Usaha</TableHead>
                  <TableHead>Komoditas Utama</TableHead>
                  <TableHead>Komoditas Tambahan</TableHead>
                  <TableHead>Tanggal Terbit</TableHead>
                  <TableHead>Tanggal Berakhir</TableHead>
                  <TableHead>Status Pengajuan</TableHead>
                  <TableHead>Doc</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item:any,index:number) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell>{item.nomorRegister}</TableCell>
                    <TableCell>{item.pelakuUsaha}</TableCell>
                    <TableCell>{item.komoditasUtama}</TableCell>
                    <TableCell>{item.komoditasTambahan}</TableCell>
                    <TableCell>{item.tanggalTerbit && getFormattedDate(item.tanggalTerbit.toISOString())}</TableCell>
                    <TableCell>{item.tanggalBerakhir && getFormattedDate(item.tanggalBerakhir.toISOString())}</TableCell>
                    <TableCell>{item.statusPengajuan}</TableCell>
                    <TableCell>
                        {
                          item.doc &&
                          <ActionIcon variant="transparent" aria-label="show" onClick={()=>showFile(item.doc)}>
                            <IconFile style={{ width: '70%', height: '70%' }} stroke={1.5} color='red' />
                        </ActionIcon>
                        }
                    </TableCell>
                    <TableCell>{getFormattedDateTime(item.createdAt.toISOString())}</TableCell>
                    
                    <TableCell className="text-right">
                        <ActionIcon variant="transparent" aria-label="delete" onClick={()=>deleteData(item.id)}>
                            <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} color='red' />
                        </ActionIcon>
                        <ActionIcon variant="transparent" aria-label="update" onClick={()=>updateData(item)}>
                            <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} color='gray' />
                        </ActionIcon>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
            
            <ButtonGroup>
              <Button size={'icon'}  disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                <IconChevronLeft />
              </Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? 'secondary' : 'outline'}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button size={'icon'} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                <IconChevronRight />
              </Button>
            </ButtonGroup>
          </div>
          </section>

          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Hapus Data ini?</AlertDialogTitle>
                <AlertDialogDescription>
                    Data akan dihapus data sistem, dan tidak dapat dikembalikan lagi.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Ya</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
              
        </CardContent>

        <Modal
          opened={opened}
          onClose={close}
          title="Preview Dokumen"
          fullScreen
          radius={0}
          transitionProps={{ transition: 'fade', duration: 200 }}
        >
         <div className='w-full h-[800px]'>
          <ViewFileComponent filePath={fileModal} title='' />
         </div>
        </Modal>

    </Card>
  )
}

export default Content