import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi } from "../utils/api";
import Loading from "../loading";
import { isLoggedIn } from "../main";
import Navbar from '../components/Navbar'; // Impor Navbar
import FooterLinks from '../landingpage/FooterLinks'; // Impor FooterLinks

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfileAndOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userResponse = await callApi("user", "GET", null, token);
      setUserProfile(userResponse.user);

      const ordersResponse = await callApi("orders", "GET", { per_page: 3 }, token);
      setRecentOrders(ordersResponse.data);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile or orders:", err);
      setError("Gagal memuat profil atau pesanan: " + (err.message || "Terjadi kesalahan."));
      setLoading(false);
      if (err.message && (err.message.includes("Unauthenticated") || err.message.includes("Token"))) {
          handleLogout();
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserProfileAndOrders();
  }, [fetchUserProfileAndOrders]);

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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>;
  }

  if (!userProfile) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-ukire-gray">
              <div className="text-center">
                  <h2 className="text-2xl font-medium mb-4 text-ukire-black">Profil pengguna tidak tersedia</h2>
                  <p className="text-ukire-text mb-8">Anda belum login atau sesi telah berakhir.</p>
                  <Link to="/login" className="inline-block bg-ukire-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg">
                    Login Sekarang
                  </Link>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">PROFIL SAYA</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-medium text-ukire-black">{userProfile.name}</h2>
                    <p className="text-sm text-ukire-text">{userProfile.email}</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/profile" className="flex items-center py-2 px-3 bg-ukire-gray font-medium rounded-md text-ukire-black">
                        <User className="h-4 w-4 mr-3" />
                        Profil Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/orders"
                        className="flex items-center py-2 px-3 text-ukire-text hover:bg-ukire-gray rounded-md"
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
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Informasi Pribadi</h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1 text-ukire-text">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                        defaultValue={userProfile.name}
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm mb-1 text-ukire-text">
                      Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                        defaultValue={userProfile.email}
                        readOnly
                    />
                  </div>

                  {userProfile.phone_number && (
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-1 text-ukire-text">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                        defaultValue={userProfile.phone_number}
                        readOnly
                      />
                    </div>
                  )}
                  {userProfile.address && (
                    <div>
                      <label htmlFor="address" className="block text-sm mb-1 text-ukire-text">
                        Alamat
                      </label>
                      <textarea
                        id="address"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                        defaultValue={userProfile.address}
                        readOnly
                        rows={3}
                      ></textarea>
                    </div>
                  )}
                </form>
              </div>

              {/* Alamat Pengiriman (dapat diintegrasikan nanti) */}
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Alamat Pengiriman</h2>

                <div className="border border-gray-200 p-4 mb-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-ukire-black">Alamat Utama</h3>
                    <div className="flex space-x-2">
                      <button className="text-sm text-gray-600 hover:text-black">Edit</button>
                      <button className="text-sm text-gray-600 hover:text-black">Hapus</button>
                    </div>
                  </div>
                  <p className="text-sm text-ukire-text">{userProfile.address || "Belum ada alamat utama"}</p>
                </div>

                <button className="text-sm flex items-center text-gray-600 hover:text-black">
                  + Tambah Alamat Baru
                </button>
              </div>

              {/* Pesanan Terbaru */}
              <div className="bg-white p-6 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-ukire-black">Pesanan Terbaru</h2>
                  <Link to="/profile/orders" className="text-sm text-gray-600 hover:text-black">
                    Lihat Semua
                  </Link>
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
                      {recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
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
                            <td colSpan="5" className="text-center py-4 text-gray-500">Tidak ada pesanan terbaru.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
