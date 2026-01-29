import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import các trang (Đường dẫn này CHUẨN với ảnh bạn gửi)
import CorporateHome from './pages/corporate/CorporateHome';
import IdentalHome from './pages/products/IdentalHome';
import BlogDetail from './pages/corporate/BlogDetail'; 
import BlogListing from './pages/corporate/BlogListing';
import CustomersPage from './pages/corporate/CustomersPage';
import ResourcesPage from './pages/corporate/ResourcesPage';
import { CustomerDetail } from './pages/corporate/CustomerDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Web Mẹ: nextsoft.vn */}
        <Route path="/" element={<CorporateHome />} />

      
        <Route path="/resources" element={<ResourcesPage />} />


        <Route path="/customers" element={<CustomersPage />} />
        {/* 👇 Thêm dòng này */}
        <Route path="/customers/:slug" element={<CustomerDetail />} />

        {/* 👇 2. Thêm Route cho trang danh sách */}
        <Route path="/blog" element={<BlogListing />} />
        
        {/* Trang chi tiết bài viết (Dùng slug động) */}
        <Route path="/blog/:slug" element={<BlogDetail />} />

        {/* Web Con: nextsoft.vn/products/idental */}
        <Route path="/products/idental" element={<IdentalHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;