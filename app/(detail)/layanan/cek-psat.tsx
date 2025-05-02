"use client"
import { Button, Checkbox, FileInput, Group, Textarea, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import React, { useState } from 'react'
import { DateInput } from '@mantine/dates';
import { checkStatusPsat } from '@/actions/psat.action';
import toast from 'react-hot-toast';

const CekPsatPage = () => {
  const [loading, setLoading] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          nomorRegister: '',
        },
    
        validate: {
          nomorRegister: hasLength({ min: 3 }, 'Nomor Registrasi Harus Diisi'),
        },
      });

    const onSubmit =  async (values:any)=>{
      setLoading(true);
      
      const result = await checkStatusPsat({nomorRegister: values.nomorRegister});

      if(result != "ERROR") {
        toast.success(result);
      }else {
        toast.error("Nomor Registrasi Tidak Ditemukan");
      }
      setLoading(false);
    }
  return (
    <div>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))} className='max-w-[400px]'>
          
            <TextInput
                withAsterisk
                label="Nomor Registrasi"
                placeholder="Nomor Registrasi"
                key={form.key('nomorRegister')}
                {...form.getInputProps('nomorRegister')}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Cek Nomor Registrasi</Button>
            </Group>

            </form>
    </div>
  )
}

export default CekPsatPage