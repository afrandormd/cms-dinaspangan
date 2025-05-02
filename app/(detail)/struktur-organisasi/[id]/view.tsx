import React from "react";
import Image from "next/image";
import {
  IconIdBadge,
  IconList,
  IconBook,
  IconBriefcase,
  Icon123,
  IconSchool,
  IconHeart,
  IconGenderAgender,
} from "@tabler/icons-react";

const ViewDetailProfil = ({ data }: { data: any }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      {/* Foto & Nama */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Foto lebih besar & responsif */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0">
          <Image
            src={data.foto.replace("uploads/", "api/files/")}
            alt={data.namaPejabat}
            width={224}
            height={224}
            className="rounded-full border-4 border-gray-300 shadow-lg object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* Nama & Jabatan */}
        <div className="flex-1 text-center sm:text-left sm:pl-4 sm:mt-0 mt-20">
          <h2 className="text-3xl font-bold">{data.namaPejabat}</h2>
          <p className="text-gray-600 text-lg mt-1">
            {data.jabatan || "Jabatan Tidak Tersedia"}
          </p>
          {/* Detail Profil */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <DetailItem
              icon={<IconIdBadge size={20} />}
              label="NIP"
              value={data.nip || "-"}
            />
            <DetailItem
              icon={<IconGenderAgender size={20} />}
              label="Jenis Kelamin"
              value={data.jenisKelamin}
            />
            <DetailItem
              icon={<IconHeart size={20} />}
              label="Agama"
              value={data.agama}
            />
            <DetailItem
              icon={<Icon123 size={20} />}
              label="Golongan"
              value={data.golongan || "-"}
            />
            <DetailItem
              icon={<IconBriefcase size={20} />}
              label="Jabatan"
              value={data.jabatan || "-"}
            />
            <DetailItem
              icon={<IconSchool size={20} />}
              label="Pendidikan Terakhir"
              value={data.pendidikanTerakhir}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk menampilkan detail dengan ikon
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
      <span className="text-gray-500 mr-3">{icon}</span>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default ViewDetailProfil;
