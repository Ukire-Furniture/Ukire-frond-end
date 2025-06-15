import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { X } from "lucide-react";
import { useEffect, useState, useCallback } from "react"; // Tambahkan useCallback
import { callApi, API_BASE_URL } from "../../utils/api";
import Loading from "../../loading";

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
      navigate("/login"); // Redirect jika belum login
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
      // Logout jika token tidak valid
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
            fetchWishlistItems(); // Refresh wishlist setelah hapus
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
            fetchWishlistItems(); // Refresh wishlist setelah dikosongkan
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

  // Status stok (logika sisi klien, bisa diganti jika API menyediakan status stok)
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
      {/* Navigation (tetap seperti sebelumnya) */}
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
            <span>Cart(0)</span> {/* Akan diupdate dengan jumlah cart nanti */}
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8">WISHLIST SAYA</h1>

          {wishlistItems.length > 0 ? (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-sm">Produk</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Harga</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Stok</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Aksi</th>
                      <th className="text-left py-3 px-4 font-medium text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-gray-100 flex-shrink-0 mr-4 rounded-lg overflow-hidden">
                              <img
                                src={item.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${item.image_path}` : "https://placehold.co/64x64/cccccc/333333?text=No+Image"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Link to={`/produk/${item.product_id}`} className="hover:underline">
                              {item.name}
                            </Link>
                          </div>
                        </td>
                        <td className="py-4 px-4">{formatPrice(item.price)}</td>
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
                          <button
                            // Belum ada fitur "Tambah ke Keranjang" dari wishlist
                            className={`px-4 py-2 text-sm rounded ${
                              getStockStatus(item.stock) === "Tersedia"
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={getStockStatus(item.stock) !== "Tersedia"}
                          >
                            Tambah ke Keranjang
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 hover:text-black">
                            <X className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Link to="/produk" className="text-sm hover:underline">
                  ← Lanjutkan Belanja
                </Link>
                <button onClick={handleClearWishlist} className="text-sm hover:underline text-red-500">Kosongkan Wishlist</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">Wishlist Anda Kosong</h2>
              <p className="text-gray-500 mb-8">Anda belum menambahkan produk ke wishlist</p>
              <Link
                to="/produk"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg"
              >
                Belanja Sekarang
              </Link>
            </div>
          )}
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
