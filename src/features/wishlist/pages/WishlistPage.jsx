import React from 'react';
import { useSelector } from 'react-redux';
import WishlistHeader from '../components/WishlistHeader';
import WishlistItem from '../components/WishlistItem';
import CuratedForYou from '../components/CuratedForYou';

const WishlistPage = () => {
  const { items } = useSelector((state) => state.wishlist);

  return (
    <main className="bg-surface">
      <WishlistHeader />
      
      {/* Product Grid */}
      <section className="px-4 sm:px-8 md:px-12 mb-16 md:mb-32">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {items.map((item, index) => (
              <WishlistItem key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <h2 className="text-3xl font-serif italic text-on-surface-variant mb-6">Your archive is currently empty</h2>
            <p className="font-label text-xs uppercase tracking-widest opacity-60">Collect the pieces that inspire you</p>
          </div>
        )}
      </section>
      
      <CuratedForYou />
    </main>
  );
};

export default WishlistPage;
