import { Link } from "react-router-dom";
import { Filter, Search, ChevronDown } from "lucide-react";

export default function ProdukPage() {
  const categories = [
    { name: "Semua Produk", count: 120 },
    { name: "Lemari", count: 42 },
    { name: "Kursi", count: 38 },
    { name: "Meja", count: 25 },
    { name: "Pintu", count: 15 },
  ];

  const products = [
    {
      id: 1,
      name: "Lemari Ukir Klasik",
      price: "Rp 12.500.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 2,
      name: "Pintu Ukir Jati",
      price: "Rp 8.750.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 3,
      name: "Set Kursi Tamu Ukir",
      price: "Rp 15.900.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 4,
      name: "Lemari Pakaian Ukir",
      price: "Rp 14.250.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 5,
      name: "Pintu Gebyok Ukir",
      price: "Rp 9.800.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 6,
      name: "Set Kursi Ruang Keluarga",
      price: "Rp 16.500.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 7,
      name: "Lemari Hias Ukir",
      price: "Rp 11.750.000",
      image: "public/images/kayu/kursi.png",
    },
    {
      id: 8,
      name: "Pintu Rumah Ukir",
      price: "Rp 10.250.000",
      image: "public/images/kayu/kursi.png",
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
          <Link to="/produk" className="font-medium">
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
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-light mb-8">PRODUK KAMI</h1>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center border border-gray-300 px-4 py-2 text-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center border border-gray-300 px-4 py-2 text-sm">
                Urutkan
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Categories Sidebar */}
            <div className="w-full md:w-64 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-lg font-medium mb-4">Kategori</h2>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={`/produk/kategori/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex justify-between text-sm hover:text-black"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500">({category.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t pt-8">
                <h2 className="text-lg font-medium mb-4">Harga</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2" />
                    <label htmlFor="price-1" className="text-sm">
                      Dibawah Rp 5.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2" />
                    <label htmlFor="price-2" className="text-sm">
                      Rp 5.000.000 - Rp 10.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2" />
                    <label htmlFor="price-3" className="text-sm">
                      Rp 10.000.000 - Rp 15.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-4" className="mr-2" />
                    <label htmlFor="price-4" className="text-sm">
                      Diatas Rp 15.000.000
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-8">
                <h2 className="text-lg font-medium mb-4">Material</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="material-1" className="mr-2" />
                    <label htmlFor="material-1" className="text-sm">
                      Kayu Jati
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-2" className="mr-2" />
                    <label htmlFor="material-2" className="text-sm">
                      Kayu Mahoni
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-3" className="mr-2" />
                    <label htmlFor="material-3" className="text-sm">
                      Kayu Mindi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-4" className="mr-2" />
                    <label htmlFor="material-4" className="text-sm">
                      Kayu Sonokeling
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/produk/${product.id}`}>
                      <div className="mb-4 aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-base font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">{product.price}</p>
                    </Link>
                    <button className="mt-3 w-full bg-black text-white py-2 text-sm hover:bg-gray-800 transition-colors">
                      Tambah ke Keranjang
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-1">
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300">&lt;</button>
                  <button className="w-10 h-10 flex items-center justify-center border border-black bg-black text-white">
                    1
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300">2</button>
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300">3</button>
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300">&gt;</button>
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
                  <Link to="/customer/login">Login ister</Link>
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