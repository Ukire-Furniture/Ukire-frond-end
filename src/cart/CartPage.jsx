import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Lemari Ukir Klasik",
      price: 12500000,
      quantity: 1,
      image: "/images/product-2.png",
    },
    {
      id: 3,
      name: "Set Kursi Tamu Ukir",
      price: 15900000,
      quantity: 1,
      image: "/images/product-5.png",
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 250000;
  const total = subtotal + shipping;

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
          <Link to="/login" className="text-gray-700">
            Login
          </Link>
          <Link to="/cart" className="flex items-center font-medium">
            <span>Cart({cartItems.length})</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8">KERANJANG BELANJA</h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="border-b pb-4 mb-4 hidden md:grid md:grid-cols-12 text-sm font-medium">
                  <div className="md:col-span-6">Produk</div>
                  <div className="md:col-span-2 text-center">Harga</div>
                  <div className="md:col-span-2 text-center">Jumlah</div>
                  <div className="md:col-span-2 text-center">Total</div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="border-b py-6 md:grid md:grid-cols-12 items-center">
                    <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                      <div className="w-20 h-20 bg-gray-100 flex-shrink-0 mr-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <button className="text-sm text-gray-500 flex items-center mt-1">
                          <X className="h-3 w-3 mr-1" />
                          Hapus
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Harga:</div>
                      <div>{formatPrice(item.price)}</div>
                    </div>

                    <div className="md:col-span-2 flex justify-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-gray-500 mb-1 mr-2">Jumlah:</div>
                      <div className="flex items-center border border-gray-300">
                        <button className="px-2 py-1 hover:bg-gray-100">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
                        <button className="px-2 py-1 hover:bg-gray-100">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center">
                      <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                      <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-8">
                  <Link to="/produk" className="text-sm hover:underline">
                    ← Lanjutkan Belanja
                  </Link>
                  <button className="text-sm hover:underline">Kosongkan Keranjang</button>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:w-1/3">
                <div className="bg-gray-50 p-6">
                  <h2 className="text-xl font-medium mb-6">Ringkasan Pesanan</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimasi Pengiriman</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link
                    to="/pemesanan"
                    className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors"
                  >
                    Lanjut ke Pemesanan
                  </Link>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Kode Promo</h3>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Masukkan kode promo"
                        className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none"
                      />
                      <button className="bg-black text-white px-4 py-2 text-sm uppercase">TERAPKAN</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium mb-4">Keranjang Belanja Anda Kosong</h2>
              <p className="text-gray-500 mb-8">Silakan tambahkan produk ke keranjang belanja Anda</p>
              <Link
                to="/produk"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Belanja Sekarang
              </Link>
            </div>
          )}
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