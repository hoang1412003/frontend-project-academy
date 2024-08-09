import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/notFound/NotFound';
import Home from './pages/home/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/admin/AdminHome';
import Products from './pages/productsPage/ProductsPage';
import ProductDetail from './pages/productDetailPage/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import 'aos/dist/aos.css'; // Nhập CSS cho AOS
import AOS from 'aos'; // Nhập AOS
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Thay đổi thời gian hiệu ứng
      offset: 100, // Khoảng cách để kích hoạt hiệu ứng
      easing: 'ease-in-out', // Phương thức easing
      delay: 200, // Thay đổi độ trễ hiệu ứng
    });
  }, []);
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
