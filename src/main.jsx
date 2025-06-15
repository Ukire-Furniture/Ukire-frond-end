import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom' // Tambahkan useNavigate
import App from './App.jsx' // Ini adalah komponen App yang utama
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
import { callApi } from './utils/api.js'; // Impor callApi

// Fungsi global untuk mengecek status login
export function isLoggedIn() { // Ekspor fungsi ini agar bisa digunakan di mana saja
  return !!localStorage.getItem("accessToken");
}

// Komponen ProtectedRoute
// Akan mengarahkan ke halaman login jika user belum terautentikasi
function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    // Jika belum login, redirect ke halaman login
    return <LoginPage />; // Atau bisa juga <App /> untuk landing page jika tidak ingin langsung ke login
  }
  return children; // Jika sudah login, tampilkan children (komponen yang dilindungi)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rute Publik (tidak memerlukan login) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Keranjang bisa diakses tanpa login, tapi checkout perlu login */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Rute yang Dilindungi (memerlukan login) */}
        {/* Perhatikan: Halaman home/produk/detail produk juga dilindungi jika kamu ingin begitu.
           Jika tidak ingin dilindungi, pindahkan Route ini ke bagian "Rute Publik" di atas.
           Saat ini saya set agar mereka bisa diakses publik untuk kemudahan tes awal.
        */}
        <Route path="/" element={<HomePage />} /> {/* Homepage biasanya publik */}
        <Route path="/produk" element={<ProdukPage />} /> {/* Daftar produk biasanya publik */}
        <Route path="/produk/:id" element={<ProdukDetailPage />} /> {/* Detail produk biasanya publik */}
        
        {/* Rute yang wajib login */}
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/profile/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        {/* Rute 404 Not Found (jika tidak ada rute yang cocok) */}
        {/* Ini akan menampilkan halaman App (landing page) jika rute tidak cocok */}
        <Route path="*" element={<App />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

