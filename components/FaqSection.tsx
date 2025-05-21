"use client";

import { Accordion, Container, Title, Text } from "@mantine/core";

const faqData = [
  {
    question: "Apa itu Dinas Pangan Kota Bandar Lampung?",
    answer:
      "Dinas Pangan adalah lembaga pemerintahan daerah yang bertanggung jawab dalam urusan ketahanan pangan dan distribusi bahan pangan di wilayah Kota Bandar Lampung.",
  },
  {
    question: "Bagaimana cara menghubungi Dinas Pangan?",
    answer:
      "Anda bisa menghubungi kami melalui halaman kontak di website ini atau langsung datang ke kantor kami di Jalan Dokter Susilo Nomor 2 Sumur Batu, Gedung Batu Atas Lt 10, Bandar Lampung, Lampung 35214",
  },
  {
    question: "Apa layanan yang disediakan oleh Dinas Pangan?",
    answer:
      "Kami menyediakan layanan seperti konsultasi dan pengaduan",
  },
  {
    question: "Dimanakah Kantor Dinas Pangan Kota Bandar Lampung?",
    answer:
      "Kantor kami berada di lantai 10 gedung pemerintah kota bandar lampung di Jalan Dokter Susilo Nomor 2 Kota Bandar Lampung",
  }
];

export default function FaqSection() {
  return (
    <Container size="md" py="xl">
      <Title order={2} mb="md" ta="center" className="text-green-900">PERTANYAAN YANG SERING DI AJUKAN</Title>
      <Text mb="lg" ta="center" c="dimmed">
        Temukan jawaban dari pertanyaan umum seputar layanan kami
      </Text>

      <Accordion variant="separated" radius="md" defaultValue={faqData[0].question}>
        {faqData.map((item) => (
          <Accordion.Item value={item.question} key={item.question}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel className="bg-gray-200 text-black/80 font-normal">{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
