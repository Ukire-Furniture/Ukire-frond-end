import { Link } from "react-router-dom";
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  // Simulasi data pengguna
  const user = {
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "+62 812 3456 7890",
    address: "Jl. Gatot Subroto No. 123, Jakarta Selatan, DKI Jakarta, 12930",
    orders: [
      {
        id: "ORD-12345",
        date: "12 Mei 2025",
        status: "Dikirim",
        total: 28650000,
        items: 2,
      },
      {
        id: "ORD-12344",
        date: "5 April 2025",
        status: "Selesai",
        total: 15900000,
        items: 1,
      },
      {
        id: "ORD-12343",
        date: "20 Maret 2025",
        status: "Selesai",
        total: 12500000,
        items: 1,
      },
    ],
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
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
            {user.name}
          </Link>
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8">PROFIL SAYA</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 shadow-sm mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-medium">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/profile" className="flex items-center py-2 px-3 bg-gray-100 font-medium rounded">
                        <User className="h-4 w-4 mr-3" />
                        Profil Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/orders"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <ShoppingBag className="h-4 w-4 mr-3" />
                        Pesanan Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/wishlist"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/payment"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <CreditCard className="h-4 w-4 mr-3" />
                        Metode Pembayaran
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile/settings"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Pengaturan
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="flex items-center py-2 px-3 text-gray-600 hover:bg-gray-50 rounded"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Keluar
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white p-6 shadow-sm mb-6">
                <h2 className="text-xl font-medium mb-6">Informasi Pribadi</h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-1">
                        Nama Depan
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                        defaultValue="Budi"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-1">
                        Nama Belakang
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                        defaultValue="Santoso"
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
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                      defaultValue={user.email}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                      defaultValue={user.phone}
                    />
                  </div>

                  <div className="pt-4">
                    <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors">
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 shadow-sm mb-6">
                <h2 className="text-xl font-medium mb-6">Alamat Pengiriman</h2>

                <div className="border border-gray-200 p-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Alamat Utama</h3>
                    <div className="flex space-x-2">
                      <button className="text-sm text-gray-600 hover:text-black">Edit</button>
                      <button className="text-sm text-gray-600 hover:text-black">Hapus</button>
                    </div>
                  </div>
                  <p className="text-sm">{user.address}</p>
                </div>

                <button className="text-sm flex items-center text-gray-600 hover:text-black">
                  + Tambah Alamat Baru
                </button>
              </div>

              <div className="bg-white p-6 shadow-sm">
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
                      {user.orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded ${
                                order.status === "Selesai"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Dikirim"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formatPrice(order.total)}</td>
                          <td className="py-3 px-4">
                            <Link
                              to={`/profile/orders/${order.id}`}
                              className="text-sm text-gray-600 hover:text-black"
                            >
                              Detail
                            </Link>
                          </td>
                        </tr>
                      ))}
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