import BreadCrumb from "@/components/BreadCrumb";
import ErrorDocument from "@/components/ErrorDocument";
import { getDokumenById } from "@/services/dokumen";
import { Skeleton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import React, { Suspense } from "react";
import ContentDetailDokumen from "./view";

export const revalidate = 30;

const DetailDokumen = async ({ params }: { params: { id: string } }) => {
  const { status, data } = await getDokumenById(parseInt(params.id));
  return (
    <main className="flex flex-col gap-2 pb-36">
      <BreadCrumb>
        <div className="flex flex-row text-slate-600 text-sm">
          <span>Home</span> <IconChevronRight /> <span>Dokumen</span>{" "}
          <IconChevronRight /> {status && data.judul}
        </div>
        <h1 className="text-slate-800 font-bold text-3xl">
          {status && data.judul}
        </h1>
      </BreadCrumb>
      <div className="flex flex-col gap-2">
        <div className="p-4 min-h-[400px]">
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
            {status && <ContentDetailDokumen data={data} />}
            {status === false && <ErrorDocument />}
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default DetailDokumen;
