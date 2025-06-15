import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi, API_BASE_URL } from "../utils/api";
import Loading from "../loading";
import { isLoggedIn } from "../main.jsx";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]); // State untuk pesanan terbaru
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfileAndOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login"); // Redirect jika tidak ada token
      return;
    }

    try {
      // Ambil profil user
      const userResponse = await callApi("user", "GET", null, token);
      setUserProfile(userResponse.user);

      // Ambil pesanan terbaru (bisa ditambah filter limit di backend jika perlu)
      const ordersResponse = await callApi("orders", "GET", { per_page: 3 }, token); // Ambil 3 pesanan terbaru
      setRecentOrders(ordersResponse.data);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile or orders:", err);
      setError("Gagal memuat profil atau pesanan: " + (err.message || "Terjadi kesalahan."));
      setLoading(false);
      // Jika error autentikasi (token expired/invalid), bisa langsung logout
      if (err.message && (err.message.includes("Unauthenticated") || err.message.includes("Token"))) {
          handleLogout(); // Otomatis logout jika token tidak valid
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
        window.location.href = '/login'; // Refresh halaman untuk memastikan status login terupdate
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">{error}</div>;
  }

  if (!userProfile) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="text-center text-gray-600 text-lg">
                  Profil pengguna tidak tersedia atau Anda belum login.
                  <br />
                  <Link to="/login" className="text-black underline mt-2 inline-block">Login sekarang</Link>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation (sudah dihandle oleh Navbar.jsx) */}
      <header className="container mx-auto py-6 px-4 flex items-center">
        <nav className="flex items-center space-x-6 text-sm">
          <Link to="/" className="text-gray-500">
            Home
          </Link>
          <Link to="/produk" className="text-gray-500">
            Produk
          </Link>
          <Link to="/pemesanan" className="text-gray-500">
            Pemesanan
          </Link>
          <Link to="/pembayaran" className="text-gray-500">
            Pembayaran
          </Link>
        </nav>

        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center">
            <div className="w-3 h-3 bg-black rotate-45 mr-1"></div>
            <span className="text-2xl font-bold">UKIRE</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <Link to="/profile" className="font-medium">
            {userProfile.name}
          </Link>
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span> {/* Jumlah cart akan diupdate oleh Navbar.jsx */}
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8">PROFIL SAYA</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-medium">{userProfile.name}</h2>
                    <p className="text-sm text-gray-500">{userProfile.email}</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/profile" className="flex items-center py-2 px-3 bg-gray-100 font-medium rounded-md">
                        <User className="h-4 w-4 mr-3" />
                        Profil Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/orders"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
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
                <h2 className="text-xl font-medium mb-6">Informasi Pribadi</h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        defaultValue={userProfile.name}
                        readOnly // Karena ini hanya tampilan, nanti bisa diubah jika ada fitur edit profil
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                      defaultValue={userProfile.email}
                      readOnly
                    />
                  </div>

                  {/* Anda bisa tambahkan field lain seperti phone atau address jika ada di data user backend */}
                  {userProfile.phone_number && ( // Cek jika phone_number ada dari API user
                    <div>
                      <label htmlFor="phone" className="block text-sm mb-1">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        defaultValue={userProfile.phone_number} // Asumsi dari API namanya phone_number
                        readOnly
                      />
                    </div>
                  )}
                  {userProfile.address && ( // Cek jika address ada dari API user
                    <div>
                      <label htmlFor="address" className="block text-sm mb-1">
                        Alamat
                      </label>
                      <textarea
                        id="address"
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        defaultValue={userProfile.address} // Asumsi dari API namanya address
                        readOnly
                        rows={3}
                      ></textarea>
                    </div>
                  )}

                  {/* Tombol Simpan (jika ingin mengizinkan edit profil) */}
                  {/* <div className="pt-4">
                    <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors rounded-md">
                      Simpan Perubahan
                    </button>
                  </div> */}
                </form>
              </div>

              {/* Alamat Pengiriman (tetap statis atau bisa diintegrasikan nanti) */}
              <div className="bg-white p-6 shadow-sm mb-6 rounded-lg">
                <h2 className="text-xl font-medium mb-6">Alamat Pengiriman</h2>

                <div className="border border-gray-200 p-4 mb-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Alamat Utama</h3>
                    <div className="flex space-x-2">
                      <button className="text-sm text-gray-600 hover:text-black">Edit</button>
                      <button className="text-sm text-gray-600 hover:text-black">Hapus</button>
                    </div>
                  </div>
                  <p className="text-sm">{userProfile.address || "Belum ada alamat utama"}</p>
                </div>

                <button className="text-sm flex items-center text-gray-600 hover:text-black">
                  + Tambah Alamat Baru
                </button>
              </div>

              {/* Pesanan Terbaru */}
              <div className="bg-white p-6 shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Pesanan Terbaru</h2>
                  <Link to="/profile/orders" className="text-sm text-gray-600 hover:text-black">
                    Lihat Semua
                  </Link>
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
                      {recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-3 px-4">{order.id}</td>
                            <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  order.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{formatPrice(order.total_amount)}</td>
                            <td className="py-3 px-4">
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
