import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { callApi, API_BASE_URL } from "../utils/api";
import Loading from "../loading";
import Navbar from '../components/Navbar';
import FooterLinks from '../landingpage/FooterLinks';

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function PemesananPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0); 
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
  const [shippingMethod, setShippingMethod] = useState("Reguler"); 
  const [notes, setNotes] = useState("");
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(null);

  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Anda perlu login untuk melanjutkan pemesanan.");
      setLoading(false);
      navigate("/login"); 
      return;
    }

    try {
      const response = await callApi("cart", "GET", null, token);
      if (response.data && response.data.length === 0) {
        setError("Keranjang belanja Anda kosong. Silakan belanja terlebih dahulu.");
        setCartItems([]);
        setCartTotal(0);
      } else if (response.data) {
        setCartItems(response.data);
        setCartTotal(response.cart_total);
      } else {
          setError("Gagal memuat keranjang: Respon data tidak valid.");
          setCartItems([]);
          setCartTotal(0);
      }
      setLoading(false);

      const userData = localStorage.getItem('user');
      if (userData) {
          try {
            const user = JSON.parse(userData);
            const [fName, ...lName] = user.name.split(' ');
            setFirstName(fName || '');
            setLastName(lName.join(' ') || '');
            setEmail(user.email || '');
          } catch (e) {
            console.error("Error parsing user data from localStorage:", e);
          }
      }

    } catch (err) {
      console.error("Error fetching cart items for order (catch block):", err);
      setError("Gagal memuat detail pemesanan: " + (err.message || "Terjadi kesalahan."));
      setCartItems([]);
      setCartTotal(0);
      if (err.message && (err.message.includes("Unauthenticated") || err.message.includes("Token"))) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Sesi Anda berakhir. Silakan login kembali.");
        window.location.href = '/login';
      }
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

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

    const orderData = {
        shipping_address: address,
        shipping_city: city,
        shipping_province: province,
        shipping_postal_code: postalCode,
        phone_number: phone,
        notes: notes,
    };

    try {
      const response = await callApi("orders", "POST", orderData, token);
      alert(response.message || "Pesanan Anda berhasil dibuat!");
      navigate("/pembayaran", { state: { orderId: response.data.id, orderTotal: response.data.total_amount } }); 
    } catch (err) {
      console.error("Error submitting order:", err);
      if (err.message && typeof err.message === 'string' && err.message.includes("message") && err.message.includes("errors")) {
          try {
            const errorObj = JSON.parse(err.message);
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

  const shippingCost = shippingMethod === "Reguler" ? 250000 : (shippingMethod === "Express" ? 500000 : 0);
  const totalWithShipping = cartTotal + shippingCost;


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 text-lg">{error}</div>;
  }

  if (cartItems.length === 0 && !loading && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ukire-gray">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4 text-ukire-black">Keranjang Belanja Anda Kosong</h2>
          <p className="text-ukire-text mb-8">Silakan belanja terlebih dahulu.</p>
          <Link to="/produk" className="inline-block bg-ukire-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg">
            Belanja Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-ukire-gray py-12">
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

          <h1 className="text-3xl font-light mb-8 text-ukire-black">PEMESANAN</h1>

          <form onSubmit={handleSubmitOrder} className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="lg:w-2/3">
              {formSubmitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <span className="block sm:inline">{formSubmitError}</span>
                </div>
              )}
              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Informasi Kontak</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm mb-1 text-ukire-text">
                      Nama Depan*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm mb-1 text-ukire-text">
                      Nama Belakang*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1 text-ukire-text">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm mb-1 text-ukire-text">
                      Nomor Telepon*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Alamat Pengiriman</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm mb-1 text-ukire-text">
                      Alamat Lengkap*
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm mb-1 text-ukire-text">
                        Kota*
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={formSubmitLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="province" className="block text-sm mb-1 text-ukire-text">
                        Provinsi*
                      </label>
                      <select
                        id="province"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
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
                      <label htmlFor="postalCode" className="block text-sm mb-1 text-ukire-text">
                        Kode Pos*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
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
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Metode Pengiriman</h2>
                <div className="space-y-3">
                  <div className="flex items-center border border-gray-300 p-4 rounded-lg">
                    <input
                      type="radio"
                      id="shipping-reguler"
                      name="shipping"
                      className="mr-3 rounded text-ukire-amber focus:ring-ukire-amber"
                      value="Reguler"
                      checked={shippingMethod === "Reguler"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                    <label htmlFor="shipping-reguler" className="flex-1 text-ukire-text">
                      <div className="font-medium">Reguler (3-5 hari kerja)</div>
                      <div className="text-sm text-ukire-text">{formatPrice(250000)}</div>
                    </label>
                  </div>
                  <div className="flex items-center border border-gray-300 p-4 rounded-lg">
                    <input
                      type="radio"
                      id="shipping-express"
                      name="shipping"
                      className="mr-3 rounded text-ukire-amber focus:ring-ukire-amber"
                      value="Express"
                      checked={shippingMethod === "Express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                    <label htmlFor="shipping-express" className="flex-1 text-ukire-text">
                      <div className="font-medium">Express (1-2 hari kerja)</div>
                      <div className="text-sm text-ukire-text">{formatPrice(500000)}</div>
                    </label>
                  </div>
                  <div className="flex items-center border border-gray-300 p-4 rounded-lg">
                    <input
                      type="radio"
                      id="shipping-pickup"
                      name="shipping"
                      className="mr-3 rounded text-ukire-amber focus:ring-ukire-amber"
                      value="Ambil di Toko"
                      checked={shippingMethod === "Ambil di Toko"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      disabled={formSubmitLoading}
                    />
                    <label htmlFor="shipping-pickup" className="flex-1 text-ukire-text">
                      <div className="font-medium">Ambil di Toko</div>
                      <div className="text-sm text-ukire-text">Gratis</div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Catatan Pesanan</h2>
                <textarea
                  className="w-full border border-gray-300 px-4 py-2 h-32 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                  placeholder="Tambahkan catatan khusus untuk pesanan Anda (opsional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={formSubmitLoading}
                ></textarea>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Ringkasan Pesanan</h2>

                <div className="space-y-4 mb-6 text-ukire-text">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-ukire-gray flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${item.image_path}` : "https://placehold.co/80x80/cccccc/333333?text=No+Image"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-ukire-black">{item.name}</h3>
                        <p className="text-sm text-ukire-text">Qty: {item.quantity}</p>
                        <p className="text-sm text-ukire-text">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-b border-gray-200 py-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-ukire-text">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-ukire-text">
                    <span>Pengiriman</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium text-ukire-black mb-6">
                  <span>Total</span>
                  <span>{formatPrice(totalWithShipping)}</span>
                </div>

                <button
                  type="submit"
                  className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg transition-colors hover:bg-amber-50 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formSubmitLoading || cartItems.length === 0}
                >
                  {formSubmitLoading ? "Membuat Pesanan..." : "Konfirmasi Pemesanan"}
                </button>

                <p className="text-xs text-ukire-text mt-4 text-center">
                  Dengan mengklik tombol di atas, Anda menyetujui{" "}
                  <Link to="/terms" className="underline hover:text-ukire-amber">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  kami
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>

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
