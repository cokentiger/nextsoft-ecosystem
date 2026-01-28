import { createClient } from '@supabase/supabase-js';

// 1. Lấy chìa khóa từ biến môi trường (File .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 2. Kiểm tra xem có chìa khóa chưa
if (!supabaseUrl || !supabaseKey) {
  throw new Error('⚠️ Lỗi: Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY trong file .env');
}

// 3. Khởi tạo kết nối
export const supabase = createClient(supabaseUrl, supabaseKey);