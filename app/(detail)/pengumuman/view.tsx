"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React from "react";

const ViewPengumuman = ({
  pengumuman,
  total,
  loading,
  currentPage,
}: {
  pengumuman: any;
  total: number;
  loading: boolean;
  currentPage: any;
}) => {
  const router = useRouter();

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total) {
      router.push(`/pengumuman?p=${page}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 lg:px-6 py-8">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        📢{" "}
        <span className="text-blue-400 text-transparent bg-clip-text">
          Pengumuman Terbaru
        </span>
      </h1>

      {/* List Pengumuman */}
      <div className="space-y-6">
        {pengumuman?.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Created At (Tanggal Pengumuman) */}
            <p className="text-sm text-gray-500 mb-1">
              🗓️ {formatDate(item.createdAt)}
            </p>

            {/* Judul Pengumuman */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {item.judul}
            </h2>

            {/* Isi Pengumuman */}
            <p className="text-gray-600 mt-3 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: item.isi }} />
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <Button
          size="md"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="rounded-full transition-transform transform hover:scale-110"
        >
          <IconChevronLeft size={20} />
        </Button>

        {[...Array(total)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "filled" : "outline"}
            color={currentPage === index + 1 ? "blue" : "gray"}
            className={`rounded-full transition-all duration-200 
              ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          size="md"
          variant="outline"
          disabled={currentPage === total}
          onClick={() => handlePageChange(currentPage + 1)}
          className="rounded-full transition-transform transform hover:scale-110"
        >
          <IconChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ViewPengumuman;
