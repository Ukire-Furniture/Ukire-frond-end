import { Link, useParams, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { useEffect, useState } from "react";
import { callApi } from "../../utils/api";
import Loading from "../../loading";

export default function ProdukDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await callApi(`products/${id}`, "GET");
        if (response && response.data) {
          setProduct(response.data);
        } else {
          setError('Produk tidak ditemukan.');
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Gagal memuat detail produk: " + (err.message || "Terjadi kesalahan."));
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Anda harus login untuk menambahkan produk ke keranjang.");
      navigate("/login"); // Redirect ke halaman login
      return;
    }

    try {
      // Asumsi kuantitas selalu 1 dari detail produk
      await callApi("cart/add", "POST", { product_id: product.id, quantity: 1 }, token);
      alert("Produk berhasil ditambahkan ke keranjang!");
      // Opsional: Redirect ke halaman keranjang atau update UI keranjang di Navbar
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">{error}</h1>
          <Link to="/produk" className="text-black underline">
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produk tidak tersedia.</h1>
          <Link to="/produk" className="text-black underline">
            Kembali ke Produk
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
          <Link to="/" className="text-gray-500">Home</Link>
          <Link to="/produk" className="font-medium">Produk</Link>
          <Link to="/pemesanan" className="text-gray-500">Pemesanan</Link>
          <Link to="/pembayaran" className="text-gray-500">Pembayaran</Link>
        </nav>
        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center">
            <div className="w-3 h-3 bg-black rotate-45 mr-1"></div>
            <span className="text-2xl font-bold">UKIRE</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          {/* Ini akan diintegrasikan dengan status login nanti */}
          <Link to="/login" className="text-gray-700">Login</Link>
          <Link to="/cart" className="flex items-center text-gray-700">
            <span>Cart(0)</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="flex-1 flex justify-center items-start">
              <img
                src={product.image_path ? `http://ukirebackend.test/storage/${product.image_path}` : "https://placehold.co/400x400/cccccc/333333?text=No+Image"}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover rounded shadow"
              />
            </div>
            {/* Product Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-gray-700 mb-6">{formatPrice(product.price)}</p>
              <p className="text-sm text-gray-600 mb-2">Stok: {product.stock}</p>
              <p className="text-sm text-gray-600 mb-6">Kategori: {product.category ? product.category.name : 'Tidak Diketahui'}</p>
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors mb-4"
              >
                Tambah ke Keranjang
              </button>
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Deskripsi Produk</h2>
                <p className="text-gray-600">
                  {product.description || "Tidak ada deskripsi tersedia untuk produk ini."}
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
                <li><Link to="/customer/login">Login ister</Link></li>
                <li><Link to="/customer/shipping">Shipping & Returns</Link></li>
                <li><Link to="/customer/faq">FAQs</Link></li>
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
