"use client"
import { savePsat } from '@/actions/psat.action';
import { Button, Checkbox, FileInput, Group, Textarea, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const FormPsatPage = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          pelakuUsaha: '',
          namaPimpinan: '',
          pic: '',
          noPic: '',
          alamat: '',
          komoditasUtama: '',
          komoditasTambahan: '',
          doc: '',
          termsOfService: false,
        },
    
        validate: {
          email: (value) => isEmail(value) ? null : 'Email tidak valid',
          pelakuUsaha: hasLength({ min: 3 }, 'Pelaku Usaha Harus Diisi'),
          pic: hasLength({ min: 3 }, 'Nama PIC Harus Diisi'),
          noPic: hasLength({ min: 3 }, 'Nomor PIC Harus Diisi'),
          alamat: hasLength({ min: 3 }, 'Alamat Harus Diisi'),
          komoditasUtama: hasLength({ min: 3 }, 'Komoditas Utama Harus Diisi'),
          komoditasTambahan: hasLength({ min: 0 }, ''),
          termsOfService: (value) => (value) ? null : 'Harus diceklis',
        },
      });
    

      const handleFile = (event: any) => {
        setFile(event);
        form.setFieldValue('doc', event);
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

    const onSubmit = async (values:any) => {
        try {
            let uploadedFileUrl = null;
            
            // Handle file upload if a file is selected
            setLoading(true);
            if (file) {
                const uploadResult = await handleUpload(file);
                if (uploadResult) {
                    uploadedFileUrl = uploadResult.filePath;
                } else {
                    setLoading(false);
                    toast.error("File upload failed");
                    return;
                }
            }else {
                setLoading(false);
                toast.error("File upload Gagal")
                return;
            }
      
            const response = await savePsat({
                pelakuUsaha: values.pelakuUsaha,
                nomorRegister: values.nomorRegister,
                statusPengajuan: values.statusPengajuan,
                namaPimpinan: values.namaPimpinan,
                pic: values.pic,
                noPic: values.noPic,
                alamat: values.alamat,
                komoditasUtama: values.komoditasUtama,
                komoditasTambahan: values.komoditasTambahan,
                keterangan: values.keterangan,
                email: values.email,
                doc: uploadedFileUrl
            });
    
            if (response.status) {
                setLoading(false);
                // Handle successful response (e.g., show success message)
                toast.success("Berhasil registrasi PSAT. Silahkan periksa email untuk melihat nomor Registrasi guna pelacakan Data.");
                console.log('Form submitted successfully', response.data);

                form.reset();
                setFile(null);
            } else {
                setLoading(false);
                // Handle failure response (e.g., show error message)
                toast.error("Gagal registrasi PSAT. Silahkan coba lagi.");
                console.error('Form submission failed', response.data);
            }
      
          } catch (error) {
            setLoading(false);
            // Handle error (e.g., show an error message)
            console.error('Form submission error:', error);
          }
        
    }

  return (
    <div>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))} className='max-w-[400px]'>
            <TextInput
                withAsterisk
                label="Email (Email aktif untuk mengirimkan nomor registrasi)"
                placeholder="your@email.com"
                key={form.key('email')}
                {...form.getInputProps('email')}
            />

            <TextInput
                withAsterisk
                label="Pelaku Usaha"
                placeholder="Pelaku Usaha"
                key={form.key('pelakuUsaha')}
                {...form.getInputProps('pelakuUsaha')}
            />

            <TextInput
                withAsterisk
                label="Nama Pimpinan"
                placeholder="Nama Pimpinan"
                key={form.key('namaPimpinan')}
                {...form.getInputProps('namaPimpinan')}
            />

            <TextInput
                withAsterisk
                label="Nama PIC"
                placeholder="Nama PIC"
                key={form.key('pic')}
                {...form.getInputProps('pic')}
            />

            <TextInput
                withAsterisk
                label="Nomor PIC"
                placeholder="Nomor PIC"
                key={form.key('noPic')}
                {...form.getInputProps('noPic')}
            />

            <TextInput
                withAsterisk
                label="Alamat"
                placeholder="Alamat"
                key={form.key('alamat')}
                {...form.getInputProps('alamat')}
            />

            <TextInput
                withAsterisk
                label="Komoditas Utama"
                placeholder="Komoditas Utama"
                key={form.key('komoditasUtama')}
                {...form.getInputProps('komoditasUtama')}
            />

            <TextInput
                withAsterisk
                label="Komoditas Tambahan"
                placeholder="Komoditas Tambahan"
                key={form.key('komoditasTambahan')}
                {...form.getInputProps('komoditasTambahan')}
            />

            <FileInput key={form.key('doc')}
                {...form.getInputProps('doc')}
                label="Dokumen (PDF)"
                onChange={handleFile}
                description="Masukkan Dokumen Kelengkapan"
                placeholder="Masukkan Dokumen Kelengkapan"
            />
            
            <Checkbox
                mt="md"
                label="Saya menyatakan bahwa data yang saya kirim benar dan dapat dibuktikan."
                key={form.key('termsOfService')}
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Submit</Button>
            </Group>

            </form>
    </div>
  )
}

export default FormPsatPage