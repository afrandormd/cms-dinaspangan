"use client";
import React, { useEffect } from 'react'

export const ReportView = ({slug}:{slug:string}) => {
    useEffect(()=>{
        fetch('/api/increment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slug })
        })
    },[slug])
  return (
    <div></div>
  )
}
