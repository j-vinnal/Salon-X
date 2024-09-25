'use client';

import {JWTContext} from '@/states/contexts/JWTContext';
import {useRouter} from 'next/navigation';
import React, {useContext, useEffect, useState} from 'react';
import Footer from '../nav/footer/Footer';
import Header from '../nav/header/Header';
import Sidebar from '../nav/sidebar/Sidebar';
import '@/app/styles.css';

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {jwtResponse} = useContext(JWTContext)!;
  const router = useRouter();

  useEffect(() => {
    if (jwtResponse === undefined) {
      router.push('/signin');
    } 
  }, [jwtResponse, router]);

  if (jwtResponse === undefined) {
    return null;
  }

  return (
    <div className='flex h-screen'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className='flex flex-1 flex-col overflow-y-auto'>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='content'>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
