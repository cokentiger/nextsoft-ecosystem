import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';

// Import tất cả các "Mảnh ghép"
import { HeroSection } from '../../components/corporate/HeroSection';
import { EcosystemBento } from '../../components/corporate/EcosystemBento';
import { BlogFeedSection } from '../../components/corporate/BlogFeedSection';
import { CustomerSuccess } from '../../components/corporate/CustomerSuccess'; // 👈 Mới
import { ResourceHub } from '../../components/corporate/ResourceHub';         // 👈 Mới

const CorporateHome = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Nextsoft Corporation | Hệ sinh thái Chuyển đổi số toàn diện</title>
        <meta name="description" content="Nextsoft cung cấp giải pháp phần mềm Nha khoa, HRM, CRM và thiết kế Website chuyên nghiệp." />
      </Helmet>

      {/* 1. HERO: Ấn tượng đầu tiên */}
      <HeroSection />

      {/* 2. PRODUCTS: Giới thiệu sản phẩm */}
      <EcosystemBento />

      {/* 3. CUSTOMERS: Chứng minh uy tín (Mới thêm) */}
      <CustomerSuccess />

      {/* 4. RESOURCES: Tặng quà & Thu Lead (Mới thêm) */}
      <ResourceHub />

      {/* 5. BLOG: Tin tức chuyên ngành */}
      <BlogFeedSection />

    </MainLayout>
  );
};

export default CorporateHome;