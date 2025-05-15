import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
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
          <Link to="/login" className="text-gray-700">Login</Link>
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 shadow-sm">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center">
                <div className="w-3 h-3 bg-black rotate-45 mr-1"></div>
                <span className="text-2xl font-bold">UKIRE</span>
              </Link>
            </div>

            <h1 className="text-2xl font-medium mb-6 text-center">DAFTAR AKUN</h1>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm mb-1">
                    Nama Depan*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm mb-1">
                    Nama Belakang*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-1">
                  Nomor Telepon*
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-1">
                  Konfirmasi Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-sm">
                  Saya menyetujui{" "}
                  <Link to="/terms" className="text-black hover:underline">
                    Syarat dan Ketentuan
                  </Link>
                </label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="newsletter" className="mr-2" />
                <label htmlFor="newsletter" className="text-sm">
                  Berlangganan newsletter untuk mendapatkan informasi terbaru
                </label>
              </div>

              <button type="submit" className="w-full bg-black text-white py-2 hover:bg-gray-800 transition-colors">
                Daftar
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
                <button className="flex items-center justify-center border border-gray-300 py-2 hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Google</span>
                </button>
                <button className="flex items-center justify-center border border-gray-300 py-2 hover:bg-gray-50 transition-colors">
                  <span className="text-sm">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
                <li><Link to="/customer/login">Login ister</Link></li>
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