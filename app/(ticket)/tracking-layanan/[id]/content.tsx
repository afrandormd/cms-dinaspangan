"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ViewFileComponent from '@/components/view-file';
import { getFormattedDateTime } from '@/lib/utils';
import { closeLayanan, sendChatAduan } from '@/services/layanan';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSend, IconPhoto, IconCheck } from '@tabler/icons-react'; // Use IconCheck for confirmation
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContentDetailTiket = ({ data, isAdmin = false }: { data: any; isAdmin?: boolean }) => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState('');
    const [image, setImage] = useState<File | null>(null); // File selection
    const [isFileSelected, setIsFileSelected] = useState(false); // State for changing icon
    const [openDialog, setOpenDialog] = useState(false);
    const [id, setId] = useState('');

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setIsFileSelected(true); // Set to true if a file is selected
        }
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return null;
        }
    };

    const handleSendMessage = async () => {
        if (!chat && !image) {
            toast.error("Chat tidak boleh kosong");
            return;
        }

        setLoading(true);

        try {
            let uploadedFileUrl = null;

            // Handle file upload if a file is selected
            if (image) {
                const uploadResult = await handleUpload(image);
                if (uploadResult) {
                    uploadedFileUrl = uploadResult.filePath;
                } else {
                    setLoading(false);
                    toast.error("File upload failed");
                    return;
                }
            }

            let bodyToSend: any = {
                tiketAduanId: data.id,
                notiket: data.notiket,
            };

            if (session?.user.level === 'operator-helpdesk') {
                bodyToSend.userId = session.user.id;
                bodyToSend.adminText = chat;
            } else {
                bodyToSend.aduanText = chat;
            }

            bodyToSend.imgText = uploadedFileUrl;

            const response = await sendChatAduan(bodyToSend);

            if (response.status) {
                toast.success("Berhasil mengirim pesan.");
                setChat('');
                setImage(null);
                setIsFileSelected(false); // Reset after success
            } else {
                toast.error("Gagal mengirim pesan. Silahkan coba lagi.");
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    };

  const closeTiket = (id:any) => {
      setOpenDialog(!openDialog)
      setId(id);
  }

  const confirmClose = async () => {
      const del = await closeLayanan(id);
      if(del.status) {
          notifications.show({
              title: 'Informasi',
              message: 'Berhasil selesaikan layanan',
              color: 'green',
              position: 'top-center',
          });
          setOpenDialog(false);
      }else {
          notifications.show({
              title: 'Informasi',
              message: 'Gagal selesaikan layanan',
              color:'red',
              position: 'top-center',
          });
          setOpenDialog(false);
      }
  }

    return (
        <div className="p-4 pb-28 relative bg-gray-50">
            <div className="text-center flex justify-center flex-col items-center mb-5">
                <img src="/balam.png" width={50} />
                <h1 className="text-2xl font-bold leading-tight uppercase text-gray-800">Layanan dan Konsultasi</h1>
                <h1 className="text-gray-600">DINAS PANGAN KOTA BANDAR LAMPUNG</h1>
            </div>

            <div className={`bg-${data.statusAduan === 'START' ? 'green' : 'red'}-50 border-l-4 border-${data.statusAduan === 'START' ? 'green' : 'red'}-500 px-4 py-2 rounded mb-2 text-sm text-gray-700`}>
                Status Tiket : <span className="font-bold">{data.statusAduan === 'START' ? 'OPEN' : 'CLOSED'}</span>
            </div>

            {
                session && session.user && session.user.level === 'operator-helpdesk' && <div className='bg-red-50 p-2'>
                  <h1 className='text-sm font-bold'>Anda Login Sebagai Op Helpdesk</h1>
                  { data.statusAduan == 'START' && <Button color='red'  onClick={()=>closeTiket(data.id)}>Selesaikan Layanan</Button> }
                  { data.statusAduan == 'FINISH' && <Button color='green'  onClick={()=>closeTiket(data.id)}>Buka Kembali Layanan</Button> }
                </div>
            }

            <div className="bg-white border rounded shadow p-4 text-sm space-y-2">
                <p><strong>Nama Pengirim:</strong> {data.nama}</p>
                <p><strong>Email Pengirim:</strong> {data.email}</p>
                <p><strong>NIK Pengirim:</strong> {data.nik}</p>
                <p><strong>No Telpon Pengirim:</strong> {data.noTelepon}</p>
                <p><strong>Keterangan:</strong> {data.isiAduan}</p>
            </div>

            {/* Input Chat Fixed */}
            {
              data.statusAduan === 'START' && <div className="bg-white border-t p-4 flex space-x-2 shadow-md mx-auto mt-5">
              <input
                  type="text"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="border w-full p-2 focus:ring-2 focus:ring-green-300 outline-none"
              />
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center">
                  <input type="file" onChange={handleFile} className="hidden" />
                  {isFileSelected ? <IconCheck size={18} /> : <IconPhoto size={18} />}
              </label>
              <Button onClick={handleSendMessage} loading={loading}>
                  <IconSend />
              </Button>
          </div>
            }
            

            {/* Chat Section */}
            <div className="mt-5 border rounded p-3 h-64 bg-white shadow-inner overflow-y-auto">
              {data.ChatAduan && data.ChatAduan.length > 0 && data.ChatAduan.map((message: any, index: number) => (
                <div key={index} className={`flex ${message.adminText ? 'justify-start' : 'justify-end'} mb-3`}>
                  <div className={`max-w-xs p-3 rounded-lg shadow-md text-white ${message.adminText ? 'bg-blue-500' : 'bg-green-500'} relative`}>
                    
                    {/* Image Component - Moved to the top */}
                    {message.imgText && (
                      <div className="mb-3 max-w-[350px]">
                        <ViewFileComponent filePath={message.imgText} title={'gambar chat'} key={message.imgText} />
                      </div>
                    )}

                    {/* Chat Text */}
                    <p>{message.adminText ? message.adminText : message.aduanText}</p>
                    
                    {/* Timestamp */}
                    <span className="block mt-2 text-xs text-gray-300">{getFormattedDateTime(message.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>

            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
              <AlertDialogContent>
                  <AlertDialogHeader>
                  <AlertDialogTitle>Selesaikan Layanan ini?</AlertDialogTitle>
                  <AlertDialogDescription>
                      Data Layanan akan diselesaikan.
                  </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmClose}>Ya</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>

        </div>
    );
};

export default ContentDetailTiket;
