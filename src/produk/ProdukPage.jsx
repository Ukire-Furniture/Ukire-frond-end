import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filter, Search, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi } from "../utils/api";
import Loading from "../loading";

function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export default function ProdukPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Pastikan useNavigate diimpor

  const location = useLocation();

  const fetchProducts = useCallback(async (page = 1, search = "", category = "") => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = `products?page=${page}`;
      if (search) {
        endpoint += `&search=${encodeURIComponent(search)}`;
      }
      if (category) {
        endpoint += `&category=${encodeURIComponent(category)}`;
      }
      
      const response = await callApi(endpoint, "GET");
      setProducts(response.data);
      setPagination(response.pagination);
      setLoading(false);

      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (page > 1) params.set('page', page);
      navigate({ search: params.toString() }, { replace: true });

    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Gagal memuat data produk: " + (err.message || "Terjadi kesalahan."));
      setLoading(false);
    }
  }, [navigate]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await callApi("categories", "GET");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();

    const params = new URLSearchParams(location.search);
    const initialCategory = params.get('category') || '';
    const initialSearch = params.get('search') || '';
    const initialPage = parseInt(params.get('page')) || 1;

    setSearchQuery(initialSearch);
    setSelectedCategory(initialCategory);
    setCurrentPage(initialPage);
    
    fetchProducts(initialPage, initialSearch, initialCategory);

  }, [location.search, fetchProducts, fetchCategories]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1, searchQuery, selectedCategory);
  };

  const handleCategoryChange = (categoryName) => {
    const newCategory = categoryName === selectedCategory ? "" : categoryName;
    setSelectedCategory(newCategory); 
    setCurrentPage(1);
    fetchProducts(1, searchQuery, newCategory);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
      fetchProducts(page, searchQuery, selectedCategory);
    }
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Anda harus login untuk menambahkan produk ke keranjang.");
      navigate("/login"); // Redirect ke halaman login
      return;
    }

    try {
      await callApi("cart/add", "POST", { product_id: productId, quantity: 1 }, token);
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Gagal menambahkan produk ke keranjang: " + (err.message || "Terjadi kesalahan."));
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

  if (loading && products.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500 text-lg">{error}</div>;
  }

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
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-light mb-8">PRODUK KAMI</h1>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none rounded"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-gray-400">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <div className="flex space-x-4">
              <button className="flex items-center border border-gray-300 px-4 py-2 text-sm rounded">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center border border-gray-300 px-4 py-2 text-sm rounded">
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
                {/* Tombol "Semua Produk" */}
                <li>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`flex justify-between text-sm hover:text-black w-full text-left ${
                      selectedCategory === "" ? "font-bold text-black" : "text-gray-500"
                    }`}
                  >
                    <span>Semua Produk</span>
                    <span className="text-gray-500">({pagination.total || 0})</span>
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex justify-between text-sm hover:text-black w-full text-left ${
                        selectedCategory === category.name ? "font-bold text-black" : "text-gray-500"
                      }`}
                    >
                      <span>{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Bagian Filter Harga dan Material (tetap statis) */}
              <div className="mt-8 border-t pt-8">
                <h2 className="text-lg font-medium mb-4">Harga</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2 rounded" />
                    <label htmlFor="price-1" className="text-sm">
                      Dibawah Rp 5.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2 rounded" />
                    <label htmlFor="price-2" className="text-sm">
                      Rp 5.000.000 - Rp 10.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2 rounded" />
                    <label htmlFor="price-3" className="text-sm">
                      Rp 10.000.000 - Rp 15.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-4" className="mr-2 rounded" />
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
                    <input type="checkbox" id="material-1" className="mr-2 rounded" />
                    <label htmlFor="material-1" className="text-sm">
                      Kayu Jati
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-2" className="mr-2 rounded" />
                    <label htmlFor="material-2" className="text-sm">
                      Kayu Mahoni
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-3" className="mr-2 rounded" />
                    <label htmlFor="material-3" className="text-sm">
                      Kayu Mindi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-4" className="mr-2 rounded" />
                    <label htmlFor="material-4" className="text-sm">
                      Kayu Sonokeling
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {products.length === 0 && !loading && (
                <div className="text-center text-gray-600 py-12">Tidak ada produk ditemukan.</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/produk/${product.id}`}>
                      <div className="mb-4 aspect-square overflow-hidden bg-gray-100 rounded-lg">
                        <img src={product.image_path ? `http://ukirebackend.test/storage/${product.image_path}` : "https://placehold.co/300x300/cccccc/333333?text=No+Image"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h3 className="text-base font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">{product.category ? product.category.name : 'Tanpa Kategori'}</p>
                      <p className="text-sm font-semibold text-amber-600 mt-1">{formatPrice(product.price)}</p>
                    </Link>
                    <button onClick={() => handleAddToCart(product.id)} className="mt-3 w-full bg-black text-white py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                      Tambah ke Keranjang
                    </button>
                  </div>
                ))}
              </div>

              {/* Paginasi */}
              {pagination.last_page > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center border rounded ${
                          currentPage === page ? "border-black bg-black text-white" : "border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
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
                <li><Link to="/customer/faq">FAQs</Link>
                </li>
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
