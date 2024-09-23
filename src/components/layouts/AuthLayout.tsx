'use client';

import Footer from "../nav/footer/Footer";
import Header from "../nav/header/Header";
import '@/app/styles.css';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen'>
      <main className='flex flex-1 flex-col overflow-y-auto'>
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />
        <div className='content'>{children}</div>
        <Footer />
      </main>
    </div>
  );
}