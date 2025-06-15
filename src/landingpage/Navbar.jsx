import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../main.jsx'; // Impor fungsi isLoggedIn dari main.jsx
import { callApi } from '../utils/api.js'; // Impor callApi

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Periksa status login saat komponen di-mount atau saat localStorage berubah
        const checkLoginStatus = () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                setLoggedIn(true);
                const userData = localStorage.getItem("user");
                if (userData) {
                    try {
                        const user = JSON.parse(userData);
                        setUserName(user.name);
                    } catch (e) {
                        console.error("Failed to parse user data from localStorage", e);
                        setUserName("User"); // Default jika parsing gagal
                    }
                }
            } else {
                setLoggedIn(false);
                setUserName('');
            }
        };

        checkLoginStatus(); // Cek status saat pertama kali render

        // Tambahkan event listener untuk mendengarkan perubahan localStorage
        window.addEventListener('storage', checkLoginStatus); // Untuk mendengarkan perubahan dari tab/window lain

        // Cleanup listener
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                await callApi("logout", "POST", null, token);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setLoggedIn(false);
                setUserName('');
                window.location.href = '/login'; // Refresh halaman untuk memastikan status login terupdate
            } catch (error) {
                console.error("Logout failed:", error);
                // Handle error logout, mungkin tampilkan pesan ke user
                alert("Gagal logout. Silakan coba lagi."); // Menggunakan alert sementara, ganti dengan modal UI
            }
        }
    };

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow-md rounded-b-lg">
            <div className="flex items-center space-x-6 text-sm">
                <Link to="/" className="text-gray-500 hover:text-black transition-colors">Home</Link>
                <Link to="/produk" className="text-gray-500 hover:text-black transition-colors">Produk</Link>
                <Link to="/pemesanan" className="text-gray-500 hover:text-black transition-colors">Pemesanan</Link>
                <Link to="/pembayaran" className="text-gray-500 hover:text-black transition-colors">Pembayaran</Link>
            </div>
            <div className="flex-1 flex justify-center">
                <Link to="/" className="flex items-center">
                    <div className="w-3 h-3 bg-black rotate-45 mr-1 rounded-sm"></div>
                    <span className="text-2xl font-bold text-gray-800">UKIRE</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
                {loggedIn ? (
                    <>
                        <Link to="/profile" className="font-medium text-gray-800 hover:text-amber-600 transition-colors">
                            {userName || "Profil"}
                        </Link>
                        <button onClick={handleLogout} className="text-gray-700 hover:text-black transition-colors bg-gray-100 px-3 py-1 rounded-md">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="text-gray-700 hover:text-black transition-colors bg-gray-100 px-3 py-1 rounded-md">
                        Login
                    </Link>
                )}
                <Link to="/cart" className="flex items-center text-gray-700 hover:text-black transition-colors">
                    <span>Cart(0)</span> {/* Akan diupdate nanti */}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
