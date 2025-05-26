"use client";
import React, { useEffect, useState } from 'react'
// import NavigationComponent from './NavigationComponent'
import { usePathname } from 'next/navigation';
import NavigationDetailComponent from './NavigationDetailComponent';

const HeaderComponent = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isRootPath = pathname === '/';

  return (
    <div className={`fixed w-full transition-colors duration-500 z-50 hover:bg-green-800 ${isScrolled || !isRootPath ? 'bg-green-800' : 'bg-transparent'} z-10`}>
      {/* <NavigationDetailComponent /> */}
    <NavigationDetailComponent />
    </div>
  )
}

export default HeaderComponent