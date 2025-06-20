import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import FooterLinks from '../landingpage/FooterLinks';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Nibras Ahmad Badruzzaman",
      position: "Project Manager",
      image: "/images/nibras.jpg", // Sesuaikan path gambar
    },
    {
      name: "Deri Ibrahim",
      position: "UI/UX Designer",
      image: "/images/deri.jpeg", // Sesuaikan path gambar
    },
    {
      name: "Virdo Maulana Firdaus",
      position: "Front-end Developer",
      image: "/images/virdo.jpeg", // Sesuaikan path gambar
    },
    {
      name: "Awaludin",
      position: "Database Administrator",
      image: "/images/awal.jpeg", // Sesuaikan path gambar
    },
    {
      name: "Afrendra Pratama",
      position: "Back-end Developer",
      image: "/images/rendra.jpeg", // Sesuaikan path gambar
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar di sini */}
      <Navbar />

      <main className="flex-1 py-12 bg-ukire-gray">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-light mb-8 text-ukire-black">TENTANG KAMI</h1>

          <div className="bg-white p-8 shadow-sm rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4 text-ukire-black">Misi Kami</h2>
            <p className="text-ukire-text mb-4">
              UKIRE didirikan dengan misi untuk melestarikan dan memperkenalkan kekayaan seni ukir Indonesia kepada dunia. Kami berkomitmen untuk menyediakan produk furniture ukir berkualitas tinggi yang memadukan keindahan tradisional dengan fungsionalitas modern, langsung dari pengrajin lokal terbaik.
            </p>
            <p className="text-ukire-text">
              Kami percaya bahwa setiap ukiran memiliki cerita, dan kami berdedikasi untuk memastikan cerita itu terus hidup melalui setiap produk yang kami tawarkan.
            </p>
          </div>

          <div className="bg-white p-8 shadow-sm rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-6 text-ukire-black">Tim Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4">
                  <img
                    src={member.image || "https://placehold.co/120x120/E5E7EB/4B5563?text=Team"}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
                  />
                  <h3 className="font-medium text-lg text-ukire-black">{member.name}</h3>
                  <p className="text-sm text-ukire-text">{member.position}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm rounded-lg">
            <h2 className="text-xl font-medium mb-4 text-ukire-black">Visi Kami</h2>
            <p className="text-ukire-text">
              Menjadi platform e-commerce terkemuka untuk furniture ukir asli Indonesia, yang memberdayakan pengrajin lokal dan menjadi jembatan bagi pecinta seni di seluruh dunia untuk menemukan keindahan dan keunikan ukiran tangan.
            </p>
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
