"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircleIcon, CheckSquare2Icon, PlusCircle, SaveAllIcon, SaveIcon } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { ActionIcon, Alert, ButtonGroup, FileButton, Input, Modal, Select, TextInput } from '@mantine/core'
import { IconChevronLeft, IconChevronRight, IconInfoCircle, IconPencil, IconTrashFilled } from '@tabler/icons-react'
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
import { getFormattedDateTime } from '@/lib/utils'
import { deletePengumuman, savePengumuman, updatePengumuman } from '@/actions/pengumuman.action'

const Content = ({ data, currentPage, totalPages }:{data:any,currentPage:any,totalPages:any}) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const [openDialog, setOpenDialog] = useState(false);
    // const [file, setFile] = useState<File | null>(null);
    const [judul,setJudul] = useState('');
    const [isi,setIsi] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [id,setId] = useState('');
    
    const [loading,setLoading] = useState(false);

    const [opened, { open, close }] = useDisclosure(false);

    const router = useRouter();


    useEffect(() => {},[])

    const onChangeIsi = (e:any) => {
      setIsi(e);
    }

    const create = () => {
      setShowForm(!showForm);
      resetForm();
    }

    const save = async () => {

      if(judul == '') {
        notifications.show({
            title: 'Informasi',
            message: 'Harap isi judul berita terlebih dahulu',
            color:'red',
            position: 'top-center',
        });
        return;
      }

      if(isi == '') {
        notifications.show({
            title: 'Informasi',
            message: 'Harap isi isi berita terlebih dahulu',
            color:'red',
            position: 'top-center',
        });
        return;
      }

      if(id!='') {
        setLoading(true)

        const updateing = await updatePengumuman({
          id: parseInt(id),
          judul: judul,
          isi: isi,
        })
        if(updateing.status) {
          notifications.show({
              title: 'Informasi',
              message: 'Berhasil mengubah data',
              color: 'green',
              position: 'top-center',
          });
          resetForm();
          setShowForm(false);
          setLoading(false);
        }else {
          notifications.show({
              title: 'Informasi',
              message: 'Gagal mengubah data',
              color:'red',
              position: 'top-center',
          });
          setLoading(false);
        }
        return;
      }

      setLoading(true)

      const saveing = await savePengumuman({
        judul: judul,
        isi: isi,
      })
      if(saveing.status) {
        notifications.show({
            title: 'Informasi',
            message: 'Berhasil menyimpan data',
            color: 'green',
            position: 'top-center',
        });
        resetForm();
        setShowForm(false);
        setLoading(false);
      }else {
        notifications.show({
            title: 'Informasi',
            message: 'Gagal menyimpan data',
            color:'red',
            position: 'top-center',
        });
        setLoading(false);
      }
        

    }

    const resetForm = () => {
      setJudul('');
      setId('');
      setIsi('');
    }

    const deleteData = (id:any) => {
      setOpenDialog(!openDialog)
      setId(id);
  }

  const confirmDelete = async () => {
      const del = await deletePengumuman({
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

    const updateData = (item:any) => {
      setId(item.id.toString());
      setJudul(item.judul);
      setIsi(item.isi);
      setShowForm(true);
    }

    const handlePageChange = (page:any) => {
      if (page >= 1 && page <= totalPages) {
        router.push(`/get-panel/pengumuman?page=${page}`);
      }
    };

  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>
                <div className='flex flex-row justify-between'>
                    <h1>Form Pengumuman</h1>
                    <Button variant={'outline'} size={'sm'} onClick={create}><PlusCircle /></Button>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
          {
            showForm && <div className='flex flex-row gap-2'>
              <ReactQuill
                theme="snow"
                onChange={onChangeIsi}
                defaultValue={isi}
                className='w-full'
              />
              <div className='border p-4 flex flex-col gap-2 w-[400px]'>
                <TextInput value={judul} onChange={(e)=>setJudul(e.target.value)} placeholder='Judul' label="Judul Pengumuman" />
                <Button onClick={save} variant={'default'} disabled={loading}>{ loading ? 'Sedang menyimpan...' : 'Simpan'}</Button>
              </div>
            </div>
          }

          <section className={`${showForm && 'mt-20' }`}>
            <h1 className='text-slate-600 font-bold'>Data Pengumuman</h1>
            <Table className='border rounded-md'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item:any,index:number) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell>{item.judul}</TableCell>
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

    </Card>
  )
}

export default Content