import { Link } from "react-router-dom";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Nibras Ahmad Badruzzaman",
      position: "Project Manager",
      image: "public/images/nibras.jpg",
    },
    {
      name: "Deri Ibrahim",
      position: "UI/UX Designer",
      image: "public/images/deri.jpeg",
    },
    {
      name: "Firdo Maulana Firdaus",
      position: "Front-end Developer",
      image: "public/images/virdo.jpeg",
    },
    {
      name: "Awalludin",
      position: "Database Administrator",
      image: "public/images/awal.jpeg",
    },
    {
      name: "Afrendra Pratama",
      position: "Back-end Developer",
      image: "public/images/rendra.jpeg",
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-medium mb-6">TENTANG KAMI</h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              UKIRE adalah perusahaan furniture premium yang mengkhususkan diri dalam seni ukir kayu tradisional
              Indonesia. Kami menggabungkan keahlian pengrajin lokal dengan desain modern untuk menciptakan karya seni
              fungsional yang abadi.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="/public/images/ukir.jpg"
                  alt="Pengrajin UKIRE sedang mengukir"
                  width={400}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-medium mb-6">CERITA KAMI</h2>
                <p className="mb-4">
                  Didirikan pada tahun 2010, UKIRE berawal dari kecintaan terhadap seni ukir kayu tradisional Indonesia
                  yang mulai terlupakan. Kami melihat potensi besar dalam keahlian para pengrajin lokal dan memutuskan
                  untuk melestarikan warisan budaya ini dengan cara yang berkelanjutan.
                </p>
                <p className="mb-4">
                  Setiap produk UKIRE dibuat dengan tangan oleh pengrajin berpengalaman yang telah mewarisi keahlian
                  mereka secara turun-temurun. Kami hanya menggunakan kayu berkualitas tinggi dari sumber yang
                  bertanggung jawab, memastikan bahwa setiap potongan tidak hanya indah tetapi juga ramah lingkungan.
                </p>
                <p>
                  Hari ini, UKIRE telah berkembang menjadi merek furniture premium yang dikenal di seluruh Indonesia dan
                  mulai diakui secara internasional. Namun, misi kami tetap sama: menciptakan furniture berkualitas
                  tinggi yang menghormati tradisi sambil merangkul inovasi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-medium mb-12 text-center">NILAI-NILAI KAMI</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">01</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Keahlian Tradisional</h3>
                <p className="text-gray-600">
                  Kami menghargai dan melestarikan keahlian ukir tradisional yang telah diwariskan selama berabad-abad,
                  memastikan bahwa setiap produk dibuat dengan ketelitian dan perhatian terhadap detail.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">02</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Keberlanjutan</h3>
                <p className="text-gray-600">
                  Kami berkomitmen untuk praktik yang berkelanjutan, dari pengadaan kayu yang bertanggung jawab hingga
                  proses produksi yang meminimalkan dampak lingkungan.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">03</span>
                </div>
                <h3 className="text-xl font-medium mb-3">Inovasi Desain</h3>
                <p className="text-gray-600">
                  Sambil menghormati tradisi, kami terus berinovasi dalam desain, menciptakan furniture yang tidak hanya
                  indah tetapi juga fungsional dan relevan untuk gaya hidup modern.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-medium mb-12 text-center">TIM KAMI</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square overflow-hidden mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showroom */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-light mb-6">KUNJUNGI SHOWROOM KAMI</h2>
                <p className="mb-4">
                  Kami mengundang Anda untuk mengunjungi showroom kami di Jakarta untuk melihat dan merasakan langsung
                  kualitas produk UKIRE. Tim kami yang berpengalaman akan dengan senang hati membantu Anda menemukan
                  furniture yang sempurna untuk rumah Anda.
                </p>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Lokasi:</h3>
                  <p>Jl. Kemang Raya No. 123</p>
                  <p>Jakarta Selatan, 12730</p>
                  <p>Indonesia</p>
                </div>
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Jam Buka:</h3>
                  <p>Senin - Jumat: 10:00 - 19:00</p>
                  <p>Sabtu: 10:00 - 17:00</p>
                  <p>Minggu: 11:00 - 16:00</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
                >
                  Hubungi Kami
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src="public/images/kursi.png"
                  alt="Showroom UKIRE"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
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