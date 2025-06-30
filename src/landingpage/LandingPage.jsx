import Navbar from '../components/Navbar';
import { BannerSection, LogosSection, ProductCategory, NewsletterSection, FooterLinks } from '.';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <BannerSection />
        <ProductCategory />
        <NewsletterSection />
        <LogosSection />
        <FooterLinks />
        <div className="text-center text-gray-500 text-xs pb-4">
          &copy; 2025 UKIRE. All rights reserved.
        </div>
      </main>
    </div>
  );
}