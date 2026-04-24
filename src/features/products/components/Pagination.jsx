import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-32 flex justify-center items-center gap-12 font-label text-[11px] uppercase tracking-[0.3em]">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`transition-colors cursor-pointer ${currentPage === 1 ? 'text-on-surface-variant/20 cursor-not-allowed' : 'text-on-surface-variant/40 hover:text-primary'}`}
      >
        Previous
      </button>
      
      <div className="flex gap-8">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`transition-colors cursor-pointer pb-1 ${
              currentPage === page 
                ? 'text-primary border-b border-primary cursor-default font-bold' 
                : 'text-on-surface-variant/40 hover:text-primary'
            }`}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`transition-colors cursor-pointer ${currentPage === totalPages ? 'text-on-surface-variant/20 cursor-not-allowed' : 'hover:text-primary'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
