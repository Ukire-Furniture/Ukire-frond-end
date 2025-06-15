import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { callApi, API_BASE_URL } from "../utils/api"; // Impor callApi, API_BASE_URL
import Loading from "../loading"; // Impor Loading

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function PemesananPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0); // Total keranjang dari API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Reguler"); // Default reguler
  const [notes, setNotes] = useState("");
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(null);

  // Fungsi untuk mengambil item keranjang dari API
  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Anda perlu login untuk melanjutkan pemesanan.");
      setLoading(false);
      navigate("/login"); // Redirect jika belum login
      return;
    }

    try {
      const response = await callApi("cart", "GET", null, token);
      if (response.data.length === 0) {
        setError("Keranjang belanja Anda kosong. Silakan belanja terlebih dahulu.");
        setLoading(false);
        // navigate("/cart"); // Opsional: Redirect jika keranjang kosong
        return;
      }
      setCartItems(response.data);
      setCartTotal(response.cart_total);
      setLoading(false);

      // Pre-fill user info jika tersedia dari localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
          const user = JSON.parse(userData);
          const [fName, ...lName] = user.name.split(' ');
          setFirstName(fName || '');
          setLastName(lName.join(' ') || '');
          setEmail(user.email || '');
          // Anda bisa menambahkan pre-fill untuk alamat jika ada di data user backend
      }

    } catch (err) {
      console.error("Error fetching cart items for order:", err);
      setError("Gagal memuat detail pemesanan: " + (err.message || "Terjadi kesalahan."));
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

  // Efek untuk memuat item keranjang saat komponen di-mount
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Handle submit form pemesanan
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setFormSubmitLoading(true);
    setFormSubmitError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setFormSubmitError("Anda harus login untuk membuat pesanan.");
      setFormSubmitLoading(false);
      return;
    }

    // Mengambil data dari form
    const orderData = {
        shipping_address: address,
        shipping_city: city,
        shipping_province: province,
        shipping_postal_code: postalCode,
        phone_number: phone,
        notes: notes,
        // Metode pengiriman tidak disimpan di tabel orders secara default, 
        // tapi bisa ditambahkan kolomnya jika diperlukan.
        // shipping_method: shippingMethod, 
    };

    try {
      // Panggil API untuk membuat pesanan
      const response = await callApi("orders", "POST", orderData, token);
      alert(response.message || "Pesanan Anda berhasil dibuat!");
      // Redirect ke halaman pembayaran, sertakan orderId dan totalnya via state
      navigate("/pembayaran", { state: { orderId: response.data.id, orderTotal: response.data.total_amount } }); 
    } catch (err) {
      console.error("Error submitting order:", err);
      // Tampilkan pesan error validasi dari Laravel jika ada
      if (err.message && err.message.includes("message") && err.message.includes("errors")) {
          try {
            const errorObj = JSON.parse(err.message); // Coba parse JSON jika message dari API berupa stringified JSON
            const validationErrors = Object.values(errorObj.errors).flat().join('\n');
            setFormSubmitError("Validasi Gagal:\n" + validationErrors);
          } catch (parseError) {
            setFormSubmitError(err.message || "Terjadi kesalahan saat membuat pesanan.");
          }
      } else {
          setFormSubmitError(err.message || "Terjadi kesalahan saat membuat pesanan.");
      }
    } finally {
      setFormSubmitLoading(false);
    }
  };

  // Fungsi untuk format harga
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

  // Hitung biaya pengiriman dan total
  const shippingCost = shippingMethod === "Reguler" ? 250000 : (shippingMethod === "Express" ? 500000 : 0);
  const totalWithShipping = cartTotal + shippingCost;


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 text-lg">{error}</div>;
  }

  // Jika keranjang kosong setelah loading selesai dan tidak ada error lain
  if (cartItems.length === 0 && !loading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Keranjang Belanja Anda Kosong</h2>
          <p className="text-gray-500 mb-8">Silakan tambahkan produk ke keranjang belanja Anda terlebih dahulu.</p>
          <Link to="/produk" className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg">
            Belanja Sekarang
          </Link>
        </div>
      </div>
    );
  }

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
          <Link to="/pemesanan" className="font-medium">
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
          {isLoggedIn() ? (
            <Link to="/profile" className="font-medium">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="text-gray-700">
              Login
            </Link>
          )}
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart({cartItems.length})</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-8">
            <Link to="/" className="text-gray-500">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link to="/cart" className="text-gray-500">
              Keranjang
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span>Pemesanan</span>
          </div>

          <h1 className="text-3xl font-light mb-8">PEMESANAN</h1>

          <form onSubmit={handleSubmitOrder} className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="lg:w-2/3">
              {formSubmitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <span className="block sm:inline">{formSubmitError}</span>
                </div>
              )}
              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6">Informasi Kontak</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm mb-1">
                      Nama Depan*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm mb-1">
                      Nama Belakang*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1">
                      Nomor Telepon*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6">Alamat Pengiriman</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm mb-1">
                      Alamat Lengkap*
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm mb-1">
                        Kota*
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={formSubmitLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="province" className="block text-sm mb-1">
                        Provinsi*
                      </label>
                      <select
                        id="province"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        disabled={formSubmitLoading}
                      >
                        <option value="">Pilih Provinsi</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="Jawa Tengah">Jawa Tengah</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Banten">Banten</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="postalCode" className="block text-sm mb-1">
                        Kode Pos*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        disabled={formSubmitLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6">Metode Pengiriman</h2>
                <div className="space-y-3">
                  <div className="flex items-center border border-gray-300 p-4 rounded-lg">
                    <input
                      type="radio"
                      id="shipping-reguler"
                      name="shipping"
                      className="mr-3 rounded"
                      value="Reguler"
                      checked={shippingMethod === "Reguler"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                    <label htmlFor="shipping-reguler" className="flex-1">
                      <div className="font-medium">Reguler (3-5 hari kerja)</div>
                      <div className="text-sm text-gray-500">{formatPrice(250000)}</div>
                    </label>
                  </div>
                  <div className="flex items-center border border-gray-300 p-4 rounded-lg">
                    <input
                      type="radio"
                      id="shipping-express"
                      name="shipping"
                      className="mr-3 rounded"
                      value="Express"
                      checked={shippingMethod === "Express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                    <label htmlFor="shipping-express" className="flex-1">
                      <div className="font-medium">Express (1-2 hari kerja)</div>
                      <div className="text-sm text-gray-500">{formatPrice(500000)}</div>
                    </label>
                  </div>
                  <div className="flex items-center border border-gray-300 p-4 rounded-lg">
                    <input
                      type="radio"
                      id="shipping-pickup"
                      name="shipping"
                      className="mr-3 rounded"
                      value="Ambil di Toko"
                      checked={shippingMethod === "Ambil di Toko"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                    <label htmlFor="shipping-pickup" className="flex-1">
                      <div className="font-medium">Ambil di Toko</div>
                      <div className="text-sm text-gray-500">Gratis</div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6">Catatan Pesanan</h2>
                <textarea
                  className="w-full border border-gray-300 px-4 py-2 h-32 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Tambahkan catatan khusus untuk pesanan Anda (opsional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={formSubmitLoading}
                ></textarea>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg sticky top-6 shadow-sm">
                <h2 className="text-xl font-medium mb-6">Ringkasan Pesanan</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${item.image_path}` : "https://placehold.co/80x80/cccccc/333333?text=No+Image"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-b py-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pengiriman</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span>{formatPrice(totalWithShipping)}</span>
                </div>

                <button
                  type="submit"
                  className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formSubmitLoading || cartItems.length === 0} // Disable jika loading atau keranjang kosong
                >
                  {formSubmitLoading ? "Membuat Pesanan..." : "Konfirmasi Pemesanan"}
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Dengan mengklik tombol di atas, Anda menyetujui{" "}
                  <Link to="/terms" className="underline">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  kami
                </p>
              </div>
            </div>
          </form>
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
