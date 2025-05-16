import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 flex items-center">
        <nav className="flex items-center space-x-6 text-sm">
          <Link to="/" className="text-gray-500">
            Home
          </Link>
          <Link to="/produk" className="text-gray-500">
            Produk
          </Link>
          <Link to="/pemesanan" className="text-gray-500">
            Pemesanan
          </Link>
          <Link to="/pembayaran" className="text-gray-500">
            Pembayaran
          </Link>
        </nav>

        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center">
            <div className="w-3 h-3 bg-black rotate-45 mr-1"></div>
            <span className="text-2xl font-bold">UKIRE</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link to="/login" className="text-gray-700">
            Login
          </Link>
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8">HUBUNGI KAMI</h1>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-8">
                <h2 className="text-xl font-medium mb-6">Kirim Pesan</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">
                        Nama Lengkap*
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                        required
                      />
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
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm mb-1">
                      Subjek*
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-1">
                      Pesan*
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-8 mb-8">
                <h2 className="text-xl font-medium mb-6">Informasi Kontak</h2>

                <div className="space-y-6">
                  <div className="flex">
                    <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Alamat</h3>
                      <p className="text-gray-600">Jl. Kemang Raya No. 123</p>
                      <p className="text-gray-600">Jakarta Selatan, 12730</p>
                      <p className="text-gray-600">Indonesia</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Telepon</h3>
                      <p className="text-gray-600">+62 21 1234 5678</p>
                      <p className="text-gray-600">+62 812 3456 7890</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">info@ukire.id</p>
                      <p className="text-gray-600">sales@ukire.id</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8">
                <h2 className="text-xl font-medium mb-6">Jam Operasional</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Senin - Jumat</span>
                    <span>10:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span>10:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span>11:00 - 16:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-6">Lokasi Kami</h2>
            <div className="aspect-[16/9] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Peta Lokasi UKIRE</p>
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
                <li>
                  <Link to="/about/terms">Terms & Privacy</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/about/our-team">Our Team</Link>
                </li>
                <li>
                  <Link to="/about/showroom">Showroom</Link>
                </li>
                <li>
                  <Link to="/about/careers">Careers</Link>
                </li>
              </ul>
            </div>

            {/* Customer Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">CUSTOMER</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>
                  <Link to="/customer/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/customer/trade">Trade Service</Link>
                </li>
                <li>
                  <Link to="/customer/login">Login / Register</Link>
                </li>
                <li>
                  <Link to="/customer/shipping">Shipping & Returns</Link>
                </li>
                <li>
                  <Link to="/customer/faq">FAQs</Link>
                </li>
              </ul>
            </div>

            {/* Furniture Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">FURNITURE</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>
                  <Link to="/furniture/tables">Tables</Link>
                </li>
                <li>
                  <Link to="/furniture/chairs">Chairs</Link>
                </li>
                <li>
                  <Link to="/furniture/storage">Storage</Link>
                </li>
                <li>
                  <Link to="/furniture/sofas">Sofas</Link>
                </li>
                <li>
                  <Link to="/furniture/bedroom">Bedroom</Link>
                </li>
              </ul>
            </div>

            {/* Accessories Column */}
            <div>
              <h3 className="text-sm font-medium mb-4">ACCESSORIES</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li>
                  <Link to="/accessories/lighting">Lighting & Decoration</Link>
                </li>
                <li>
                  <Link to="/accessories/textiles">Textiles</Link>
                </li>
                <li>
                  <Link to="/accessories/kitchen">Kitchen & Dining</Link>
                </li>
                <li>
                  <Link to="/accessories/outdoor">Outdoor</Link>
                </li>
                <li>
                  <Link to="/accessories/all">All</Link>
                </li>
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