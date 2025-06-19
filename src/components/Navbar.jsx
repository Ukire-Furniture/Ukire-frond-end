import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../main.jsx'; 
import { callApi } from '../utils/api.js'; 
import { ShoppingBag } from 'lucide-react'; 

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [userName, setUserName] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0); 
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
        <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white shadow-md rounded-b-lg">
            
            <div className="flex items-center space-x-6 text-sm">
                <Link to="/" className="text-gray-500 hover:text-black transition-colors font-medium">Beranda</Link>
                <Link to="/produk" className="text-gray-500 hover:text-black transition-colors">Produk</Link>
                <Link to="/pemesanan" className="text-gray-500 hover:text-black transition-colors">Pemesanan</Link>
                <Link to="/pembayaran" className="text-gray-500 hover:text-black transition-colors">Pembayaran</Link>
            </div>
            <div className="flex-1 flex justify-center">
                <Link to="/" className="flex items-center">
                    <div className="w-3 h-3 bg-black rotate-45 mr-1 rounded-sm"></div>
                    <span className="text-2xl font-bold">UKIRE</span>
                </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm">
                {loggedIn ? (
                    <>
                        <Link to="/profile" className="font-medium text-gray-700 hover:text-black transition-colors">
                            {userName || "Profil"}
                        </Link>
                        <button onClick={handleLogout} className="text-gray-700 hover:text-black transition-colors">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="text-gray-700 hover:text-black transition-colors">
                        Login
                    </Link>
                )}
                <Link to="/cart" className="flex items-center text-gray-700 hover:text-black transition-colors">
                    <ShoppingBag className="h-5 w-5 mr-1" />
                    <span>({cartItemCount})</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
