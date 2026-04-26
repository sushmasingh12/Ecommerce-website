import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../data/products';

// Helper to get N random unique products excluding current
const getRandomProducts = (excludeId, count) => {
  const all = getAllProducts();
  const pool = all.filter((p) => p.id !== excludeId && p.inStock);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const formatPrice = (price, currency = '₹') =>
  `${currency}${new Intl.NumberFormat('en-IN').format(price)}`;

const WardrobeCard = ({ product }) => (
  <Link
    to={`/product/${product.id}`}
    className="
      group shrink-0 snap-start
      w-[72%]
      sm:w-[48%]
      md:w-[31%]
      lg:w-[27.5%]
      xl:w-[26%]
      2xl:w-[24%]
      max-w-[320px]
    "
  >
    <div className="aspect-3/4 overflow-hidden bg-surface-container mb-4 md:mb-6">
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        alt={product.alt || product.name}
        src={product.image}
      />
    </div>
    <h3 className="text-xs font-bold uppercase tracking-widest mb-1 line-clamp-1">
      {product.name}
    </h3>
    <p className="text-sm font-serif  text-secondary">
      {formatPrice(product.price)}
    </p>
  </Link>
);

const RelatedGridItem = ({ product }) => (
  <Link to={`/product/${product.id}`} className="group">
    <div className="aspect-3/4 overflow-hidden bg-surface-container mb-3 md:mb-4">
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        alt={product.alt || product.name}
        src={product.image}
      />
    </div>
    <h4 className="text-[10px] uppercase tracking-widest font-bold line-clamp-1">
      {product.name}
    </h4>
    <p className="text-xs font-serif  text-secondary">
      {formatPrice(product.price)}
    </p>
  </Link>
);

const RelatedProducts = ({ wardrobe, related, currentProductId }) => {
  const wardrobeItems = useMemo(() => {
    if (wardrobe && wardrobe.length > 0) return wardrobe;
    return getRandomProducts(currentProductId, 6);
  }, [wardrobe, currentProductId]);

  const relatedItems = useMemo(() => {
    if (related && related.length > 0) return related;
    return getRandomProducts(currentProductId, 4);
  }, [related, currentProductId]);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -(scrollRef.current.offsetWidth * 0.8),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: scrollRef.current.offsetWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Complete the Wardrobe */}
      <section className="mt-16 px-4 sm:px-8 md:px-12">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 md:mb-16 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-3 block">
              Styled for you
            </span>
            <h2 className="text-2xl md:text-4xl font-serif tracking-tight">
              Complete the Wardrobe
            </h2>
          </div>

          <div className="hidden md:flex gap-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </header>

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 md:pb-12 snap-x snap-mandatory scrollbar-hide"
        >
          {wardrobeItems.map((item) => (
            <WardrobeCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Related Silhouettes */}
      <section className="mt-24 md:mt-48 px-4 sm:px-8 md:px-12 mb-16 md:mb-24">
        <h2 className="text-xs uppercase tracking-[0.4em] mb-8 md:mb-16 opacity-50">
          Related Silhouettes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {relatedItems.map((item) => (
            <RelatedGridItem key={item.id} product={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RelatedProducts;