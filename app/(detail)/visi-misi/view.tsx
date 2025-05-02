"use client"
import ErrorDocument from '@/components/ErrorDocument';
import markdownToHtml from '@/utils/markdownToHtml';
import { Skeleton } from '@mantine/core';
import React, { useEffect, useState } from 'react'

const ViewVisiMisi = ({data}:{data:any}) => {
    const [contentVisi, setContentVisi] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorContent, setErrorContent] = useState(false);
    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            if(data) {
                setErrorContent(false);
                setContentVisi(data.visiMisi);
            }else {
                setErrorContent(true);
                setContentVisi("");
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
        { !loading && contentVisi && <>
        
            <div className='mb-4'>
                <div dangerouslySetInnerHTML={{ __html: contentVisi }} />
            </div>
        </> }
        { !loading && errorContent && <ErrorDocument />}
    </div>
  )
}

export default ViewVisiMisi