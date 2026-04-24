import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePrivacy } from '../store/wishlistSlice';

const WishlistHeader = () => {
  const dispatch = useDispatch();
  const { items, isPublic } = useSelector((state) => state.wishlist);

  return (
    <header className="px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10">
      <div>
        <h1 className="text-3xl md:text-3xl tracking-tighter text-primary mb-4 leading-none  font-light">
          Your Archive
        </h1>
        <p className="font-label text-sm uppercase tracking-[0.2em] text-on-surface-variant">
          {items.length.toString().padStart(2, '0')} Curated Items
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-6 bg-surface-container-low p-4 px-6 rounded-sm">
        <div className="flex items-center gap-3">
          <span className="font-label text-[10px] tracking-widest uppercase">Archive Privacy</span>
          <button 
            onClick={() => dispatch(togglePrivacy())}
            className={`w-10 h-5 relative rounded-full transition-colors ${isPublic ? 'bg-primary' : 'bg-outline-variant'}`}
          >
            <span className={`absolute top-1 bg-surface w-3 h-3 rounded-full transition-all ${isPublic ? 'right-1' : 'left-1'}`}></span>
          </button>
          <span className={`font-label text-[10px] tracking-widest uppercase font-bold transition-all ${isPublic ? 'text-primary' : 'text-on-surface-variant'}`}>
            {isPublic ? 'Public' : 'Private'}
          </span>
        </div>
        
        <div className="h-4 w-px bg-outline-variant/30 hidden md:block"></div>
        
      </div>
    </header>
  );
};

export default WishlistHeader;
