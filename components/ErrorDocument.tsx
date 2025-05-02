import { Center, rem } from '@mantine/core'
import { IconBackhoe } from '@tabler/icons-react'
import React from 'react'

const ErrorDocument = () => {
  return (
    <Center c={'gray'} className='flex flex-col gap-2'><IconBackhoe style={{width: rem(120), height: rem(120)}} /> <span>Kami Sedang Membuat Sesuatu Yang Hebat</span></Center>
  )
}

export default ErrorDocument