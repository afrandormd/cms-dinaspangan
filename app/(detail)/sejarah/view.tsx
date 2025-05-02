"use client";
import ErrorDocument from '@/components/ErrorDocument';
import markdownToHtml from '@/utils/markdownToHtml';
import { Center, Loader, Skeleton, rem } from '@mantine/core';
import { IconBackhoe, IconError404, IconUnlink } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'

// interface Attributes {
//     Isi: string
// }

// interface Data{
//     id:string,
//     attributes: Attributes
// }

const ViewSejarah = ({data}:{data:any}) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorContent, setErrorContent] = useState(false);
    useEffect(() => {
        const callApi = async () => {
            setLoading(true);
            if(data) {
                setErrorContent(false);
                setContent(data.sejarah);
            }else {
                setErrorContent(true);
                setContent("");
            }
            setLoading(false);
        }
        callApi();
    },[data])

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
        { !loading && content && <div dangerouslySetInnerHTML={{ __html: content }} /> }
        { !loading && errorContent && <ErrorDocument />}
    </div>
  )
}

export default ViewSejarah