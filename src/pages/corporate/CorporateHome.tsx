import React from 'react';
import { PageRenderer } from '../../components/PageRenderer';
// 👇 Import Layout vào
import { MainLayout } from '../../components/layout/MainLayout';

const CorporateHome = () => {
  return (
    // 👇 Bọc nội dung trong MainLayout
    <MainLayout>
      <PageRenderer slug="corporate-home" />
    </MainLayout>
  );
};

export default CorporateHome;