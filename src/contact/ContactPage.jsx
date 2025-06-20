import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from '../components/Navbar';
import FooterLinks from '../landingpage/FooterLinks';

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">KONTAK KAMI</h1>

          <div className="bg-white p-8 shadow-sm rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4 text-ukire-black">Hubungi Kami</h2>
            <p className="text-ukire-text mb-6">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui informasi di bawah ini atau melalui formulir kontak.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <Phone className="h-6 w-6 text-ukire-amber mr-4" />
                <div>
                  <h3 className="font-medium text-ukire-black">Telepon</h3>
                  <p className="text-ukire-text">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <Mail className="h-6 w-6 text-ukire-amber mr-4" />
                <div>
                  <h3 className="font-medium text-ukire-black">Email</h3>
                  <p className="text-ukire-text">info@ukire.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <MapPin className="h-6 w-6 text-ukire-amber mr-4" />
                <div>
                  <h3 className="font-medium text-ukire-black">Alamat</h3>
                  <p className="text-ukire-text">Jl. Ukiran Indah No. 1, Jepara, Indonesia</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-medium mb-6 text-ukire-black">Kirim Pesan</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-1 text-ukire-text">Nama*</label>
                <input type="text" id="name" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-ukire-text">Email*</label>
                <input type="email" id="email" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm mb-1 text-ukire-text">Subjek</label>
                <input type="text" id="subject" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-1 text-ukire-text">Pesan*</label>
                <textarea id="message" rows="5" className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber" required></textarea>
              </div>
              <button type="submit" className="bg-ukire-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Kirim Pesan
              </button>
            </form>
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
