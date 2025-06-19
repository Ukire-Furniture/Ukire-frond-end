import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callApi } from "../utils/api";
import Navbar from '../components/Navbar'; // Impor Navbar
import FooterLinks from '../landingpage/FooterLinks'; // Impor FooterLinks

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const response = await callApi("register", "POST", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess(response.message || "Registrasi berhasil!");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); 
    } catch (err) {
      console.error("Register Error:", err);
      // Coba parse error dari backend untuk pesan validasi lebih detail
      if (err.message) {
          try {
              const errorResponse = JSON.parse(err.message);
              if (errorResponse.errors) {
                  const validationErrors = Object.values(errorResponse.errors).flat().join('\n');
                  setError("Validasi Gagal:\n" + validationErrors);
              } else {
                  setError(errorResponse.message || "Terjadi kesalahan saat registrasi.");
              }
          } catch (parseError) {
              setError(err.message || "Terjadi kesalahan saat registrasi.");
          }
      } else {
          setError("Terjadi kesalahan saat registrasi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 shadow-sm rounded-lg">
            <h1 className="text-xl font-bold mb-6 text-center text-ukire-black">DAFTAR AKUN</h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1 text-ukire-text">
                    Nama Lengkap*
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1 text-ukire-text">
                    Email*
                  </label>
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
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-1 text-ukire-text">
                  Password*
                </label>
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-1 text-ukire-text">
                  Konfirmasi Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" required disabled={loading} />
                <label htmlFor="terms" className="text-sm text-ukire-text">
                  Saya menyetujui{" "}
                  <Link to="/terms" className="text-ukire-black hover:underline">
                    Syarat dan Ketentuan
                  </Link>
                </label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="newsletter" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" disabled={loading} />
                <label htmlFor="newsletter" className="text-sm text-ukire-text">
                  Berlangganan newsletter untuk mendapatkan informasi terbaru
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-ukire-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Memuat..." : "Daftar"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-ukire-text">
                Sudah memiliki akun?{" "}
                <Link to="/login" className="text-ukire-black hover:underline">
                  Login disini
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-center text-ukire-text mb-4">Atau daftar dengan</p>
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
        <div className="container mx-auto px-4">
          <FooterLinks /> 
          <div className="pt-8 border-t border-gray-200 text-xs text-ukire-text flex flex-wrap gap-6">
            <Link to="/about">ABOUT US</Link>
            <Link to="/blog">BLOG</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/order-tracking">ORDER TRACKING</Link>
            <Link to="/contact">CONTACT</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
