import { Link, useParams } from "react-router-dom";
import { Filter, Search, ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Lemari Ukir Klasik",
    price: "Rp 12.500.000",
    image: "/images/product-2.png",
  },
  {
    id: 2,
    name: "Pintu Ukir Jati",
    price: "Rp 8.750.000",
    image: "/images/product-9.png",
  },
  {
    id: 3,
    name: "Set Kursi Tamu Ukir",
    price: "Rp 15.900.000",
    image: "/images/product-5.png",
  },
  {
    id: 4,
    name: "Lemari Pakaian Ukir",
    price: "Rp 14.250.000",
    image: "/images/product-3.png",
  },
  {
    id: 5,
    name: "Pintu Gebyok Ukir",
    price: "Rp 9.800.000",
    image: "/images/product-10.png",
  },
  {
    id: 6,
    name: "Set Kursi Ruang Keluarga",
    price: "Rp 16.500.000",
    image: "/images/product-6.png",
  },
  {
    id: 7,
    name: "Lemari Hias Ukir",
    price: "Rp 11.750.000",
    image: "/images/product-4.png",
  },
  {
    id: 8,
    name: "Pintu Rumah Ukir",
    price: "Rp 10.250.000",
    image: "/images/product-11.png",
  },
];

export default function ProdukDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
          <Link to="/produk" className="text-blue-600 underline">Kembali ke Produk</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 flex items-center">
        <nav className="flex items-center space-x-6 text-sm">
          <Link to="/" className="text-gray-500">Home</Link>
          <Link to="/produk" className="font-medium">Produk</Link>
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

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="flex-1 flex justify-center items-start">
              <img
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover rounded shadow"
              />
            </div>
            {/* Product Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-gray-700 mb-6">{product.price}</p>
              <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors mb-4">
                Tambah ke Keranjang
              </button>
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Deskripsi Produk</h2>
                <p className="text-gray-600">
                  {/* Deskripsi dummy, bisa diganti sesuai kebutuhan */}
                  Produk ukiran berkualitas tinggi, dibuat dari material pilihan dan dikerjakan oleh pengrajin profesional. Cocok untuk mempercantik ruangan Anda.
                </p>
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