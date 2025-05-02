"use client";
import PDFViewer from "@/components/PDFViewer";
import { IconCalendar, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { getFormattedDateTime } from "@/lib/utils";

const ContentDetailDokumen = ({ data }: { data: any }) => {
  const handleDownload = async (fileUrl: any) => {
    try {
      const response = await fetch(fileUrl, { method: "GET" });

      if (!response.ok) throw new Error("Gagal mengunduh file");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "dokumen.pdf";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Info Dokumen */}
      <div className="flex flex-row mt-2 gap-2 text-gray-600">
        <div className="flex flex-row text-xs items-center gap-1">
          <IconCalendar size={15} />{" "}
          {getFormattedDateTime(data.createdAt.toISOString())}
        </div>
        <span className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs">
          {data.kategoriDokumen.namaKategori}
        </span>
      </div>

      {/* Keterangan */}
      <p className="mt-4 text-gray-700">{data.keterangan}</p>

      {/* File Dokumen */}
      <div className="mt-5 bg-gray-100 p-4 rounded-md shadow">
        <PDFViewer
          fileUrl={data.fileDokumen.replace("uploads/", "api/files/")}
        />
      </div>

      {/* Tombol Download (Jika isDownloadable === true) */}
      {data.isDownloadable && (
        <button
          onClick={() => {
            handleDownload(data.fileDokumen.replace("uploads/", "api/files/"));
          }}
          className="mt-4 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
        >
          <IconDownload size={18} />
          Download Dokumen
        </button>
      )}
    </div>
  );
};

export default ContentDetailDokumen;
