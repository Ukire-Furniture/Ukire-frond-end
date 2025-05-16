import React from 'react';

const BannerSection = () => {
    return (
        <section className="w-full bg-gray-100 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 h-[500px]">
            <div className="flex flex-col items-start justify-center flex-1">
                <h1 className="text-3xl md:text-5xl font-light mb-4">
                    DINING <span className="font-bold">CHAIRS</span>
                </h1>
                <a href="#" className="text-sm text-black underline">VIEW NOW</a>
            </div>
            <div className="flex justify-center flex-1">
                <img src="public/images/kayu/Kursi.png" alt="Chair" className="object-contain h-[300px] md:h-[400px]" />
            </div>
        </section>
    );
};

export default BannerSection;