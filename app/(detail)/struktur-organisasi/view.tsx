"use client";
import ErrorDocument from "@/components/ErrorDocument";
import { getStrapiMedia } from "@/utils/api-helper"; // This import might not be used in the provided code snippet
import markdownToHtml from "@/utils/markdownToHtml"; // This import might not be used in the provided code snippet
import { Skeleton } from "@mantine/core"; // This import might not be used in the provided code snippet
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
    // Ensure useEffect runs only once on mount, or when 'data' changes,
    // to prevent infinite loops if 'data' is always a new reference.
    // However, given the current structure, it will re-run on every render if data is not memoized or stable.
    callApi();
  }, [data]); // Add data to dependency array

  const SkeletonCard = () => (
    <div className="group relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-700">
      <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
      </div>
      <div className="space-y-3">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-3/4"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse mt-4"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-lime-700 py-16 mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 via-emerald-600/80 to-lime-700/80"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Struktur Organisasi
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Kenali tim kepemimpinan Dinas Pangan Kota Bandar Lampung yang berdedikasi untuk melayani masyarakat dengan integritas dan profesionalisme
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {!loading && content && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {content.map((item: any, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Decorative gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                {/* Profile Image Container */}
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                  <Image
                    src={item.foto.replace("uploads/", "api/files/")}
                    alt={item.namaPejabat}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-xl text-gray-800 leading-tight group-hover:text-green-700 transition-colors duration-300">
                      {item.namaPejabat}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed px-2">
                      {item.jabatan}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300/50 relative overflow-hidden group/btn"
                    onClick={() => router.push(`/struktur-organisasi/${item.id}`)}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Lihat Profil</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-green-400/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-emerald-400/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && errorContent && <ErrorDocument />}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-3deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ViewStrukturOrganisasi;