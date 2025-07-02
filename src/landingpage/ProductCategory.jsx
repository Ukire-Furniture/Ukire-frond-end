import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan Link diimpor jika digunakan

const ProductCategory = () => {
    // Anda bisa membuat array objek untuk kategori jika ingin lebih dinamis
    const categoriesData = [
        { name: 'Pintu Gebyok', img: 'public/images/kayu/pintugebyok1.webp', link: '/produk?category=pintu' }, // GANTI PATH GAMBAR
        { name: 'Lemari', img: 'public/images/kayu/Lemari-hias-jati1.webp', link: '/produk?category=lemari' }, // GANTI PATH GAMBAR
        { name: 'Kursi Tamu', img: 'public/images/kayu/setkursitamu2.webp', link: '/produk?category=meja' },   // GANTI PATH GAMBAR
        { name: 'Pintu', img: 'public/images/kayu/Pintu-Kayu-Jati-3.webp', link: '/produk?category=pintu' }, // GANTI PATH GAMBAR
        { name: 'Lemari Hias', img: 'public/images/kayu/Lemari-hias-jati3.webp', link: '/produk?category=lemari' }, // GANTI PATH GAMBAR
        { name: 'Set Meja Makan', img: 'public/images/kayu/setmejamakan1.jpg', link: '/produk?category=meja' },   // GANTI PATH GAMBAR
        { name: 'Pilar Naga', img: 'public/images/kayu/pilarnaga.jpg', link: '/produk?category=pilar' }, // GANTI PATH GAMBAR
        { name: 'Tiang Ukir', img: 'public/images/kayu/tiangukir2.jpg', link: '/produk?category=pilar' }, // GANTI PATH GAMBAR
    ];

    return (
        <section className="px-8 py-16 bg-white">
            <h2 className="text-3xl font-semibold mb-6 text-ukire-black text-center">KATEGORI PRODUK PILIHAN</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categoriesData.map((cat, index) => (
                    <Link to={cat.link} key={index} className="group block"> {/* Tambahkan group block */}
                        <div className="mb-4 aspect-square overflow-hidden bg-ukire-gray rounded-lg shadow-md"> {/* Container gambar */}
                            <img 
                                src={cat.img} 
                                alt={cat.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" // Kelas gambar
                            />
                        </div>
                        <h3 className="text-base font-medium text-ukire-black text-center">{cat.name}</h3> {/* Teks di bawah gambar */}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductCategory;
