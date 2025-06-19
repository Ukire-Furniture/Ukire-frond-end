import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut, Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi } from "../../utils/api";
import Loading from "../../loading";
import { isLoggedIn } from "../../main";
import Navbar from '../../components/Navbar'; 
import FooterLinks from '../../landingpage/FooterLinks'; 

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
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
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">PESANAN SAYA</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar (menggunakan data user dari localStorage) */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-medium text-ukire-black">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Pengguna'}</h2>
                    <p className="text-sm text-ukire-text">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''}</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center py-2 px-3 text-ukire-text hover:bg-ukire-gray rounded-md"
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profil Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/orders"
                        className="flex items-center py-2 px-3 bg-ukire-gray font-medium rounded-md text-ukire-black"
                      >
                        <ShoppingBag className="h-4 w-4 mr-3" />
                        Pesanan Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/wishlist"
                        className="flex items-center py-2 px-3 text-ukire-text hover:bg-ukire-gray rounded-md"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/payment"
                        className="flex items-center py-2 px-3 text-ukire-text hover:bg-ukire-gray rounded-md"
                      >
                        <CreditCard className="h-4 w-4 mr-3" />
                        Metode Pembayaran
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/settings"
                        className="flex items-center py-2 px-3 text-ukire-text hover:bg-ukire-gray rounded-md"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Pengaturan
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full py-2 px-3 text-ukire-text hover:bg-ukire-gray rounded-md"
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
                  <h2 className="text-xl font-medium mb-4 md:mb-0 text-ukire-black">Riwayat Pesanan</h2>

                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Cari pesanan..."
                        className="w-full md:w-64 border border-gray-300 px-4 py-2 pr-10 focus:outline-none rounded-lg focus:ring-1 focus:ring-ukire-amber text-ukire-text"
                      />
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-ukire-text" />
                    </div>

                    <select className="border border-gray-300 px-4 py-2 focus:outline-none rounded-lg text-ukire-text">
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
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">No. Pesanan</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Tanggal</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-sm text-ukire-black">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-200">
                            <td className="py-4 px-4 text-ukire-text">{order.id}</td>
                            <td className="py-4 px-4 text-ukire-text">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${getOrderStatusClass(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-ukire-text">{formatPrice(order.total_amount)}</td>
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

                {pagination.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex space-x-1">
                            <button
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ukire-gray transition-colors text-ukire-text"
                            >
                                &lt;
                            </button>
                            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 flex items-center justify-center border rounded-full ${
                                        currentPage === page ? "border-ukire-black bg-ukire-black text-white" : "border-gray-300 hover:bg-ukire-gray text-ukire-text"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={currentPage === pagination.last_page}
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ukire-gray transition-colors text-ukire-text"
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

      {/* Footer di sini */}
      <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <FooterLinks /> 
          <div className="pt-8 border-t border-gray-200 text-xs text-ukire-text flex flex-wrap gap-6">
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
