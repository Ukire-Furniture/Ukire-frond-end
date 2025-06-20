import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi, API_BASE_URL } from "../../utils/api";
import Loading from "../../loading";
import Navbar from '../../components/Navbar';
import FooterLinks from '../../landingpage/FooterLinks';

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlistItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Anda perlu login untuk melihat wishlist.");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await callApi("wishlist", "GET", null, token);
      setWishlistItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching wishlist items:", err);
      setError("Gagal memuat wishlist: " + (err.message || "Terjadi kesalahan."));
      setLoading(false);
      if (err.message && (err.message.includes("Unauthenticated") || err.message.includes("Token"))) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Sesi Anda berakhir. Silakan login kembali.");
        window.location.href = '/login';
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Silakan login untuk menghapus item dari wishlist.");
        return;
    }
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini dari wishlist?")) {
        setLoading(true);
        try {
            await callApi(`wishlist/remove/${itemId}`, "DELETE", null, token);
            fetchWishlistItems();
        } catch (err) {
            console.error("Error removing wishlist item:", err);
            alert("Gagal menghapus item: " + (err.message || "Terjadi kesalahan."));
        } finally {
            setLoading(false);
        }
    }
  };

  const handleClearWishlist = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Silakan login untuk mengosongkan wishlist.");
        return;
    }
    if (window.confirm("Apakah Anda yakin ingin mengosongkan wishlist Anda?")) {
        setLoading(true);
        try {
            await callApi("wishlist/clear", "POST", null, token);
            alert("Wishlist berhasil dikosongkan!");
            fetchWishlistItems();
        } catch (err) {
            console.error("Error clearing wishlist:", err);
            alert("Gagal mengosongkan wishlist: " + (err.message || "Terjadi kesalahan."));
        } finally {
            setLoading(false);
        }
    }
  };

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

  const getStockStatus = (stockQuantity) => {
    return stockQuantity > 0 ? "Tersedia" : "Stok Habis";
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

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">WISHLIST SAYA</h1>

          {wishlistItems.length > 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Produk</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Harga</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Stok</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Aksi</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-ukire-gray flex-shrink-0 mr-4 rounded-lg overflow-hidden">
                              <img
                                src={item.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${item.image_path}` : "https://placehold.co/64x64/cccccc/333333?text=No+Image"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link to={`/produk/${item.product_id}`} className="hover:underline text-ukire-text">
                              {item.name}
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-ukire-text">{formatPrice(item.price)}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              getStockStatus(item.stock) === "Tersedia" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {getStockStatus(item.stock)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {/* Belum ada fitur "Tambah ke Keranjang" dari wishlist, bisa ditambahkan nanti */}
                          <button
                            className={`px-4 py-2 text-sm rounded-lg ${
                              getStockStatus(item.stock) === "Tersedia"
                                ? "bg-ukire-black text-white hover:bg-gray-800 transition-colors"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={getStockStatus(item.stock) !== "Tersedia"}
                          >
                            Tambah ke Keranjang
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 hover:text-ukire-black">
                            <X className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Link to="/produk" className="text-sm hover:underline text-ukire-text">
                  ← Lanjutkan Belanja
                </Link>
                <button onClick={handleClearWishlist} className="text-sm hover:underline text-red-500">Kosongkan Wishlist</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-ukire-gray rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-4 text-ukire-black">Wishlist Anda Kosong</h2>
              <p className="text-ukire-text mb-8">Anda belum menambahkan produk ke wishlist</p>
              <Link
                to="/produk"
                className="inline-block bg-ukire-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg"
              >
                Belanja Sekarang
              </Link>
            </div>
          )}
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
