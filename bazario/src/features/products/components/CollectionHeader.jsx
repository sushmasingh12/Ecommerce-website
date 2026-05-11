import React from 'react';

const CollectionHeader = ({ totalProducts = 0 }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-outline-variant pb-6">
      <div className="flex items-center gap-4">
        <span className="text-[10px] md:text-sm font-label uppercase tracking-widest text-on-surface-variant/60">
          Showing {totalProducts} items
        </span>
      </div>
      
      <div className="flex items-center gap-8">
        

        <div className="flex items-center gap-4 text-[10px] md:text-sm font-label uppercase tracking-widest px-1">
          <span className="text-on-surface-variant/60 text-[10px]">Sort by</span>
          <button className="flex items-center gap-2 font-semibold hover:text-secondary transition-colors uppercase tracking-widest">
            New Arrivals
            <span className="material-symbols-outlined text-xs">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionHeader;
