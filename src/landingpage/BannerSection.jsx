import React, { useState, useEffect, useRef } from 'react';

const banners = [
  {
    title: "DINING CHAIRS",
    image: "/images/kayu/Kursi.png",
    link: "#",
    highlight: "CHAIRS",
    description: "Kursi makan ukir elegan untuk ruang makan modern.",
  },
  {
    title: "LUXURY TABLES",
    image: "/images/nibras.jpg",
    link: "#",
    highlight: "TABLES",
    description: "Meja ukir premium, kuat dan menawan.",
  },
  {
    title: "CLASSIC SOFAS",
    image: "/images/awal.jpeg",
    link: "#",
    highlight: "SOFAS",
    description: "Sofa ukir klasik, nyaman untuk keluarga.",
  },
];

const BannerSection = () => {
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const bannerRef = useRef(null);

  // Auto-slide setiap 4 detik (pause saat drag)
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isDragging]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  // Mouse/touch event handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    setDragDelta(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragDelta > 80) {
      prevSlide();
    } else if (dragDelta < -80) {
      nextSlide();
    }
    setDragDelta(0);
  };

  // Animasi interaktif saat drag
  const slideStyle = {
    transform: `translateX(${dragDelta}px) scale(${isDragging ? 0.98 : 1})`,
    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(.4,2,.6,1)',
    cursor: isDragging ? 'grabbing' : 'grab',
    boxShadow: isDragging ? '0 8px 32px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.08)',
    userSelect: 'none',
  };

  return (
    <section
      className="w-full bg-gray-100 flex flex-col md:flex-row items-center justify-between px-8 md:px-20 h-[500px] relative overflow-hidden select-none"
      ref={bannerRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={() => isDragging && handleDragEnd()}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Tombol kiri */}
      <button
        onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
        aria-label="Previous"
        tabIndex={0}
      >
        <span className="text-2xl">&#8592;</span>
      </button>
      {/* Tombol kanan */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
        aria-label="Next"
        tabIndex={0}
      >
        <span className="text-2xl">&#8594;</span>
      </button>

      {/* Konten Banner */}
      <div
        className="flex flex-col items-start justify-center flex-1 transition-all duration-500"
        style={slideStyle}
        draggable={false}
      >
        <h1 className="text-3xl md:text-5xl font-light mb-4">
          {banners[current].title.split(' ').map((word, idx) =>
            word === banners[current].highlight ? (
              <span key={idx} className="font-bold">{word} </span>
            ) : (
              <span key={idx}>{word} </span>
            )
          )}
        </h1>
        <p className="mb-4 text-gray-600">{banners[current].description}</p>
        <a href={banners[current].link} className="text-sm text-black underline">VIEW NOW</a>
      </div>
      <div className="flex justify-center flex-1" style={slideStyle}>
        <img
          src={banners[current].image}
          alt={banners[current].highlight}
          className="object-contain h-[300px] md:h-[400px] transition-all duration-500"
          draggable={false}
        />
      </div>
      {/* Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${current === idx ? 'bg-black' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSection;