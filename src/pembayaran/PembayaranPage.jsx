import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, Landmark, Wallet } from "lucide-react";

export default function PembayaranPage() {
  const cartItems = [
    {
      id: 1,
      name: "Lemari Ukir Klasik",
      price: "Rp 12.500.000",
      quantity: 1,
      image: "/images/kayu/kursi.png",
    },
    {
      id: 3,
      name: "Set Kursi Tamu Ukir",
      price: "Rp 15.900.000",
      quantity: 1,
      image: "/images/kayu/kursi.png",
    },
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
          <Link to="/login" className="text-gray-700">
            Login
          </Link>
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(2)</span>
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
              <div className="bg-white p-6 mb-6">
                <h2 className="text-xl font-medium mb-6">Metode Pembayaran</h2>

                <div className="space-y-4">
                  <div className="border border-gray-300 p-4">
                    <div className="flex items-center mb-4">
                      <input type="radio" id="payment-1" name="payment" className="mr-3" defaultChecked />
                      <label htmlFor="payment-1" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span className="font-medium">Kartu Kredit / Debit</span>
                      </label>
                    </div>

                    <div className="pl-6 space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm mb-1">
                          Nomor Kartu*
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
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
                            className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
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
                            className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
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
                          className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-300 p-4">
                    <div className="flex items-center">
                      <input type="radio" id="payment-2" name="payment" className="mr-3" />
                      <label htmlFor="payment-2" className="flex items-center">
                        <Landmark className="h-5 w-5 mr-2" />
                        <span className="font-medium">Transfer Bank</span>
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-300 p-4">
                    <div className="flex items-center">
                      <input type="radio" id="payment-3" name="payment" className="mr-3" />
                      <label htmlFor="payment-3" className="flex items-center">
                        <Wallet className="h-5 w-5 mr-2" />
                        <span className="font-medium">E-Wallet</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6">
                <h2 className="text-xl font-medium mb-6">Alamat Penagihan</h2>

                <div className="flex items-center mb-4">
                  <input type="checkbox" id="sameAddress" className="mr-2" defaultChecked />
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
                      className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
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
                        className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingProvince" className="block text-sm mb-1">
                        Provinsi*
                      </label>
                      <select
                        id="billingProvince"
                        className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                        required
                      >
                        <option value="">Pilih Provinsi</option>
                        <option value="jawa-barat">Jawa Barat</option>
                        <option value="jawa-tengah">Jawa Tengah</option>
                        <option value="jawa-timur">Jawa Timur</option>
                        <option value="dki-jakarta">DKI Jakarta</option>
                        <option value="banten">Banten</option>
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
                        className="w-full border border-gray-300 px-4 py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 sticky top-6">
                <h2 className="text-xl font-medium mb-6">Ringkasan Pesanan</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-b py-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rp 28.400.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pengiriman</span>
                    <span>Rp 250.000</span>
                  </div>
                </div>

                <div className="flex justify-between font-medium mb-6">
                  <span>Total</span>
                  <span>Rp 28.650.000</span>
                </div>

                <button className="w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors">
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