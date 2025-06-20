import { Link, useLocation, useNavigate } from "react-router-dom";
import { Filter, Search, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { callApi, API_BASE_URL } from "../utils/api";
import Loading from "../loading";
import { isLoggedIn } from "../main"; 
import Navbar from '../components/Navbar'; 
import FooterLinks from '../landingpage/FooterLinks'; 

export default function ProdukPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
      setCurrentPage(response.pagination.current_page);
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
      navigate("/login");
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
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 bg-ukire-gray">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">PRODUK KAMI</h1>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-4 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none rounded-lg focus:ring-1 focus:ring-ukire-amber"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-ukire-text">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <div className="flex space-x-4">
              <button className="flex items-center border border-gray-300 px-4 py-2 text-sm rounded-lg bg-white hover:bg-ukire-gray transition-colors font-medium text-ukire-text">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center border border-gray-300 px-4 py-2 text-sm rounded-lg bg-white hover:bg-ukire-gray transition-colors font-medium text-ukire-text">
                Urutkan
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="w-full md:w-64 md:pr-0 mb-8 md:mb-0 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4 text-ukire-black">Kategori</h2>
              <ul className="space-y-3">
                {/* Tombol "Semua Produk" */}
                <li>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`flex justify-between text-sm hover:text-ukire-black w-full text-left py-1 px-2 rounded-lg transition-colors ${
                      selectedCategory === "" ? "font-bold text-ukire-black bg-ukire-gray" : "text-ukire-text"
                    }`}
                  >
                    <span>Semua Produk</span>
                    <span className="text-ukire-text">({pagination.total || 0})</span>
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex justify-between text-sm hover:text-ukire-black w-full text-left py-1 px-2 rounded-lg transition-colors ${
                        selectedCategory === category.name ? "font-bold text-ukire-black bg-ukire-gray" : "text-ukire-text"
                      }`}
                    >
                      <span>{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Bagian Filter Harga dan Material (tetap statis) */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-lg font-medium mb-4 text-ukire-black">Harga</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="price-1" className="text-sm text-ukire-text">
                      Dibawah Rp 5.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="price-2" className="text-sm">
                      Rp 5.000.000 - Rp 10.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="price-3" className="text-sm">
                      Rp 10.000.000 - Rp 15.000.000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-4" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="price-4" className="text-sm">
                      Diatas Rp 15.000.000
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-lg font-medium mb-4 text-ukire-black">Material</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="material-1" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="material-1" className="text-sm">
                      Kayu Jati
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-2" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="material-2" className="text-sm">
                      Kayu Mahoni
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-3" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
                    <label htmlFor="material-3" className="text-sm">
                      Kayu Mindi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="material-4" className="mr-2 rounded text-ukire-amber focus:ring-ukire-amber" />
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
                <div className="text-center text-ukire-text py-12">Tidak ada produk ditemukan.</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    <Link to={`/produk/${product.id}`} className="block p-4">
                      <div className="mb-4 aspect-square overflow-hidden bg-ukire-gray rounded-lg">
                        <img src={product.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${product.image_path}` : "https://placehold.co/300x300/cccccc/333333?text=No+Image"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h3 className="text-base font-medium text-ukire-black">{product.name}</h3>
                      <p className="text-sm text-ukire-text mt-1">{product.category ? product.category.name : 'Tanpa Kategori'}</p>
                      <p className="text-sm font-semibold text-ukire-amber mt-1">{formatPrice(product.price)}</p>
                    </Link>
                    {/* Tombol Tambah ke Keranjang - Muncul saat hover */}
                    <button onClick={() => handleAddToCart(product.id)} className="mt-3 w-full bg-ukire-black text-white py-2 text-sm rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800">
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
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ukire-gray transition-colors text-ukire-text"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center border rounded-full ${
                          currentPage === page ? "border-ukire-black bg-ukire-black text-white" : "border-gray-300 hover:bg-ukire-gray text-ukire-text"
                        } transition-colors`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                      className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ukire-gray transition-colors text-ukire-text"
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
