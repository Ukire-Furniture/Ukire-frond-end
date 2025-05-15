import React from 'react';

const ProductCategory = () => {
    return (
        <section className="px-8">
            <h2 className="text-lg font-semibold mb-6">KATEGORI PRODUK PILIHAN</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <img src="https://via.placeholder.com/200" alt="Product 1" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 2" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 3" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 4" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 5" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 6" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 7" className="object-cover w-full" />
                <img src="https://via.placeholder.com/200" alt="Product 8" className="object-cover w-full" />
            </div>
        </section>
    );
};

export default ProductCategory;