import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export const SafeHtml = ({ html, className = "" }: SafeHtmlProps) => {
  // 👇 Lọc sạch mã độc trước khi render
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
};