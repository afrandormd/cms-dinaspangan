"use client";
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React from 'react'

const ModalPejabat = ({profil}:{profil:string}) => {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
        <Modal opened={opened} onClose={close} title="Profil">
            {profil}
        </Modal>

        <Button onClick={open} leftSection={<IconSearch />}>Lihat Profil</Button>
    </div>
  )
}

export default ModalPejabat