import React from 'react';

const ProductAccordions = ({ product }) => {
  if (!product) return null;

  return (
    <div className="pt-8 space-y-6 max-w-sm divide-y divide-outline-variant/30">
      {/* Product Details & Highlights */}
      <details className="group pt-6" open>
        <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] uppercase tracking-[0.2em] font-bold">
          Product Details
          <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
        </summary>
        <div className="pt-4 text-xs leading-relaxed text-on-surface-variant space-y-4">
          <p>{product.description}</p>
          {product.highlights && (
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider text-[10px]">Highlights</p>
              <ul className="list-disc pl-4 space-y-1">
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>

      {/* Specifications */}
      {product.specifications && (
        <details className="group pt-6">
          <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] uppercase tracking-[0.2em] font-bold">
            Specifications
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="pt-4 grid grid-cols-2 gap-y-4 gap-x-2 text-[11px]">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-on-surface-variant/60 uppercase tracking-tighter text-[9px]">{key}</p>
                <p className="font-medium text-on-surface">{value}</p>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Composition & Care */}
      {product.composition && (
        <details className="group pt-6">
          <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] uppercase tracking-[0.2em] font-bold">
            Composition & Care
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="pt-4 text-xs leading-relaxed text-on-surface-variant space-y-2">
            {product.composition.outer && <p><span className="font-medium">Outer:</span> {product.composition.outer}</p>}
            {product.composition.lining && <p><span className="font-medium">Lining:</span> {product.composition.lining}</p>}
            {product.composition.care && <p>{product.composition.care}</p>}
          </div>
        </details>
      )}

      {/* Shipping & Returns */}
      {(product.shippingDetails || product.shipping) && (
        <details className="group pt-6">
          <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] uppercase tracking-[0.2em] font-bold">
            Shipping & Returns
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="pt-4 text-xs leading-relaxed text-on-surface-variant space-y-3">
            {product.shippingDetails ? (
              <>
                <div className="space-y-1">
                  <p className="font-bold text-[10px] uppercase">Delivery</p>
                  <p>{product.shippingDetails.delivery}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-[10px] uppercase">Returns</p>
                  <p>{product.shippingDetails.returns}</p>
                </div>
                {product.shippingDetails.warranty && (
                  <div className="space-y-1">
                    <p className="font-bold text-[10px] uppercase">Warranty</p>
                    <p>{product.shippingDetails.warranty}</p>
                  </div>
                )}
              </>
            ) : (
              <p>{product.shipping}</p>
            )}
          </div>
        </details>
      )}

      {/* Ratings & Reviews Breakdown */}
      {product.ratingBreakdown && (
        <details className="group pt-6">
          <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] uppercase tracking-[0.2em] font-bold">
            Rating Breakdown
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="pt-4 space-y-2">
            {Object.entries(product.ratingBreakdown).reverse().map(([stars, percentage]) => (
              <div key={stars} className="flex items-center gap-3 text-[10px]">
                <span className="w-2">{stars}</span>
                <span className="material-symbols-outlined text-[12px]">star</span>
                <div className="flex-1 h-1 bg-outline-variant/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-on-surface-variant">{percentage}%</span>
              </div>
            ))}
          </div>
        </details>
      )}

      {product.artisanNote && (
        <details className="group pt-6">
          <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] uppercase tracking-[0.2em] font-bold">
            The Artisan's Note
            <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
          </summary>
          <div className="pt-4 text-xs  font-serif leading-relaxed text-on-surface-variant">
            {product.artisanNote}
          </div>
        </details>
      )}
    </div>
  );
};

export default ProductAccordions;
