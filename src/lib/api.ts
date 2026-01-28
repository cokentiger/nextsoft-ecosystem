import { supabase } from '../supabaseClient';

// Hàm lấy toàn bộ dữ liệu của 1 trang theo Slug
export const getPageData = async (slug: string) => {
  try {
    // 1. Lấy thông tin trang (Page Info)
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (pageError || !page) {
      console.error("Lỗi lấy trang:", pageError);
      return null;
    }

    // 2. Lấy các section của trang đó (đã bật enabled)
    const { data: sections, error: secError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .eq('is_enabled', true)
      .order('order_index', { ascending: true });

    if (secError) {
      console.error("Lỗi lấy section:", secError);
      return { page, sections: [] };
    }

    return { page, sections };
  } catch (err) {
    console.error("Lỗi hệ thống:", err);
    return null;
  }
};