import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi, API_BASE_URL } from "../utils/api"; 
import Loading from "../loading";
import { isLoggedIn } from "../main"; 
import Navbar from '../components/Navbar'; // Impor Navbar
import FooterLinks from '../landingpage/FooterLinks'; // Impor FooterLinks

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShopButton, setShowShopButton] = useState(false); // Untuk efek hover

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryResponse = await callApi("categories");
        setCategories(categoryResponse.data);

        const productResponse = await callApi("products", "GET");
        setProducts(productResponse.data.slice(0, 3)); 

        setLoading(false);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError("Gagal memuat data utama: " + (err.message || "Terjadi kesalahan."));
        setLoading(false);
      }
    }
    fetchData();
  }, []); 

  const formatPrice = (price) => {
    if (typeof price !== 'number') {
        price = parseFloat(price);
    }
    if (isNaN(price)) { 
        return "Rp 0";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-100 to-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              {/* Opsi Login di Landing Page */}
              <div className="mb-4">
                {isLoggedIn() ? (
                  <Link to="/profile" className="inline-block text-gray-500 hover:text-black transition-colors font-medium mr-4">Profil</Link>
                ) : (
                  <Link to="/login" className="inline-block text-gray-500 hover:text-black transition-colors font-medium mr-4">Login</Link>
                )}
                <Link to="/cart" className="inline-block text-gray-500 hover:text-black transition-colors font-medium">Keranjang</Link>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Furniture Ukir Premium <br className="hidden md:block" />
                <span className="text-amber-600">Untuk Rumah Modern</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Temukan koleksi furniture ukir asli Indonesia, desain eksklusif, kualitas terbaik, langsung dari pengrajin lokal.
              </p>
              {/* Tombol Belanja Hover */}
              <div
                className="relative w-fit inline-block" // Tambahkan inline-block agar lebar sesuai konten
                onMouseEnter={() => setShowShopButton(true)}
                onMouseLeave={() => setShowShopButton(false)}
              >
                <Link
                  to="/produk"
                  className={`bg-black text-white px-8 py-4 rounded shadow-lg transition-all duration-300 transform ${
                    showShopButton ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  } hover:bg-gray-800 hover:scale-105`}
                >
                  Belanja Sekarang
                </Link>
                {!showShopButton && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl text-gray-700 font-semibold animate-pulse">Belanja Sekarang</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="/images/awal.jpeg" 
                alt="Furniture Hero"
                className="rounded-xl shadow-lg w-full max-w-md object-cover"
              />
            </div>
          </div>
        </section>

        {/* Kategori Produk Populer */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-10 text-center">Kategori Populer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link key={category.id} to={`/produk?category=${category.name}`} className="group flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  <img src={`https://placehold.co/100x100/E5E7EB/4B5563?text=${category.name}`} alt={category.name} className="w-28 h-28 object-cover rounded-full mb-4 shadow-sm" />
                  <span className="font-medium group-hover:text-amber-600">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Produk Pilihan */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-10 text-center">Produk Pilihan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
                  <img src={product.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${product.image_path}` : "https://placehold.co/160x160/cccccc/333333?text=No+Image"} alt={product.name} className="w-40 h-40 object-cover rounded-full mb-4 shadow-md" />
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <p className="text-amber-600 font-semibold mb-4">{formatPrice(product.price)}</p>
                  <Link to={`/produk/${product.id}`} className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:bg-gray-800 transition-colors text-sm">
                    Lihat Detail
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Newsletter */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-4">Dapatkan Promo & Info Terbaru</h2>
            <p className="mb-6 text-gray-600">Masukkan email Anda untuk berlangganan newsletter UKIRE.</p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="border border-gray-300 px-4 py-2 rounded w-full md:w-64 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Langganan
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer di sini */}
      <footer className="mt-auto pt-16 pb-8 border-t">
        <div className="container mx-auto px-4">
          <FooterLinks /> 
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
