import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../cart/hooks/useCart';
import { useWishlist } from '../../../wishlist/hooks/useWishlist';

const ProductInfo = ({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange
}) => {
  const navigate = useNavigate();
  const { addItem, openDrawer, items: cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isInCart = cartItems.some(item => 
    item.id === product.id && 
    item.variant.includes(selectedColor?.name || product.color) &&
    item.variant.includes(selectedSize || 'Standard')
  );

  const handleAddToBag = () => {
    if (isInCart) {
      navigate('/cart');
      return;
    }
    addItem({
      ...product,
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedColor?.image || product.image,
      variant: `${selectedColor?.name || product.color} / Size ${selectedSize || 'Standard'}`,
      quantity: 1,
      badge: product.badge
    });
    openDrawer();
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const loved = isInWishlist(product.id);

  return (
    <div className="lg:col-span-12 relative flex flex-col md:flex-row gap-16">
      {/* Sticky component wrapper if needed, but for now matching the grid structure */}
      <div className="lg:col-span-5 relative">
        <div className="sticky top-40 space-y-10">
          <header className='mb-2'>
            <h1 className="text-3xl font-serif leading-tight tracking-tight mb-4 text-primary">
              {product.subdesc}
            </h1>
            <p className="text-2xl font-light text-secondary">{product.currency}{product.price?.toLocaleString()}</p>
          </header>

          <div className="space-y-6">

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-4 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface">
                  Color: {selectedColor?.name || product.color}
                </span>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => onColorChange(color)}
                      className={`w-8 h-8 rounded-full border p-0.5 transition-all ${selectedColor?.id === color.id ? 'border-primary' : 'border-transparent hover:border-outline'
                        }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-center max-w-sm">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface">Select Size</span>
                  <button className="text-[10px] uppercase tracking-widest underline underline-offset-4 opacity-60">Size Guide</button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => onSizeChange(size)}
                      className={`w-8 h-8 flex items-center justify-center border transition-all text-xs ${selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-outline-variant hover:border-primary'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendation */}
            {/* {product.aiRecommendation && (
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-3 max-w-sm border-l-2 border-secondary">
                <span className="material-symbols-outlined text-secondary text-sm">auto_awesome</span>
                <p className="text-[11px] leading-tight text-on-secondary-fixed-variant">
                  Our AI suggests <span className="font-bold">size {product.aiRecommendation.size}</span> {product.aiRecommendation.reason}
                </p>
              </div>
            )} */}
          </div>

          {/* Action Buttons */}
          {/* Action Buttons */}
<div className="pt-6 max-w-sm">
  <div className="flex flex-col sm:flex-row gap-3">
    <button
      onClick={handleAddToBag}
      className={`flex-1 min-h-[52px] px-6 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center ${
        isInCart
          ? 'bg-primary text-on-primary shadow-md'
          : 'bg-primary text-on-primary hover:opacity-90 hover:shadow-md'
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-[18px]">
          {isInCart ? 'shopping_bag' : 'add_shopping_cart'}
        </span>
        {isInCart ? 'Go to Cart' : 'Add to Bag'}
      </span>
    </button>

    <button
      onClick={handleWishlist}
      className={`flex-1 min-h-[52px] px-6 rounded-full border text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center ${
        loved
          ? 'bg-secondary border-secondary text-white shadow-sm'
          : 'border-outline-variant bg-white text-on-surface hover:border-primary hover:bg-surface-container-low'
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        <span className={`material-symbols-outlined text-[18px] ${loved ? 'fill-1' : ''}`}>
          favorite
        </span>
        {loved ? 'In Wishlist' : 'Wishlist'}
      </span>
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
