import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import đúng theo cấu trúc thư mục mới
import CorporateHome from './pages/corporate/CorporateHome'; 
import IdentalHome from './pages/products/IdentalHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Web Mẹ: nextsoft.vn */}
        <Route path="/" element={<CorporateHome />} />
        
        {/* Web Con: nextsoft.vn/products/idental */}
        <Route path="/products/idental" element={<IdentalHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;