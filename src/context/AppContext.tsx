import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'; // 👇 Tách riêng dòng này ra

// Tạo khung dữ liệu (Context)
interface AppContextType {
  addLead: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Hàm xử lý giả lập khi gửi form
  const addLead = (data: any) => {
    console.log("Dữ liệu form:", data);
    alert("✅ Gửi thành công! (Check Console)");
  };

  return (
    <AppContext.Provider value={{ addLead }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook để các trang con gọi dùng
export const useAppContext = () => {
  const context = useContext(AppContext);
  // Nếu chưa bao bọc Provider thì trả về hàm rỗng để không bị lỗi crash app
  if (!context) {
    return { 
      addLead: (data: any) => console.log("Chưa có Context, data:", data) 
    };
  }
  return context;
};