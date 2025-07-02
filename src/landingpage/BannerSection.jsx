import React, { useRef, useState, useEffect } from 'react';

const banners = [
  {
    title: <>MEJA <span className="font-bold">MAKAN</span></>,
    img: "public/images/kayu/setmejamakan2.jpg",
    link: "#",
    
  },
  {
    title: <>SET <span className="font-bold">KURSI TAMU</span></>,
    img: "/images/kayu/Set-Kursi-Tamu1.jpg",
    link: "#",
  },
  {
    title: <>LEMARI <span className="font-bold">HIAS</span></>,
    img: "/images/kayu/Lemari-hias-jati1.webp",
    link: "#",
  },
];

const BannerSection = () => {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);
  const timerRef = useRef();

  // Auto-slide
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearTimeout(timerRef.current);
  }, [index]);

  // Swipe/drag handler
  const handlePointerDown = (e) => {
    clearTimeout(timerRef.current);
    startX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };

  const handlePointerUp = (e) => {
    if (startX.current === null) return;
    const endX = e.type === "touchend"
      ? (e.changedTouches[0]?.clientX ?? 0)
      : e.clientX;
    const diff = endX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) setIndex((prev) => (prev + 1) % banners.length);
      if (diff > 0) setIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
    startX.current = null;
  };

  return (
    <section
      className="w-full bg-ukire-gray flex flex-col md:flex-row items-center justify-between px-8 md:px-20 h-[500px] select-none overflow-hidden"
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      style={{ cursor: "grab" }}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out w-full h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-center justify-between flex-shrink-0 w-full"
            style={{ width: "100%" }}
          >
            <div className="flex flex-col items-start justify-center flex-1">
              <h1 className="text-3xl md:text-5xl font-light mb-4 text-ukire-black">{banner.title}</h1>
              <a href={banner.link} className="text-sm text-ukire-black underline">VIEW NOW</a>
            </div>
            <div className="flex justify-center flex-1">
              <img src={banner.img} alt="Banner" className="object-contain h-[300px] md:h-[400px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;
