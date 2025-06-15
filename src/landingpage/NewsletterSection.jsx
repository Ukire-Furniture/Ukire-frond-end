import React from 'react';

const NewsletterSection = () => {
    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 mt-12">
            <h2 className="text-xl font-bold mb-2">KEEP UPDATED</h2>
            <p className="text-gray-600 mb-4 text-center">
                Sign up for our newsletter to receive updates on exclusive offers.
            </p>
            <form action="#" className="flex">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="border p-2 rounded-l-md"
                />
                <button type="submit" className="bg-black text-white px-4 rounded-r-md">
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsletterSection;