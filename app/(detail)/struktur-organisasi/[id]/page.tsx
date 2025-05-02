import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea, Skeleton } from "@mantine/core";
import ErrorDocument from "@/components/ErrorDocument";
import Image from "next/image";
import BreadCrumb from "@/components/BreadCrumb";
import { IconChevronRight } from "@tabler/icons-react";
import { getStrukturOrganisasiById } from "@/actions/struktur-organisasi.action";
import ViewDetailProfil from "./view";
import Link from "next/link";

const DetailProfil = async ({ params }: { params: { id: any } }) => {
  const fetchData = await getStrukturOrganisasiById(params.id);
  return (
    <main className="flex flex-col gap-2 pb-36">
      <BreadCrumb>
        <div className="flex flex-row text-slate-600 text-sm">
          <span>Home</span> <IconChevronRight />{" "}
          <span>
            {" "}
            <Link href={"/struktur-organisasi"}>Profil</Link>
          </span>{" "}
          <IconChevronRight /> Detail Profil
        </div>
      </BreadCrumb>
      <div className="flex flex-col gap-2">
        <ScrollArea>
          <div className="min-h-[400px]">
            <Suspense
              fallback={
                <>
                  <Skeleton height={35} radius="md" />
                  <Skeleton height={35} mt={6} radius="md" />
                  <Skeleton height={35} mt={6} width="70%" radius="md" />
                  <Skeleton height={35} mt={10} radius="md" />
                  <Skeleton height={35} mt={6} radius="md" />
                  <Skeleton height={35} mt={6} width="70%" radius="md" />
                </>
              }
            >
              {fetchData.status && <ViewDetailProfil data={fetchData.data} />}
              {fetchData.status === false && <ErrorDocument />}
            </Suspense>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
};

export default DetailProfil;
