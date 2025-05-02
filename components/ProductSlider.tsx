"use client";
import React, { useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { ActionIcon, ScrollArea } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const ProductSlider = () => {
    const viewport = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "Description of Product 1",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 2,
      title: "Product 2",
      description: "Description of Product 2",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 3,
      title: "Product 3",
      description: "Description of Product 3",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 4,
      title: "Product 4",
      description: "Description of Product 4",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 5,
      title: "Product 5",
      description: "Description of Product 5",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 6,
      title: "Product 6",
      description: "Description of Product 6",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 7,
      title: "Product 7",
      description: "Description of Product 7",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 8,
      title: "Product 8",
      description: "Description of Product 8",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 9,
      title: "Product 9",
      description: "Description of Product 9",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 10,
      title: "Product 10",
      description: "Description of Product 10",
      image: "https://via.placeholder.com/400x300"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    viewport.current!.scrollTo({
        left: viewport.current!.scrollLeft + 250,
        behavior: 'smooth',
      });
  };

  const prevSlide = () => {
    viewport.current!.scrollTo({
        left: viewport.current!.scrollLeft - 250,
        behavior: 'smooth',
      });
  };

  const renderProducts = () => {
    return products.map((product:any) => (
      <div key={product.id} className="w-[250px] h-[250px]  p-4">
        <ProductCard {...product} />
      </div>
    ));
  };

  return (
      <div className="w-full">
        <div className="flex items-center justify-center">
        
            <ActionIcon onClick={prevSlide} variant="filled" radius="xl" aria-label="prevSlide" color="teal">
                <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            
            <ScrollArea viewportRef={viewport}>
                <div className="flex gap-1 overflow-hidden flex-row">
                {renderProducts()}
                </div>
            </ScrollArea>
            <ActionIcon onClick={nextSlide} variant="filled" radius="xl" aria-label="nextSlide" color="teal">
                <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
        </div>
      </div>
  );
};

export default ProductSlider;
