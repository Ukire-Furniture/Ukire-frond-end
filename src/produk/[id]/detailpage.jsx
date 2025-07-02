import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi } from "../../utils/api";
import Loading from "../../loading";
import { API_BASE_URL } from '../../utils/api'; 
import Navbar from '../../components/Navbar'; 
import FooterLinks from '../../landingpage/FooterLinks'; 

export default function ProdukDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      navigate("/login");
      return;
    }

    try {
      await callApi("cart/add", "POST", { product_id: product.id, quantity: 1 }, token);
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-500">{error}</h1>
          <Link to="/produk" className="text-ukire-black underline hover:text-ukire-amber">
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
          <h1 className="text-2xl font-bold mb-4 text-ukire-black">Produk tidak tersedia.</h1>
          <Link to="/produk" className="text-ukire-black underline hover:text-ukire-amber">
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 bg-ukire-gray">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-lg shadow-xl">
            
            {/* Product Image */}
            <div className="md:w-1/2 flex justify-center items-start">
              <img
                src={product.image_path ? `${API_BASE_URL.replace('/api', '')}/storage/${product.image_path}` : "https://placehold.co/400x400/cccccc/333333?text=No+Image"}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-4 text-ukire-black">{product.name}</h1>
              <p className="text-xl text-ukire-text mb-6">{formatPrice(product.price)}</p>
              <p className="text-sm text-ukire-text mb-2">Stok: {product.stock}</p>
              <p className="text-sm text-ukire-text mb-6">Kategori: {product.category ? product.category.name : 'Tidak Diketahui'}</p>
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-md transition-colors hover:bg-amber-50 hover:text-black"
              >
                Tambah ke Keranjang
              </button>
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2 text-ukire-black">Deskripsi Produk</h2>
                <p className="text-ukire-text">
                  {product.description || "Tidak ada deskripsi tersedia untuk produk ini."}
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
