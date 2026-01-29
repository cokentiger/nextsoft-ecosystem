import React from 'react';
import { Header } from './Header'; // Import Header vừa tạo
import { Footer } from './Footer'; // Import Footer cũ

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      
      {/* Header tách rời */}
      <Header />

      {/* Nội dung chính thay đổi theo từng trang */}
      <main className="flex-grow"> 
        {children}
      </main>

      {/* Footer giữ nguyên */}
      <Footer />
    </div>
  );
};