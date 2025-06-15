import {
  BannerSection,
  FooterLinks,
  LogosSection,
  Navbar,
  NewsletterSection,
  ProductCategory,
} from './landingpage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
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

export default App;