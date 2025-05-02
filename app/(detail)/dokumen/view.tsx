"use client";
import { ActionIcon, Button, ButtonGroup, Input, Select } from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ViewDokumen = ({
  kategori,
  currentPage,
  dokumen,
  total,
}: {
  kategori: any[];
  currentPage: any;
  dokumen: any[];
  total: any;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listKategori, setListKategori] = useState<any[]>([]);
  const [searchTitle, setSearchTitle] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("kategori") || ""
  );

  useEffect(() => {
    if (kategori) {
      let wrapKategori: any[] = [];
      kategori.forEach((k) => {
        wrapKategori.push({ value: k.id.toString(), label: k.namaKategori });
      });
      setListKategori(wrapKategori);
    }
  }, [kategori]);

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= total) {
      const query = new URLSearchParams({
        p: page.toString(),
        search: searchTitle,
        kategori: selectedCategory,
      });
      router.push(`/dokumen?${query.toString()}`);
    }
  };

  const handleSearch = () => {
    const query = new URLSearchParams({
      p: "1",
      search: searchTitle,
      kategori: selectedCategory,
    });
    router.push(`/dokumen?${query.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filter & Search */}
      <div className="flex flex-row items-center gap-2 bg-white p-4 shadow-md rounded-lg">
        <Input
          leftSection={<IconSearch className="text-gray-500" />}
          placeholder="Cari judul..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.currentTarget.value)}
          className="flex-1"
        />
        <Select
          data={listKategori}
          placeholder="Pilih Kategori"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value || "")}
          className="w-52"
        />
        <ActionIcon
          variant="filled"
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleSearch}
        >
          <IconSearch size={18} />
        </ActionIcon>
      </div>

      {/* List Dokumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dokumen?.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <Link href={`/dokumen/${item.id}`}>
              <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                {item.judul}
              </h2>
            </Link>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-2">
              {item.kategoriDokumen.namaKategori}
            </span>
            <p className="text-gray-600 text-sm mt-3">{item.keterangan}</p>
            <Link href={`/dokumen/${item.id}`} className="mt-4 inline-block">
              <Button
                size="sm"
                variant="filled"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Lihat Dokumen
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          size="icon"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full"
        >
          <IconChevronLeft />
        </Button>
        {[...Array(total)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "filled" : "outline"}
            className={`rounded-full px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "border-gray-300 text-gray-600"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size="icon"
          disabled={currentPage === total}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full"
        >
          <IconChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ViewDokumen;
