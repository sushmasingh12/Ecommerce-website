import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../products/components/ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              New Arrivals
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Fresh products added today</p>
          </div>
          <Link to="/new-arrivals" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
