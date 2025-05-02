import React, { Suspense } from "react";
import Content from "./content";
import { getPegawai } from "@/services/profil-pejabat";

const ProfilPejabatPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const page = parseInt(searchParams.page) || 1;
  const limit = 20;
  const { pegawai, total } = await getPegawai(page, limit);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full flex mt-2">
      <Content data={pegawai} currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default ProfilPejabatPage;
