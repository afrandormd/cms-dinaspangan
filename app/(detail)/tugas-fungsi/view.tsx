"use client"
import ErrorDocument from '@/components/ErrorDocument';
import markdownToHtml from '@/utils/markdownToHtml';
import { Skeleton } from '@mantine/core';
import React, { useEffect, useState } from 'react'


const ViewTugasFungsi = ({data}:{data:any}) => {
    const [contentTugas, setContentTugas] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [errorContent, setErrorContent] = useState(false);
    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            if(data) {
                setErrorContent(false);
                setContentTugas(data.tugasDanFungsi);
            }else {
                setErrorContent(true);
                setContentTugas("");
            }
            setLoading(false);
        }
        callApi();
    })

  return (
    <div>
        { loading &&  <>
        <Skeleton height={35} radius="md" />
        <Skeleton height={35} mt={6} radius="md" />
        <Skeleton height={35} mt={6} width="70%" radius="md" />
        <Skeleton height={35} mt={10} radius="md" />
        <Skeleton height={35} mt={6} radius="md" />
        <Skeleton height={35} mt={6} width="70%" radius="md" />
      </> }
        { !loading && contentTugas && <>
        
            <div className='mb-4'>
                <div dangerouslySetInnerHTML={{ __html: contentTugas }} />
            </div>
            
        </> }
        { !loading && errorContent && <ErrorDocument />}
    </div>
  )
}

export default ViewTugasFungsi