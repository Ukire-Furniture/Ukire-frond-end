import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut, Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi, API_BASE_URL } from "../../utils/api"; // Sesuaikan path utils/api
import Loading from "../../loading"; // Sesuaikan path loading
import { isLoggedIn } from "../../main.jsx"; // Sesuaikan path main.jsx

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({}); // Untuk paginasi pesanan
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login"); // Redirect jika tidak ada token
      return;
    }

    try {
      const response = await callApi(`orders?page=${page}`, "GET", null, token);
      setOrders(response.data);
      setPagination(response.pagination);
      setCurrentPage(response.pagination.current_page);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Gagal memuat riwayat pesanan: " + (err.message || "Terjadi kesalahan."));
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
    fetchOrders();
  }, [fetchOrders]);

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        await callApi("logout", "POST", null, token);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Anda telah berhasil logout.");
        window.location.href = '/login';
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Gagal logout. Silakan coba lagi.");
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
      fetchOrders(page);
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

  const getOrderStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && orders.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>;
  }

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
          {isLoggedIn() ? (
            <Link to="/profile" className="font-medium">Profile</Link>
          ) : (
            <Link to="/login" className="text-gray-700">Login</Link>
          )}
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span> {/* Jumlah cart akan diupdate oleh Navbar.jsx */}
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8">PESANAN SAYA</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar (asumsi userProfile akan disediakan dari Navbar/Layout atau fetched di ProfilePage) */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    {/* Data user ini harus diambil dari localStorage atau context */}
                    <h2 className="font-medium">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Pengguna'}</h2>
                    <p className="text-sm text-gray-500">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''}</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profil Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/orders"
                        className="flex items-center py-2 px-3 bg-gray-100 font-medium rounded-md"
                      >
                        <ShoppingBag className="h-4 w-4 mr-3" />
                        Pesanan Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/wishlist"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/payment"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        <CreditCard className="h-4 w-4 mr-3" />
                        Metode Pembayaran
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/settings"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Pengaturan
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Keluar
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-xl font-medium mb-4 md:mb-0">Riwayat Pesanan</h2>

                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari pesanan..."
                        className="w-full md:w-64 border border-gray-300 px-4 py-2 pr-10 focus:outline-none rounded"
                      />
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>

                    <select className="border border-gray-300 px-4 py-2 focus:outline-none rounded">
                      <option value="">Semua Status</option>
                      <option value="pending">Menunggu Pembayaran</option>
                      <option value="processing">Diproses</option>
                      <option value="shipped">Dikirim</option>
                      <option value="completed">Selesai</option>
                      <option value="cancelled">Dibatalkan</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-sm">No. Pesanan</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Tanggal</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-sm">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-4 px-4">{order.id}</td>
                            <td className="py-4 px-4">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${getOrderStatusClass(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">{formatPrice(order.total_amount)}</td>
                            <td className="py-4 px-4">
                              <Link
                                to={`/profile/orders/${order.id}`}
                                className="text-sm text-gray-600 hover:text-black"
                              >
                                Detail
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">Tidak ada pesanan ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex space-x-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &lt;
                            </button>
                            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 flex items-center justify-center border rounded ${
                                        currentPage === page ? "border-black bg-black text-white" : "border-gray-300"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pagination.last_page}
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
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
