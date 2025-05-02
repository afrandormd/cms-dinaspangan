"use client"
import { Button, Checkbox, Group, Select, TextInput, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import BreadCrumb from '@/components/BreadCrumb'
import { IconChevronRight } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { saveLayananAduan } from '@/services/layanan';

const ContentLayananPage = ({kategoriLayanan}:{kategoriLayanan:any[]}) => {
  const [loading, setLoading] = useState(false);
  const [dataKategori, setDataKategori] = useState<any[]>([]);
  const [kategoriId,setKategoriId] = useState("");
  const [result,setResult] = useState("");

  useEffect(() => {
    let wrapperData:any[] = [];
    setDataKategori([]);
    if(kategoriLayanan) {
        kategoriLayanan.map((val:any) => {
            wrapperData.push({
                label: val.namaKategori,
                value: val.id.toString()
            })
        })
    }
    setDataKategori(wrapperData);
},[kategoriLayanan])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      nik: '',
      nama: '',
      isiAduan: '',
      noTelepon: '',
      kategoriLayananId: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      termsOfService: (value) => (value) ? null : 'Harus diceklis',
      nik: hasLength({ min: 16, max: 16 }, 'NIK Harus 16 angka'),
      nama: hasLength({ min: 3 }, 'Nama Harus Diisi'),
      isiAduan: hasLength({ min: 3 }, 'Isi Pengaduan Harus Diisi'),
      noTelepon: hasLength({ min: 10 }, 'No Telpon Harus Diisi'),
    },
  });

  

  const onSubmit = async (values:any) => {
    setLoading(true);
    setResult("");

    const res = await saveLayananAduan({
        nik: values.nik,
        nama: values.nama,
        email: values.email,
        isiAduan: values.isiAduan,
        noTelepon: values.noTelepon,
        kategoriLayananId: parseInt(kategoriId),
    })

    if(res.status) {
        toast.success("Terima kasih, pengaduan sudah kami terima.");
        setResult(`Berikut Merupakan nomor Tiket anda. Nomor Tiket juga telah kami kirim ke email ${res.data?.email} yang sudah di inputkan. No Tiket: ${res.data?.notiket}`);
        form.reset();
    }else {
        setResult("");
        toast.error("Gagal mengirim pengaduan. Silahkan coba lagi.");
    }

    setLoading(false);

  }
  return (
   
        <div className='flex flex-col gap-2'>
            <div className='p-4 min-h-[400px]'>
                <div className='border bg-white rounded-md p-4'>
                  <form onSubmit={form.onSubmit((values) => onSubmit(values))} className='max-w-[400px]'>
                    {
                        result && <div className='bg-green-50 p-4 rounded'>{result}</div>
                    }
                    
                    <TextInput
                      withAsterisk
                      label="NIK"
                      placeholder="NIK"
                      key={form.key('nik')}
                      {...form.getInputProps('nik')}
                    />

                    <TextInput
                      withAsterisk
                      label="Nama Lengkap"
                      placeholder="Nama Lengkap"
                      key={form.key('nama')}
                      {...form.getInputProps('nama')}
                    />

                    <TextInput
                      withAsterisk
                      label="No Telp/WhatsApp"
                      placeholder="No Telp/WhatsApp"
                      key={form.key('noTelepon')}
                      {...form.getInputProps('noTelepon')}
                    />

                    <TextInput
                      withAsterisk
                      label="Email"
                      placeholder="your@email.com"
                      key={form.key('email')}
                      {...form.getInputProps('email')}
                    />
                    <Select 
                        withAsterisk
                        label="Pilih Kategori Layanan"
                        placeholder="Pilih"
                        data={dataKategori}
                        key={form.key('kategoriLayananId')}
                        {...form.getInputProps('kategoriLayananId')}
                        searchable
                        onChange={(_value, option) => setKategoriId(_value!)}
                        defaultValue={kategoriId}
                    />

                    <Textarea
                      withAsterisk
                      label="Isi Pengaduan"
                      placeholder="Isi Pengaduan"
                      key={form.key('isiAduan')}
                      {...form.getInputProps('isiAduan')}
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
            </div>
            </div>
  )
}

export default ContentLayananPage