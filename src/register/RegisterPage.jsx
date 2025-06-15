import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callApi } from "../utils/api"; // Impor callApi

// Fungsi isLoggedIn tetap seperti di LoginPage
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
  const [success, setSuccess] = useState(null); // State untuk pesan sukses

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validasi sederhana di client-side
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
      // Redirect ke login setelah beberapa detik
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); // Redirect setelah 2 detik
    } catch (err) {
      console.error("Register Error:", err);
      setError(err.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation (akan diupdate di Langkah 5) */}
      <header className="container mx-auto py-6 px-4 flex items-center">
        <nav className="flex items-center space-x-6 text-sm">
          <Link to="/" className="text-gray-500">Home</Link>
          <Link to="/produk" className="text-gray-500">Produk</Link>
          <Link to="/pemesanan" className="text-gray-500">Pemesanan</Link>
          <Link to="/pembayaran" className="text-gray-500">Pembayaran</Link>
        </nav>
        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center">
            <div className="w-3 h-3 bg-black rotate-45 mr-1"></div>
            <span className="text-2xl font-bold">UKIRE</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          {isLoggedIn() ? (
            <Link to="/profile" className="font-medium">Profile</Link>
          ) : (
            <Link to="/login" className="text-gray-700">Login</Link>
          )}
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 shadow-sm rounded-lg">
            <h1 className="text-xl font-bold mb-6 text-center">DAFTAR AKUN</h1>

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
                  <label htmlFor="name" className="block text-sm mb-1">
                    Nama Lengkap*
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-1">
                  Konfirmasi Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2 rounded" required disabled={loading} />
                <label htmlFor="terms" className="text-sm">
                  Saya menyetujui{" "}
                  <Link to="/terms" className="text-black hover:underline">
                    Syarat dan Ketentuan
                  </Link>
                </label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="newsletter" className="mr-2 rounded" disabled={loading} />
                <label htmlFor="newsletter" className="text-sm">
                  Berlangganan newsletter untuk mendapatkan informasi terbaru
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Memuat..." : "Daftar"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sudah memiliki akun?{" "}
                <Link to="/login" className="text-black hover:underline">
                  Login disini
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-center text-gray-600 mb-4">Atau daftar dengan</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                  <span className="text-sm">Google</span>
                </button>
                <button className="flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer (tetap seperti sebelumnya) */}
      <footer className="mt-auto pt-16 pb-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* About Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">ABOUT</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link to="/about/terms">Terms & Privacy</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/about/our-team">Our Team</Link></li>
                <li><Link to="/about/showroom">Showroom</Link></li>
                <li><Link to="/about/careers">Careers</Link></li>
              </ul>
            </div>
            {/* Customer Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">CUSTOMER</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link to="/customer/contact">Contact Us</Link></li>
                <li><Link to="/customer/trade">Trade Service</Link></li>
                <li><Link to="/customer/login">Login / Register</Link></li>
                <li><Link to="/customer/shipping">Shipping & Returns</Link></li>
                <li><Link to="/customer/faq">FAQs</Link></li>
              </ul>
            </div>
            {/* Furniture Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">FURNITURE</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link to="/furniture/tables">Tables</Link></li>
                <li><Link to="/furniture/chairs">Chairs</Link></li>
                <li><Link to="/furniture/storage">Storage</Link></li>
                <li><Link to="/furniture/sofas">Sofas</Link></li>
                <li><Link to="/furniture/bedroom">Bedroom</Link></li>
              </ul>
            </div>
            {/* Accessories Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">ACCESSORIES</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><Link to="/accessories/lighting">Lighting & Decoration</Link></li>
                <li><Link to="/accessories/textiles">Textiles</Link></li>
                <li><Link to="/accessories/kitchen">Kitchen & Dining</Link></li>
                <li><Link to="/accessories/outdoor">Outdoor</Link></li>
                <li><Link to="/accessories/all">All</Link></li>
              </ul>
            </div>
          </div>
          {/* Bottom Footer */}
          <div className="pt-8 border-t text-xs text-gray-500 flex flex-wrap gap-6">
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
