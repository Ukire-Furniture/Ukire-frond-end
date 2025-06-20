import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi, API_BASE_URL } from "../utils/api";
import Loading from "../loading";
import Navbar from '../components/Navbar';
import FooterLinks from '../landingpage/FooterLinks';

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);

  const fetchCartItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setCartItems([]);
      setCartTotal(0);
      setError("Anda perlu login untuk melihat keranjang belanja.");
      setLoading(false);
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

      if (response.message && (response.message.includes("Unauthenticated") || response.message.includes("Token"))) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        alert("Sesi Anda berakhir. Silakan login kembali.");
        window.location.href = '/login';
      }

    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Gagal memuat keranjang belanja: " + (err.message || "Terjadi kesalahan."));
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
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Silakan login untuk mengubah keranjang.");
        return;
    }
    if (newQuantity < 0) return;

    setLoading(true);
    try {
      await callApi(`cart/update/${itemId}`, "PUT", { quantity: newQuantity }, token);
      fetchCartItems();
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
      alert("Gagal memperbarui kuantitas: " + (err.message || "Terjadi kesalahan."));
    } finally {
        setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Silakan login untuk menghapus item dari keranjang.");
        return;
    }
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")) {
        setLoading(true);
        try {
            await callApi(`cart/remove/${itemId}`, "DELETE", null, token);
            fetchCartItems();
        } catch (err) {
            console.error("Error removing cart item:", err);
            alert("Gagal menghapus item: " + (err.message || "Terjadi kesalahan."));
        } finally {
            setLoading(false);
        }
    }
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        alert("Silakan login untuk mengosongkan keranjang.");
        return;
    }
    if (window.confirm("Apakah Anda yakin ingin mengosongkan keranjang belanja Anda?")) {
        setLoading(true);
        try {
            await callApi("cart/clear", "POST", null, token);
            alert("Keranjang berhasil dikosongkan!");
            fetchCartItems();
        } catch (err) {
            console.error("Error clearing cart:", err);
            alert("Gagal mengosongkan keranjang: " + (err.message || "Terjadi kesalahan."));
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

  const shipping = 250000;
  const totalWithShipping = cartTotal + shipping;

  if (loading && cartItems.length === 0) {
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
          <p className="text-ukire-text mb-8">Silakan tambahkan produk ke keranjang belanja Anda</p>
          <Link
            to="/produk"
            className="inline-block bg-ukire-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg"
          >
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
          <h1 className="text-3xl font-light mb-8 text-ukire-black">KERANJANG BELANJA</h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="border-b pb-4 mb-4 hidden md:grid md:grid-cols-12 text-sm font-medium text-ukire-black">
                  <div className="md:col-span-6">Produk</div>
                  <div className="md:col-span-2 text-center">Harga</div>
                  <div className="md:col-span-2 text-center">Jumlah</div>
                  <div className="md:col-span-2 text-center">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 py-6 md:grid md:grid-cols-12 items-center bg-white rounded-lg shadow-sm mb-4">
                    <div className="md:col-span-6 flex items-center mb-4 md:mb-0 p-2">
                      <div className="w-20 h-20 bg-ukire-gray flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={item.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${item.image_path}` : "https://placehold.co/80x80/cccccc/333333?text=No+Image"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-ukire-black">{item.name}</h3>
                        <p className="text-sm text-ukire-text">Kategori: {item.category}</p>
                        <button onClick={() => handleRemoveItem(item.id)} className="text-sm text-red-500 flex items-center mt-1 hover:underline">
                          <X className="h-3 w-3 mr-1" />
                          Hapus
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center mb-4 md:mb-0 text-ukire-text">
                      <div className="md:hidden text-sm text-ukire-text mb-1">Harga:</div>
                      <div>{formatPrice(item.price)}</div>
                    </div>

                    <div className="md:col-span-2 flex justify-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-ukire-text mb-1 mr-2">Jumlah:</div>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-ukire-gray rounded-l-lg">
                          <Minus className="h-3 w-3 text-ukire-text" />
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300 text-ukire-text">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-ukire-gray rounded-r-lg">
                          <Plus className="h-3 w-3 text-ukire-text" />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center text-ukire-black">
                      <div className="md:hidden text-sm text-ukire-text mb-1">Total:</div>
                      <div className="font-medium">{formatPrice(item.total_item_price)}</div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-8">
                  <Link to="/produk" className="text-sm hover:underline text-ukire-text">
                    ← Lanjutkan Belanja
                  </Link>
                  <button onClick={handleClearCart} className="text-sm hover:underline text-red-500">Kosongkan Keranjang</button>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                  <h2 className="text-xl font-medium mb-6 text-ukire-black">Ringkasan Pesanan</h2>

                  <div className="space-y-3 mb-6 text-ukire-text">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimasi Pengiriman</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-medium text-ukire-black">
                      <span>Total</span>
                      <span>{formatPrice(totalWithShipping)}</span>
                    </div>
                  </div>

                  <Link
                    to="/pemesanan"
                    className="block w-full bg-ukire-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Lanjut ke Pemesanan
                  </Link>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3 text-ukire-black">Kode Promo</h3>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Masukkan kode promo"
                        className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none rounded-l-lg"
                      />
                      <button className="bg-ukire-black text-white px-4 py-2 text-sm uppercase rounded-r-lg">TERAPKAN</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-ukire-gray rounded-lg shadow-md">
              <h2 className="text-2xl font-medium mb-4 text-ukire-black">Keranjang Belanja Anda Kosong</h2>
              <p className="text-ukire-text mb-8">Silakan tambahkan produk ke keranjang belanja Anda</p>
              <Link
                to="/produk"
                className="inline-block bg-ukire-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-lg"
              >
                Belanja Sekarang
              </Link>
            </div>
          )}
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
