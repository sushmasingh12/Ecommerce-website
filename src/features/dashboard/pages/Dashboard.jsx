import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import Hero from '../components/Hero';
import CategoryBento from '../components/CategoryBento';
import ProductGrid from '../components/ProductGrid';
import TrendingShowcase from '../components/TrendingShowcase';
// import AiAssistant from '../components/AiAssistant';
import BrandPhilosophy from '../components/BrandPhilosophy';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const { products, categories, isLoading, error } = useDashboard();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <Helmet>
        <title>Bazario | Premium E-commerce Destination</title>
        <meta name="description" content="Shop the latest trends in fashion and accessories at Bazario. Discover curated collections for men and women." />
      </Helmet>
      {/* Loading overlay for data transitions */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Landing Section */}
      <Hero />

      {/* Featured Categories */}
      <CategoryBento categories={categories} />

      {/* New Arrivals */}
      <ProductGrid products={products} />

      {/* Trending Editorial */}
      <TrendingShowcase />

      {/* AI Assistant Promotional */}
      {/* <AiAssistant /> */}

      {/* Brand Heritage */}
      <BrandPhilosophy />

      {/* Testimonials */}
      <Testimonials />

      {/* Subscription */}
      <Newsletter />
    </main>
  );
};

export default Dashboard;
