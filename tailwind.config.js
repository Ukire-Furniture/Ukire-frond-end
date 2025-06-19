/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Hapus dark mode di sini
  // darkMode: 'class', 
  theme: {
    extend: {
      // Definisi warna UKIRE (akan digunakan oleh kelas Tailwind)
      colors: {
        'ukire-black': '#1a1a1a', // Hitam dasar
        'ukire-amber': '#fbbf24', // Amber aksen
        'ukire-gray': '#f3f4f6',  // Abu-abu background default
        'ukire-text': '#374151',  // Warna teks default
      },
      // Menambahkan transisi untuk efek hover sederhana
      transitionProperty: {
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
      // Hapus animasi blob dari sini
    },
  },
  // Ini penting untuk Tailwind CSS v4.x agar CSS-nya tergenerate
  experimental: {
    css: true,
  },
  plugins: [],
}
