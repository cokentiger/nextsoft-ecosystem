// Dùng Union Type thay cho Enum (Nhẹ hơn, không bị lỗi compiler)
export type LeadSource = 'facebook' | 'google' | 'referral' | 'other';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'won';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  created_at: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
}