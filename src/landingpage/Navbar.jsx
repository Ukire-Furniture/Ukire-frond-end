import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
            <div className="flex items-center gap-4">
                <a href="#" className="text-2xl font-bold">UKIRE</a>
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="text-gray-700">Login</a>
                <a href="#" className="text-gray-700">Cart(0)</a>
            </div>
        </nav>
    );
};

export default Navbar;