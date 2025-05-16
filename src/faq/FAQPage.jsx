import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQPage() {
  // FAQ data
  const faqCategories = [
    {
      title: "Produk & Pembelian",
      items: [
        {
          question: "Apakah semua produk UKIRE dibuat dengan tangan?",
          answer:
            "Ya, semua produk UKIRE dibuat dengan tangan oleh pengrajin berpengalaman. Setiap ukiran dikerjakan secara detail untuk memastikan kualitas dan keunikan setiap produk.",
        },
        {
          question: "Berapa lama waktu yang dibutuhkan untuk membuat satu produk?",
          answer:
            "Waktu produksi bervariasi tergantung pada kompleksitas desain dan ukiran. Secara umum, produk standar membutuhkan waktu 2-4 minggu, sementara produk custom dapat membutuhkan waktu 4-8 minggu.",
        },
        {
          question: "Apakah saya bisa memesan produk dengan desain khusus?",
          answer:
            "Tentu saja! Kami menerima pesanan custom sesuai dengan kebutuhan dan preferensi Anda. Silakan hubungi tim kami untuk konsultasi desain dan penawaran harga.",
        },
        {
          question: "Jenis kayu apa yang digunakan untuk produk UKIRE?",
          answer:
            "Kami menggunakan beberapa jenis kayu berkualitas tinggi seperti kayu jati, mahoni, mindi, dan sonokeling. Semua kayu yang kami gunakan berasal dari sumber yang bertanggung jawab dan legal.",
        },
      ],
    },
    {
      title: "Pengiriman & Pemasangan",
      items: [
        {
          question: "Berapa lama waktu pengiriman produk?",
          answer:
            "Waktu pengiriman bervariasi tergantung lokasi Anda. Untuk wilayah Jakarta dan sekitarnya, pengiriman biasanya membutuhkan waktu 3-5 hari kerja. Untuk wilayah lain di Indonesia, pengiriman dapat membutuhkan waktu 7-14 hari kerja.",
        },
        {
          question: "Apakah UKIRE menyediakan layanan pemasangan?",
          answer:
            "Ya, kami menyediakan layanan pemasangan untuk produk-produk tertentu seperti lemari besar, pintu, dan set furniture ruang tamu. Biaya pemasangan akan dihitung terpisah dan diinformasikan saat checkout.",
        },
        {
          question: "Apakah UKIRE melayani pengiriman internasional?",
          answer:
            "Ya, kami melayani pengiriman ke beberapa negara di Asia Tenggara, Australia, dan Eropa. Biaya pengiriman internasional akan dihitung berdasarkan berat, dimensi, dan negara tujuan.",
        },
        {
          question: "Bagaimana jika produk rusak saat pengiriman?",
          answer:
            "Kami mengemas produk dengan sangat hati-hati untuk menghindari kerusakan. Namun, jika terjadi kerusakan saat pengiriman, silakan laporkan kepada kami dalam waktu 48 jam setelah menerima produk dengan menyertakan foto kerusakan. Kami akan mengganti atau memperbaiki produk tersebut.",
        },
      ],
    },
    {
      title: "Pembayaran & Pengembalian",
      items: [
        {
          question: "Metode pembayaran apa saja yang tersedia?",
          answer:
            "Kami menerima pembayaran melalui transfer bank, kartu kredit/debit, dan beberapa e-wallet populer seperti GoPay dan OVO.",
        },
        {
          question: "Apakah ada biaya tambahan selain harga produk?",
          answer:
            "Ya, biaya tambahan meliputi biaya pengiriman yang dihitung berdasarkan berat, dimensi, dan lokasi pengiriman. Untuk beberapa produk, mungkin ada biaya pemasangan tambahan jika Anda memilih layanan tersebut.",
        },
        {
          question: "Bagaimana kebijakan pengembalian UKIRE?",
          answer:
            "Kami menerima pengembalian produk dalam waktu 7 hari setelah penerimaan jika produk tidak sesuai dengan deskripsi atau terdapat cacat produksi. Produk harus dikembalikan dalam kondisi asli dan belum digunakan. Biaya pengiriman untuk pengembalian ditanggung oleh pembeli.",
        },
        {
          question: "Apakah saya bisa membatalkan pesanan?",
          answer:
            "Pembatalan pesanan dapat dilakukan sebelum produk memasuki proses produksi. Setelah produksi dimulai, pembatalan akan dikenakan biaya sesuai dengan tahap produksi yang telah dilakukan. Untuk produk custom, uang muka tidak dapat dikembalikan.",
        },
      ],
    },
    {
      title: "Perawatan Produk",
      items: [
        {
          question: "Bagaimana cara merawat produk kayu UKIRE?",
          answer:
            "Untuk menjaga keindahan produk kayu UKIRE, bersihkan secara rutin dengan kain lembut dan kering. Hindari penggunaan bahan kimia keras dan jaga dari paparan sinar matahari langsung dalam waktu lama untuk mencegah perubahan warna.",
        },
        {
          question: "Seberapa sering saya perlu memoles furniture kayu?",
          answer:
            "Kami merekomendasikan untuk memoles furniture kayu setiap 6-12 bulan tergantung pada kondisi lingkungan. Gunakan polish khusus untuk kayu yang tidak mengandung silikon untuk hasil terbaik.",
        },
        {
          question: "Apa yang harus dilakukan jika terjadi goresan pada produk?",
          answer:
            "Untuk goresan kecil, Anda dapat menggunakan pensil touch-up khusus kayu yang sesuai dengan warna produk. Untuk goresan yang lebih dalam, kami menyarankan untuk menghubungi profesional atau tim layanan pelanggan kami untuk saran lebih lanjut.",
        },
        {
          question: "Apakah produk UKIRE tahan terhadap rayap?",
          answer:
            "Semua produk UKIRE telah melalui proses treatment anti rayap. Namun, untuk perlindungan jangka panjang, kami menyarankan untuk melakukan treatment ulang setiap 2-3 tahun, terutama jika Anda tinggal di daerah yang rawan rayap.",
        },
      ],
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

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-center">PERTANYAAN YANG SERING DIAJUKAN</h1>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="text-gray-600">
                Temukan jawaban untuk pertanyaan umum tentang produk, pemesanan, pengiriman, dan layanan kami. Jika Anda
                tidak menemukan jawaban yang Anda cari, jangan ragu untuk{" "}
                <Link to="/contact" className="text-black underline">
                  menghubungi kami
                </Link>
                .
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="space-y-8">
              {faqCategories.map((category, index) => (
                <div key={index}>
                  <h2 className="text-xl font-medium mb-4">{category.title}</h2>
                  <div className="border-t">
                    {category.items.map((item, itemIndex) => (
                      <FAQItem key={itemIndex} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gray-50 p-8 text-center">
              <h2 className="text-xl font-medium mb-4">Masih Punya Pertanyaan?</h2>
              <p className="text-gray-600 mb-6">
                Jika Anda tidak menemukan jawaban yang Anda cari, tim layanan pelanggan kami siap membantu Anda.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Hubungi Kami
              </Link>
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