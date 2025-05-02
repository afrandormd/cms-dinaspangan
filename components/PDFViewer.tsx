"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min.mjs"; // Ensure worker is in node_modules

// Set workerSrc for Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }: { fileUrl: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setCurrentPage(1); // Reset to page 1 on new file
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [fileUrl]);

  const renderPage = async (pageNum: number) => {
    if (!pdfDoc || !containerRef.current) return;

    try {
      const page = await pdfDoc.getPage(pageNum);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = { canvasContext: context, viewport };
      await page.render(renderContext).promise;

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(canvas);
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  };

  useEffect(() => {
    if (pdfDoc) renderPage(currentPage);
  }, [pdfDoc, currentPage]);

  const handleNextPage = () => {
    if (pdfDoc && currentPage < pdfDoc.numPages)
      setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg shadow overflow-auto">
      <div ref={containerRef} className="flex flex-col mb-4" />
      <div className="flex gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Prev
        </button>
        <span>
          Page {currentPage} {pdfDoc ? `of ${pdfDoc.numPages}` : ""}
        </span>
        <button
          onClick={handleNextPage}
          disabled={pdfDoc ? currentPage >= pdfDoc.numPages : true}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
