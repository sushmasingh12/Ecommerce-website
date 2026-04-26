import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import CollectionHeader from '../components/CollectionHeader';
import CategoryHero from '../components/CategoryHero';
import ProductCard from '../components/ProductCard';
import ProductFilterSidebar from '../components/ProductFilterSidebar';
import Pagination from '../components/Pagination';
import { Helmet } from 'react-helmet-async';

const PRODUCTS_PER_PAGE = 9;

const ProductsPage = ({ category: propCategory }) => {
  const { category: paramCategory, sub } = useParams();
  const category = propCategory || paramCategory || 'women';
  const displayTitle = sub 
    ? `${sub.charAt(0).toUpperCase() + sub.slice(1)} | Bazario`
    : `${category.charAt(0).toUpperCase() + category.slice(1)} Collection | Bazario`;
  const isSpecialCategory = category === 'collections' || category === 'new-arrivals';
  const { collection, isLoading, error } = useProducts(category, sub);
  const { filters } = useSelector((state) => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page and scroll to top when category or subcategory changes
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, sub]);

  // Reset to first page when filters change (don't scroll to top for better UX)
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredProducts = useMemo(() => {
    return collection.products.filter(product => {
      // 1. Price Filter
      if (product.price > filters.priceRange[1]) return false;

      // 2. Size Filter
      if (filters.sizes.length > 0 && !product.sizes?.some(s => filters.sizes.includes(s))) return false;

      // 3. Material Filter
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) return false;

      // 4. Color Filter
      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;

      // 5. Occasion Filter
      if (filters.occasions.length > 0 && !filters.occasions.includes(product.occasion)) return false;

      // 6. Rating Filter
      if (filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        if (product.rating < minRating) return false;
      }

      // 7. Availability Filter
      if (filters.availability === 'inStock' && !product.inStock) return false;

      return true;
    });
  }, [collection.products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500 font-medium tracking-widest uppercase text-xs">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <Helmet>
        <title>{displayTitle}</title>
        <meta name="description" content={`Explore the finest ${sub || category} selection at Bazario. Premium quality and timeless designs.`} />
      </Helmet>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Hero Carousel Section */}
      {!isLoading && !isSpecialCategory && <CategoryHero category={category} />}

      <div className="px-6 md:px-12 pb-40 mt-12 md:mt-20">
        <CollectionHeader 
          totalProducts={filteredProducts.length} 
        />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {!isSpecialCategory && <ProductFilterSidebar category={category} />}
          
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-20 gap-x-6 md:gap-x-8">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-40 text-center">
                   <p className="font-serif text-xl text-on-surface/50">No pieces match your current filters.</p>
                   <button 
                     onClick={() => window.location.reload()}
                     className="mt-6 text-xs uppercase tracking-widest text-primary hover:underline"
                   >
                     Clear all filters
                   </button>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
