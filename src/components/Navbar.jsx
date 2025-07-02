import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../main.jsx';
import { callApi } from '../utils/api.js';
import { ShoppingBag, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [userName, setUserName] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0); 
    const [menuOpen, setMenuOpen] = useState(false); // Tambahkan state ini
    const navigate = useNavigate();

    const fetchCartCount = async (token) => {
      try {
        const response = await callApi("cart", "GET", null, token);
        const totalQuantity = response.data.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemCount(totalQuantity); 
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
        setCartItemCount(0);
      }
    };

    useEffect(() => {
        const checkUser = () => {
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
                        setUserName("User"); 
                    }
                } else {
                    fetchUserData(token); 
                }
                fetchCartCount(token); 
            } else {
                setLoggedIn(false);
                setUserName('');
                setCartItemCount(0); 
            }
        };

        const fetchUserData = async (token) => {
            try {
                const response = await callApi("user", "GET", null, token);
                localStorage.setItem("user", JSON.stringify(response.user));
                setUserName(response.user.name);
            } catch (error) {
                console.error("Failed to fetch user data for Navbar:", error);
                handleLogout(false); 
            }
        };

        checkUser();
        window.addEventListener('storage', checkUser); 
        return () => {
            window.removeEventListener('storage', checkUser);
        };
    }, []);

    const handleLogout = async (showAlert = true) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                await callApi("logout", "POST", null, token);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setLoggedIn(false);
                setUserName('');
                setCartItemCount(0);
                if (showAlert) alert("Anda telah berhasil logout.");
                window.location.href = '/login'; 
            } catch (error) {
                console.error("Logout failed:", error);
                if (showAlert) alert("Gagal logout. Silakan coba lagi.");
            }
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            setLoggedIn(false);
            setUserName('');
            setCartItemCount(0);
            if (showAlert) alert("Sesi Anda sudah berakhir.");
            window.location.href = '/login';
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md rounded-b-lg">
            <div className="flex justify-between items-center px-8 py-4">
                {/* Logo */}
                <div className="flex-1 flex justify-center md:justify-start">
                    <Link to="/" className="flex items-center">
                        <img src="/images/ukire.png" alt="UKIRE Logo" className="w-8 h-8 mr-1 object-contain" />
                        <span className="text-2xl font-bold text-black">UKIRE</span>
                    </Link>
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Menu Desktop */}
                <div className="hidden md:flex items-center space-x-6 text-sm">
                    <Link to="/" className="text-gray-500 hover:text-black font-medium">Beranda</Link>
                    <Link to="/produk" className="text-gray-500 hover:text-black">Produk</Link>
                    <Link to="/pemesanan" className="text-gray-500 hover:text-black">Pemesanan</Link>
                    <Link to="/pembayaran" className="text-gray-500 hover:text-black">Pembayaran</Link>
                    {loggedIn ? (
                        <>
                            <Link to="/profile" className="font-medium text-gray-700 hover:text-black">{userName || "Profil"}</Link>
                            <button onClick={handleLogout} className="text-gray-700 hover:text-black">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-gray-700 hover:text-black">Login</Link>
                    )}
                    <Link to="/cart" className="flex items-center text-gray-700 hover:text-black">
                        <ShoppingBag className="h-5 w-5 mr-1" />
                        <span>({cartItemCount})</span>
                    </Link>
                </div>
            </div>

            {/* Menu Mobile */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t px-8 pb-4 space-y-2">
                    <Link to="/" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>Beranda</Link>
                    <Link to="/produk" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>Produk</Link>
                    <Link to="/pemesanan" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>Pemesanan</Link>
                    <Link to="/pembayaran" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>Pembayaran</Link>
                    {loggedIn ? (
                        <>
                            <Link to="/profile" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>{userName || "Profil"}</Link>
                            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block py-2 text-gray-700 hover:text-black w-full text-left">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="block py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>Login</Link>
                    )}
                    <Link to="/cart" className="flex items-center py-2 text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>
                        <ShoppingBag className="h-5 w-5 mr-1" />
                        <span>({cartItemCount})</span>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
