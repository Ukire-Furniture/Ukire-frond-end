import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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
import HomePage from "./home/HomePage";

function isLoggedIn() {
  // Contoh: cek token di localStorage
  return !!localStorage.getItem("userToken");
}

// Komponen ProtectedRoute
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <App />; // App = landing page
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produk"
          element={
            <ProtectedRoute>
              <ProdukPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produk/:id"
          element={
            <ProtectedRoute>
              <ProdukDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pemesanan"
          element={
            <ProtectedRoute>
              <PemesananPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pembayaran"
          element={
            <ProtectedRoute>
              <PembayaranPage />
            </ProtectedRoute>
          }
        />
        {/* Route lain tetap */}
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