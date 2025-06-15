import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, Landmark, Wallet } from "lucide-react";
import { useState, useEffect, useCallback } from "react"; // Tambahkan useCallback
import { callApi, API_BASE_URL } from "../utils/api";
import Loading from "../loading";

// Asumsi fungsi isLoggedIn ada di main.jsx dan diekspor
function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function PembayaranPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [orderId, setOrderId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0); // Total final dari pesanan
  const [cartItems, setCartItems] = useState([]); // Item yang dipesan (dari detail order)
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit_card"); // Default metode pembayaran

  // Fetches order details based on orderId from navigation state
  const fetchOrderDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Sesi Anda berakhir atau Anda belum login. Silakan login kembali.");
      navigate("/login");
      return;
    }

    try {
      const response = await callApi(`orders/${id}`, "GET", null, token);
      if (response && response.data) {
        setOrderId(response.data.id);
        setOrderTotal(response.data.total_amount); // Gunakan total_amount dari order yang sebenarnya
        
        // Format order items agar sesuai dengan tampilan cartItems
        const formattedItems = response.data.items.map(item => ({
            id: item.id,
            name: item.product.name,
            price: item.price_at_order, // Harga saat pesanan dibuat
            quantity: item.quantity,
            image_path: item.product.image_path,
            total_item_price: item.quantity * item.price_at_order,
            category: item.product.category ? item.product.category.name : 'N/A',
        }));
        setCartItems(formattedItems);
      } else {
        setError("Detail pesanan tidak ditemukan.");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching order details for payment:", err);
      setError("Gagal memuat detail pesanan untuk pembayaran: " + (err.message || "Terjadi kesalahan."));
      setLoading(false);
      // Redirect to login if unauthenticated error
      if (err.message && (err.message.includes("Unauthenticated") || err.message.includes("Token"))) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Sesi Anda berakhir. Silakan login kembali.");
        window.location.href = '/login';
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Ambil orderId dari state navigasi dari PemesananPage
    if (location.state && location.state.orderId) {
      fetchOrderDetails(location.state.orderId);
    } else {
      // Jika tidak ada orderId di state, berarti user langsung ke halaman pembayaran
      // atau ada masalah navigasi.
      setError("Tidak ada pesanan yang ditemukan untuk diproses pembayaran. Silakan mulai dari halaman pemesanan.");
      setLoading(false);
      // Opsional: Redirect ke /pemesanan jika tidak ada orderId
      // navigate("/pemesanan");
    }
  }, [location.state, fetchOrderDetails]);

  // Handle konfirmasi pembayaran (placeholder untuk saat ini)
  const handleConfirmPayment = () => {
      // Di sini nanti akan ada logika integrasi Payment Gateway
      alert("Pembayaran dikonfirmasi! (Fungsionalitas pembayaran sesungguhnya akan diimplementasikan di tahap selanjutnya)");
      // Redirect ke halaman riwayat pesanan atau halaman sukses
      navigate("/profile/orders"); 
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
    return <div className="text-center py-12 text-red-500 text-lg">{error}</div>;
  }
  
  // Asumsi shipping cost diambil dari backend (atau statis dulu)
  // Untuk perhitungan di sini, kita bisa mengasumsikan biaya kirim statis atau mengambilnya dari backend
  const estimatedShipping = 250000; // Ini harus sesuai dengan yang di PemesananPage
  const subtotalBeforeShipping = orderTotal - estimatedShipping; // Subtotal jika total_amount sudah termasuk ongkir

  // Contoh data dummy cartItems jika tidak ada orderDetails yang diambil (hanya untuk tampilan awal)
  const dummyCartItems = [
    { id: 1, name: "Contoh Produk 1", price: 100000, quantity: 1, image_path: "placeholder.svg", total_item_price: 100000 },
    { id: 2, name: "Contoh Produk 2", price: 200000, quantity: 2, image_path: "placeholder.svg", total_item_price: 400000 },
  ];


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
          <Link to="/pembayaran" className="font-medium">
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
            <Link to="/pemesanan" className="text-gray-500">
              Pemesanan
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span>Pembayaran</span>
          </div>

          <h1 className="text-3xl font-light mb-8">PEMBAYARAN</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Methods */}
            <div className="lg:w-2/3">
              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6">Metode Pembayaran</h2>

                <div className="space-y-4">
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="payment-credit"
                        name="payment"
                        className="mr-3 rounded"
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="payment-credit" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span className="font-medium">Kartu Kredit / Debit</span>
                      </label>
                    </div>

                    {paymentMethod === "credit_card" && (
                      <div className="pl-6 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm mb-1">
                            Nomor Kartu*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm mb-1">
                              Tanggal Kadaluarsa*
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm mb-1">
                              CVV*
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="cardName" className="block text-sm mb-1">
                            Nama pada Kartu*
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="payment-transfer" 
                        name="payment" 
                        className="mr-3 rounded"
                        value="bank_transfer"
                        checked={paymentMethod === "bank_transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="payment-transfer" className="flex items-center">
                        <Landmark className="h-5 w-5 mr-2" />
                        <span className="font-medium">Transfer Bank</span>
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="payment-ewallet" 
                        name="payment" 
                        className="mr-3 rounded"
                        value="e_wallet"
                        checked={paymentMethod === "e_wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="payment-ewallet" className="flex items-center">
                        <Wallet className="h-5 w-5 mr-2" />
                        <span className="font-medium">E-Wallet</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6">Alamat Penagihan</h2>

                <div className="flex items-center mb-4">
                  <input type="checkbox" id="sameAddress" className="mr-2 rounded" defaultChecked />
                  <label htmlFor="sameAddress">Sama dengan alamat pengiriman</label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="billingAddress" className="block text-sm mb-1">
                      Alamat Lengkap*
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="billingCity" className="block text-sm mb-1">
                        Kota*
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingProvince" className="block text-sm mb-1">
                        Provinsi*
                      </label>
                      <select
                        id="billingProvince"
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
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
                      <label htmlFor="billingPostalCode" className="block text-sm mb-1">
                        Kode Pos*
                      </label>
                      <input
                        type="text"
                        id="billingPostalCode"
                        className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg sticky top-6 shadow-sm">
                <h2 className="text-xl font-medium mb-6">Ringkasan Pesanan</h2>

                <div className="space-y-4 mb-6">
                  {/* Tampilkan item pesanan yang sebenarnya dari state */}
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
                    {/* Ini perlu dihitung ulang dari cartItems atau jika backend mengirimnya */}
                    <span>{formatPrice(orderTotal - estimatedShipping)}</span> 
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pengiriman</span>
                    <span>{formatPrice(estimatedShipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span> {/* Menggunakan orderTotal dari state */}
                </div>

                <button
                  onClick={handleConfirmPayment}
                  className="block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  Konfirmasi Pembayaran
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
