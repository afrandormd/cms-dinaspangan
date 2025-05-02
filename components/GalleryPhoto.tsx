"use client";
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const GalleryPhoto = ({images}:{images:any[]}) => {

    const [dataImage,setDataImage] = useState<any[]>([]);

    useEffect(() => {
        setDataImage(images);
        let img:any[] = [];
        images.forEach(image =>{
          img.push({
            original: image.file.replace("uploads/","api/files/"),
            thumbnail: image.file.replace("uploads/","api/files/"),
            originalTitle: image.title,
          })
        })
        setDataImage(img);
    }, [images]);

  return <ImageGallery items={dataImage} />;
}

export default GalleryPhoto