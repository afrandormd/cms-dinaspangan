"use client"
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const SigninPage = ()=>{
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        initialValues: {
          email: '',
          password: '',
        },
    
        validate: {
          email: (value) =>isEmail(value) ? null : 'Email tidak valid',
          password: hasLength({ min: 6 }, 'Password minimal 6 karakter'),
        },
      });

      const handleSubmit = async (values: typeof form.values) => {
        setError(null);
        setLoading(true);
        const result = await signIn('credentials', {
          redirect: false,
          username: values.email,
          password: values.password,
        });
    
        if (result?.error) {
          setLoading(false);
          setError('Login gagal. Periksa email dan password Anda.');
        } else {
          setLoading(false);
          router.push('/get-panel');
        }
      };

    return (
        <div className="h-screen w-screen bg-slate-100 flex flex-col items-center justify-center">
            <div className="w-[400px] flex flex-col m-auto justify-center items-center gap-4">
                <Image src={"/balam.png"} width={80} height={60} alt='logo balam'/>
                <div className='bg-white rounded-md p-4 flex flex-col gap-2'>
                    <h1 className='font-bold text-slate-800 text-center'>DINAS PANGAN BANDAR LAMPUNG</h1>
                    <div className="h-[1px] w-full bg-slate-700"></div>

                    {error && <div className="text-red-600 text-sm bg-red-100 p-2 rounded text-center">{error}</div>}

                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className='w-[400px] space-y-2'>
          
                        <TextInput
                            withAsterisk
                            label="Email"
                            type='email'
                            placeholder="Email"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput 
                            withAsterisk
                            label="Password"
                            placeholder="Password"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button loading={loading} type="submit">Masuk</Button>
                        </Group>

                    </form>
                </div>
            </div>
        </div>
    )

}

export default SigninPage