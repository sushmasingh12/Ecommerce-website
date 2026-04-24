import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';

const WishlistItem = ({ item, index }) => {
  const { removeItem, moveToBag } = useWishlist();

  // Every second item on desktop gets a top margin to create the asymmetric look from the HTML
  const isOffset = index % 2 !== 0;

  return (
    <div className={`group ${isOffset ? 'md:mt-12' : ''}`}>
      <Link to={`/product/${item.id}`} className="block relative overflow-hidden aspect-[3/4] mb-6 bg-surface-container-lowest">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src={item.image} 
          alt={item.alt}
        />
        <button 
          onClick={(e) => { e.preventDefault(); removeItem(item.id); }}
          className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </Link>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-label font-bold text-xs uppercase tracking-wider mb-1">{item.name}</h3>
          <p className="font-serif italic text-sm text-on-surface-variant">{item.brand}</p>
        </div>
        <p className="font-label text-xs tracking-wider">{item.price}</p>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={() => moveToBag(item.id)}
          className="flex-1 py-3 bg-primary text-on-primary font-label text-[10px] tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
        >
          Move to Bag
        </button>
        <button 
          onClick={() => removeItem(item.id)}
          className="px-4 py-3 border border-outline-variant/20 font-label text-[10px] tracking-[0.2em] uppercase hover:bg-surface-container-high transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
