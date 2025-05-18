import { Link } from "react-router-dom";

export default function HomePage() {
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
              src="/images/awal.jpeg"
              alt="Furniture Hero"
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* Kategori Produk */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Kategori Populer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Link to="/produk/kategori/kursi" className="group flex flex-col items-center hover:scale-105 transition">
              <img src="/images/kayu/kursi.png" alt="Kursi" className="w-28 h-28 object-cover rounded-lg mb-4 shadow" />
              <span className="font-medium group-hover:text-amber-600">Kursi</span>
            </Link>
            <Link to="/produk/kategori/lemari" className="group flex flex-col items-center hover:scale-105 transition">
              <img src="/images/kayu/kursi.png" alt="Lemari" className="w-28 h-28 object-cover rounded-lg mb-4 shadow" />
              <span className="font-medium group-hover:text-amber-600">Lemari</span>
            </Link>
            <Link to="/produk/kategori/meja" className="group flex flex-col items-center hover:scale-105 transition">
              <img src="/images/kayu/kursi.png" alt="Meja" className="w-28 h-28 object-cover rounded-lg mb-4 shadow" />
              <span className="font-medium group-hover:text-amber-600">Meja</span>
            </Link>
            <Link to="/produk/kategori/pintu" className="group flex flex-col items-center hover:scale-105 transition">
              <img src="/images/kayu/kursi.png" alt="Pintu" className="w-28 h-28 object-cover rounded-lg mb-4 shadow" />
              <span className="font-medium group-hover:text-amber-600">Pintu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Produk Pilihan */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">Produk Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contoh produk, bisa diambil dari props/data */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="/images/kayu/kursi.png" alt="Produk 1" className="w-40 h-40 object-cover rounded mb-4" />
              <h3 className="font-medium text-lg mb-2">Kursi Ukir Jepara</h3>
              <p className="text-amber-600 font-semibold mb-4">Rp 5.500.000</p>
              <Link to="/produk/1" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                Lihat Detail
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="/images/kayu/kursi.png" alt="Produk 2" className="w-40 h-40 object-cover rounded mb-4" />
              <h3 className="font-medium text-lg mb-2">Lemari Hias Ukir</h3>
              <p className="text-amber-600 font-semibold mb-4">Rp 11.750.000</p>
              <Link to="/produk/7" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                Lihat Detail
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <img src="/images/kayu/kursi.png" alt="Produk 3" className="w-40 h-40 object-cover rounded mb-4" />
              <h3 className="font-medium text-lg mb-2">Pintu Gebyok Ukir</h3>
              <p className="text-amber-600 font-semibold mb-4">Rp 9.800.000</p>
              <Link to="/produk/5" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors text-sm">
                Lihat Detail
              </Link>
            </div>
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
    </div>
  );
}