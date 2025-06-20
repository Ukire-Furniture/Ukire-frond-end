import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callApi } from "../utils/api";
import Navbar from '../components/Navbar';
import FooterLinks from '../landingpage/FooterLinks';

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await callApi("login", "POST", { email, password });

      if (response.access_token) {
        localStorage.setItem("accessToken", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user)); // Simpan data user lengkap dengan role
        
        // Redirection berdasarkan role
        if (response.user.role === 'admin') {
          window.location.href = 'http://ukirebackend.test/admin'; // Redirect ke dashboard Filament
        } else {
          window.location.href = '/'; // Redirect ke halaman utama frontend
        }
      } else {
        setError("Login gagal: Respon API tidak valid.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.message && typeof err.message === 'string' && err.message.includes("message") && err.message.includes("errors")) {
          try {
            const errorObj = JSON.parse(err.message);
            const validationErrors = Object.values(errorObj.errors).flat().join('\n');
            setError("Validasi Gagal:\n" + validationErrors);
          } catch (parseError) {
            setError(err.message || "Terjadi kesalahan saat login.");
          }
      } else {
          setError(err.message || "Terjadi kesalahan saat login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 shadow-sm rounded-lg">
            <h1 className="text-2xl font-bold mb-8 text-center text-ukire-black">LOGIN</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-ukire-text">Email*</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm mb-1 text-ukire-text">Password*</label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" disabled={loading} />
                  <label htmlFor="remember" className="text-sm text-ukire-text">Ingat saya</label>
                </div>
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-ukire-amber">
                  Lupa password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-ukire-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Memuat..." : "Login"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-ukire-text">
                Belum memiliki akun?{" "}
                <Link to="/register" className="text-ukire-black hover:underline">
                  Daftar sekarang
                </Link>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-center text-ukire-text mb-4">Atau login dengan</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-ukire-text" disabled={loading}>
                  <span className="text-sm">Google</span>
                </button>
                <button className="flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-ukire-text" disabled={loading}>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer di sini */}
      <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 bg-white">
        <FooterLinks />
        <div className="pt-8 border-t border-gray-200 text-xs text-ukire-text flex flex-wrap gap-6">
          <Link to="/about">ABOUT US</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/order-tracking">ORDER TRACKING</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </footer>
    </div>
  );
}
