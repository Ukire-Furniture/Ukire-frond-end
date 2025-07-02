import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, Landmark, Wallet } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { callApi, API_BASE_URL } from "../utils/api";
import Loading from "../loading";
import Navbar from '../components/Navbar'; // Impor Navbar
import FooterLinks from '../landingpage/FooterLinks'; // Impor FooterLinks

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
        setOrderTotal(response.data.total_amount);
        
        const formattedItems = response.data.items.map(item => ({
            id: item.id,
            name: item.product.name,
            price: item.price_at_order,
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
      if (err.message && (err.message.includes("Unauthenticated") || err.message.includes("Token"))) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Sesi Anda berakhir. Silakan login kembali.");
        window.location.href = '/login';
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state && location.state.orderId) {
      fetchOrderDetails(location.state.orderId);
    } else {
      setError("Tidak ada pesanan yang ditemukan untuk diproses pembayaran. Silakan mulai dari halaman pemesanan.");
      setLoading(false);
    }
  }, [location.state, fetchOrderDetails]);

  const handleConfirmPayment = async () => {
      alert("Pembayaran dikonfirmasi! (Fungsionalitas pembayaran sesungguhnya akan diimplementasikan di tahap selanjutnya)");
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

  const estimatedShipping = 250000;
  const subtotalBeforeShipping = orderTotal - estimatedShipping;

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
            <Link to="/pemesanan" className="text-gray-500">
              Pemesanan
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span>Pembayaran</span>
          </div>

          <h1 className="text-3xl font-light mb-8 text-ukire-black">PEMBAYARAN</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment Methods */}
            <div className="lg:w-2/3">
              <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Metode Pembayaran</h2>

                <div className="space-y-4">
                  <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="payment-credit"
                        name="payment"
                        className="mr-3 rounded text-ukire-amber focus:ring-ukire-amber"
                        value="credit_card"
                        checked={paymentMethod === "credit_card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="payment-credit" className="flex items-center text-ukire-text">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span className="font-medium">Kartu Kredit / Debit</span>
                      </label>
                    </div>

                    {paymentMethod === "credit_card" && (
                      <div className="pl-6 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm mb-1 text-ukire-text">
                            Nomor Kartu*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-sm mb-1 text-ukire-text">
                              Tanggal Kadaluarsa*
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm mb-1 text-ukire-text">
                              CVV*
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="cardName" className="block text-sm mb-1 text-ukire-text">
                            Nama pada Kartu*
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber"
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
                        className="mr-3 rounded text-ukire-amber focus:ring-ukire-amber"
                        value="bank_transfer"
                        checked={paymentMethod === "bank_transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="payment-transfer" className="flex items-center text-ukire-text">
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
                        className="mr-3 rounded text-ukire-amber focus:ring-ukire-amber"
                        value="e_wallet"
                        checked={paymentMethod === "e_wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="payment-ewallet" className="flex items-center text-ukire-text">
                        <Wallet className="h-5 w-5 mr-2" />
                        <span className="font-medium">E-Wallet</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Alamat Penagihan</h2>

                <div className="flex items-center mb-4">
                  <input type="checkbox" id="sameAddress" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" defaultChecked />
                  <label htmlFor="sameAddress" className="text-ukire-text">Sama dengan alamat pengiriman</label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="billingAddress" className="block text-sm mb-1 text-ukire-text">
                      Alamat Lengkap*
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber text-ukire-text"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="billingCity" className="block text-sm mb-1 text-ukire-text">
                        Kota*
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber text-ukire-text"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingProvince" className="block text-sm mb-1 text-ukire-text">
                        Provinsi*
                      </label>
                      <select
                        id="billingProvince"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber text-ukire-text"
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
                      <label htmlFor="billingPostalCode" className="block text-sm mb-1 text-ukire-text">
                        Kode Pos*
                      </label>
                      <input
                        type="text"
                        id="billingPostalCode"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-ukire-amber text-ukire-text"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                <h2 className="text-xl font-medium mb-6 text-ukire-black">Ringkasan Pesanan</h2>

                <div className="space-y-4 mb-6">
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
                  <Link to="/terms" className="underline text-ukire-black hover:text-ukire-amber">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  kami
                </p>
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
