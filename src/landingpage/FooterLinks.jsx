import React from 'react';

const FooterLinks = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm text-gray-600 pb-8">
            <div>
                <h4 className="font-bold mb-2">About</h4>
                <ul>
                    <li>News & Events</li>
                    <li>History</li>
                    <li>Our Studio</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-2">Customer</h4>
                <ul>
                    <li>Contact Us</li>
                    <li>Trade Service</li>
                    <li>FAQ</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-2">Furniture</h4>
                <ul>
                    <li>Tables</li>
                    <li>Chairs</li>
                    <li>Storage</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold mb-2">Accessories</h4>
                <ul>
                    <li>Lighting</li>
                    <li>Kitchen & Dining</li>
                    <li>Gift Shop</li>
                </ul>
            </div>
        </div>
    );
};

export default FooterLinks;