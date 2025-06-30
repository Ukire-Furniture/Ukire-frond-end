import React from 'react'
    import ReactDOM from 'react-dom/client'
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom' 
    import './index.css'

    // Impor semua komponen halaman
    import HomePage from "./home/HomePage";
    import LoginPage from './login/LoginPage.jsx';
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
    import LandingPage from './landingpage/LandingPage.jsx';

    // Fungsi global untuk mengecek status login
    export function isLoggedIn() { 
      return !!localStorage.getItem("accessToken");
    }

    // Fungsi global untuk mendapatkan role user
    export function getUserRole() {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user = JSON.parse(userData);
                return user.role;
            } catch (e) {
                console.error("Failed to parse user data from localStorage for role:", e);
                return null;
            }
        }
        return null;
    }

    // Komponen ProtectedRoute
    function ProtectedRoute({ children, adminOnly = false }) { // Tambahkan prop adminOnly
      if (!isLoggedIn()) {
        window.location.href = '/login'; 
        return null;
      }

      // Jika hanya untuk admin, cek role-nya
      if (adminOnly && getUserRole() !== 'admin') {
          alert("Anda tidak memiliki akses ke halaman ini. Hanya admin yang diizinkan.");
          window.location.href = '/profile'; // Arahkan ke halaman profil user biasa
          return null;
      }

      return children;
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            {/* Rute Publik */}
            <Route path="/" element={isLoggedIn() ? <HomePage /> : <LandingPage />} />
            <Route path="/produk" element={<ProdukPage />} />
            <Route path="/produk/:id" element={<ProdukDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Rute yang Dilindungi (user biasa dan admin) */}
            <Route path="/pemesanan" element={<ProtectedRoute><PemesananPage /></ProtectedRoute>} />
            <Route path="/pembayaran" element={<ProtectedRoute><PembayaranPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/profile/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/profile/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            
            {/* Rute Admin (adminOnly=true) - Opsional, jika ada halaman admin di frontend */}
            {/* <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>} /> */}

            {/* Rute 404 Not Found */}
            <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-ukire-gray text-ukire-text">
                    <h1 className="text-6xl font-bold text-ukire-amber">404</h1>
                    <p className="text-xl mb-4">Halaman Tidak Ditemukan</p>
                    <Link to="/" className="text-ukire-black underline hover:text-ukire-amber">Kembali ke Beranda</Link>
                </div>
            } />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    )
