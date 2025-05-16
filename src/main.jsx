import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import LoginPage from './login/LoginPage.jsx'
import RegisterPage from './register/RegisterPage.jsx';
import ProdukPage from './produk/ProdukPage.jsx';
import ProdukDetailPage from './produk/[id]/detailpage.jsx';
import PembayaranPage from './pembayaran/PembayaranPage.jsx';
import PemesananPage from './pemesanan/PemesananPage.jsx';
import CartPage from './cart/CartPage.jsx';
import AboutPage from './about/AboutPage.jsx';
import ContactPage from './contact/ContactPage.jsx';
import FAQPage from './faq/FAQPage.jsx';
import OrdersPage from './profile/orders/OrdersPage.jsx';
import ProfilePage from './profile/profilePage.jsx';
import WishlistPage from './profile/wishlist/WishlistPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/produk" element={<ProdukPage />} />
        <Route path="/produk/:id" element={<ProdukDetailPage />} />
        <Route path="/pembayaran" element={<PembayaranPage />} />
        <Route path="/pemesanan" element={<PemesananPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/profile/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)