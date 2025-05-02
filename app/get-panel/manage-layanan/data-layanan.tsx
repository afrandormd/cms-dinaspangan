"use client";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ActionIcon, Alert, ButtonGroup, FileButton, Modal } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconHttpDelete, IconInfoCircle, IconPencil, IconSearch, IconTrashFilled } from '@tabler/icons-react'
import { CheckSquare2Icon, PlusCircleIcon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { notifications } from '@mantine/notifications';
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
import { deleteKategoriDokumen, saveKategoriDokumen, updateKategoriDokumen } from '@/services/master-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getFormattedDateTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { deleteAduan } from '@/services/layanan';

const DataLayanan = ({ data, kategori, currentPage, totalPages }:{data:any,kategori:any[],currentPage:any,totalPages:any}) => {
    const [showForm, setShowForm] = useState(false);
    const [judul, setJudul] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [id, setId] = useState('');

    
    const save = async () => {
        if(judul == '') {
            notifications.show({
                title: 'Informasi',
                message: 'Harap isi nama kategori terlebih dahulu',
                color:'red',
                position: 'top-center',
            });
            return;
        }
        
        if(id!= '') {
            confirmUpdate();
            return;
        }
        
        setLoading(true);

        const saveing = await saveKategoriDokumen({
            namaKategori: judul
        })
        if(saveing.status) {
            notifications.show({
                title: 'Informasi',
                message: 'Berhasil menyimpan data',
                color: 'green',
                position: 'top-center',
            });
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

    const updateData = (item:any) => {
        setId(item.id);
        setShowForm(true);
        setJudul(item.namaKategori);
    }

    const confirmUpdate = async () =>{
        setLoading(true);
        const update = await updateKategoriDokumen({
            id: parseInt(id),
            namaKategori: judul
        });
        if(update.status) {
            notifications.show({
                title: 'Informasi',
                message: 'Berhasil mengubah data',
                color: 'green',
                position: 'top-center',
            });
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
    }

    const deleteData = (id:any) => {
        setOpenDialog(!openDialog)
        setId(id);
    }

    const confirmDelete = async () => {
        const del = await deleteAduan(id);
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
  
    
    const create = () => {
        setShowForm(true);
        setJudul('');
        setId('');
    }

    const toTracking = (item:any) => {
        window.open(`/tracking-layanan/${item.notiket}?key=${item.keyToken}`,);
    }

    const router = useRouter();
    
    const handlePageChange = (page:any) => {
        if (page >= 1 && page <= totalPages) {
          router.push(`/get-panel/manage-layanan?page=${page}`);
        }
      };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
            <div className='flex flex-row justify-between'>
                <h1>Data Layanan</h1>
            </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {
            showForm && <section className='w-[300px] gap-2 flex flex-col border p-2 rounded-md transition-all duration-500'>
                <Input placeholder='Nama Kategori' onChange={(e)=>setJudul(e.target.value)} value={judul} />
                <Button onClick={save} variant={'default'} disabled={loading}>{ loading ? 'Sedang menyimpan...' : 'Simpan'}</Button>
            </section>
        }

        <section className={`${showForm && 'mt-20' }`}>
            <h1 className='text-slate-600 font-bold'>Data Layanan dan Konsultasi</h1>
            <Table className='border rounded-md'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>No Tiket</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>No Telepon</TableHead>
                  <TableHead>Kategori Layanan</TableHead>
                  <TableHead>Status Aduan</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item:any,index:number) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index+1}</TableCell>
                    <TableCell>{item.notiket}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.noTelepon}</TableCell>
                    <TableCell>{item.kategoriLayanan.namaKategori}</TableCell>
                    <TableCell>{item.statusAduan == 'START' ? 'OPEN' : 'CLOSED'}</TableCell>
                    <TableCell>{getFormattedDateTime(item.createdAt.toISOString())}</TableCell>
                    <TableCell className="text-right">
                        <ActionIcon variant="transparent" aria-label="delete" onClick={()=>deleteData(item.id)}>
                            <IconTrashFilled style={{ width: '70%', height: '70%' }} stroke={1.5} color='red' />
                        </ActionIcon>
                        <ActionIcon variant="transparent" aria-label="update" onClick={()=>toTracking(item)}>
                            <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} color='gray' />
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

export default DataLayanan