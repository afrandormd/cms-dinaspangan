"use client";
import ErrorDocument from "@/components/ErrorDocument";
import { getStrapiMedia } from "@/utils/api-helper";
import markdownToHtml from "@/utils/markdownToHtml";
import { Skeleton } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ViewStrukturOrganisasi = ({ data }: { data: any[] }) => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      if (data) {
        setErrorContent(false);
        setContent(data);
      } else {
        setErrorContent(true);
        setContent([]);
      }
      setLoading(false);
    };
    callApi();
  });

  return (
    <div>
      {loading && (
        <>
          <Skeleton height={35} radius="md" />
          <Skeleton height={35} mt={6} radius="md" />
          <Skeleton height={35} mt={6} width="70%" radius="md" />
          <Skeleton height={35} mt={10} radius="md" />
          <Skeleton height={35} mt={6} radius="md" />
          <Skeleton height={35} mt={6} width="70%" radius="md" />
        </>
      )}
      {!loading && content && (
        <>
          <div className="bg-white p-4 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content.map((item: any, index) => (
                <div
                  key={index}
                  className="bg-transparent p-4 rounded-md shadow-md relative h-80 overflow-hidden"
                >
                  <Image
                    src={item.foto.replace("uploads/", "api/files/")}
                    alt={item.namaPejabat}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 rounded-b-md">
                    <div className="bg-black/50 px-2 py-1 rounded-md block">
                      <h3 className="font-bold text-center text-white text-xl ">
                        {item.namaPejabat}
                      </h3>
                      <p className="text-center text-white">{item.jabatan}</p>
                    </div>

                    <button
                      className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md block mx-auto transition-colors duration-300 hover:bg-green-600"
                      onClick={() =>
                        router.push(`/struktur-organisasi/${item.id}`)
                      }
                    >
                      Lihat Profil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {!loading && errorContent && <ErrorDocument />}
    </div>
  );
};

export default ViewStrukturOrganisasi;
