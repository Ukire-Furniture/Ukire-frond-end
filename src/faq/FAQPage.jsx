import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from '../components/Navbar';
import FooterLinks from '../landingpage/FooterLinks';

// FAQ Item Component (tetap sama)
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left text-ukire-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
        <p className="text-ukire-text">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQPage() {
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
            "Waktu produksi bervariasi tergantung pada kompleksitas desain dan ukiran. Secara umum, produk standar membutuhkan 2-4 minggu, sementara pesanan kustom bisa lebih lama. Kami akan memberikan estimasi yang lebih akurat saat konfirmasi pesanan.",
        },
        {
          question: "Apakah saya bisa memesan ukiran kustom?",
          answer:
            "Tentu! Kami menerima pesanan ukiran kustom. Silakan hubungi tim layanan pelanggan kami untuk mendiskusikan desain, material, dan estimasi biaya.",
        },
      ],
    },
    {
      title: "Pengiriman & Pengembalian",
      items: [
        {
          question: "Berapa biaya pengiriman?",
          answer:
            "Biaya pengiriman dihitung berdasarkan lokasi pengiriman dan berat/volume produk. Anda bisa melihat estimasi biaya pengiriman saat proses checkout.",
        },
        {
          question: "Apakah UKIRE melayani pengiriman internasional?",
          answer:
            "Saat ini, kami fokus melayani pengiriman di wilayah Indonesia. Untuk pengiriman internasional, silakan hubungi kami untuk mendiskusikan kemungkinan dan biaya tambahan.",
        },
        {
          question: "Bagaimana cara mengajukan pengembalian produk?",
          answer:
            "Jika Anda tidak puas dengan produk yang diterima, Anda dapat mengajukan pengembalian dalam waktu 7 hari setelah penerimaan barang, dengan syarat produk masih dalam kondisi asli. Silakan lihat kebijakan pengembalian kami untuk detail lebih lanjut.",
        },
      ],
    },
    {
      title: "Pembayaran & Keamanan",
      items: [
        {
          question: "Metode pembayaran apa saja yang diterima?",
          answer:
            "Kami menerima pembayaran melalui transfer bank, kartu kredit/debit (Visa, Mastercard), dan beberapa platform e-wallet terkemuka. Detail lengkap tersedia saat checkout.",
        },
        {
          question: "Apakah informasi pembayaran saya aman?",
          answer:
            "Kami menggunakan teknologi enkripsi SSL dan standar keamanan terkini untuk melindungi semua informasi pribadi dan pembayaran Anda. Data Anda aman bersama kami.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">PERTANYAAN UMUM</h1>

          <div className="bg-white p-8 shadow-sm rounded-lg">
            {faqCategories.map((category, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h2 className="text-xl font-medium mb-4 text-ukire-black">{category.title}</h2>
                <div>
                  {category.items.map((item, itemIndex) => (
                    <FAQItem key={itemIndex} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer di sini */}
      <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 bg-white">
        <FooterLinks />
        <div className="pt-8 border-t border-gray-200 text-xs text-ukire-text flex flex-wrap gap-6">
          <Link to="/about">ABOUT US</Link>
          <Link to="/blog">BLOG</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/order-tracking">ORDER TRACKING</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      </footer>
    </div>
  );
}
