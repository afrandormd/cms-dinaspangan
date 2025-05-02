import React from 'react'

const BreadCrumb = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="px-5 pt-10 md:pt-0 relative w-full pb-8 bg-transparent" style={{ background: 'url("/img/bg-dots.svg") center/cover' }}>
        <div className='flex flex-col gap-2'>
            {children}
        </div>
    </div>
  )
}

export default BreadCrumb