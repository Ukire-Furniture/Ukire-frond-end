import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi } from "../utils/api"; // Impor callApi dari utils/api
import Loading from "../loading"; // Impor komponen Loading

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Ambil kategori
        const categoryResponse = await callApi("categories");
        setCategories(categoryResponse.data);

        // Ambil produk (misal: 3 produk pertama untuk tampilan pilihan)
        const productResponse = await callApi("products", "GET"); // Panggil callApi yang sebenarnya
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-100 to-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Furniture Ukir Premium <br className="hidden md:block" />
              <span className="text-amber-600">Untuk Rumah Modern</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Temukan koleksi furniture ukir asli Indonesia, desain eksklusif, kualitas terbaik, langsung dari pengrajin lokal.
            </p>
            <Link
              to="/produk"
              className="inline-block bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              Belanja Sekarang
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/images/kayu/pintugebyok2.webp" 
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
              <Link key={category.id} to={`/produk?category=${category.name}`} className="group flex flex-col items-center hover:scale-105 transition">
                <img src={`https://placehold.co/100x100/F8D8A8/6C420B?text=${category.name}`} alt={category.name} className="w-28 h-28 object-cover rounded-lg mb-4 shadow" />
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
              <div key={product.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img src={product.image_path ? `http://ukirebackend.test/storage/${product.image_path}` : "https://placehold.co/160x160/cccccc/333333?text=No+Image"} alt={product.name} className="w-40 h-40 object-cover rounded mb-4" />
                <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                <p className="text-amber-600 font-semibold mb-4">{formatPrice(product.price)}</p>
                <Link to={`/produk/${product.id}`} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                  Lihat Detail
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Newsletter (tetap statis) */}
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
    </div>
  );
}
