import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/hooks/useCart';
import { useWishlist } from '../../wishlist/hooks/useWishlist';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem, items: cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) { navigate('/cart'); return; }
    addItem({ ...product, quantity: 1, variant: product.color || 'Default' });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const loved = isInWishlist(product.id);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const discountedPrice = Math.round(product.price * 0.7);
  const discountPct = 30;

  return (
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-50">
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        <img
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? 'opacity-50' : ''}`}
          alt={product.alt || product.name}
          src={product.image}
          loading="lazy"
        />
        {/* Discount badge */}
        <div className="absolute top-2 left-2 bg-[tertiary] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          -{discountPct}%
        </div>
        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={loved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            loved ? 'bg-[tertiary] text-white' : 'bg-white text-gray-400 hover:text-[tertiary]'
          }`}
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: loved ? "'FILL' 1" : "'FILL' 0" }}>
            favorite
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 mb-1.5">{product.name}</h4>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5 bg-[#00A651] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <span className="text-[10px] text-gray-400">(240)</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-gray-900">{formatPrice(discountedPrice)}</span>
          <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</span>
          <span className="text-xs text-[tertiary] font-semibold">{discountPct}% off</span>
        </div>

        {/* Free delivery tag */}
        <p className="text-[10px] text-[#00A651] font-medium mt-1">✓ Free Delivery</p>

        {/* Add to cart button */}
        {product.inStock && (
          <button
            onClick={handleAddToCart}
            className={`mt-2.5 w-full py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
              isInCart
                ? 'bg-secondary text-primary hover:bg-secondary-container'
                : 'bg-primary text-white hover:bg-primary-container'
            }`}
          >
            {isInCart ? '🛒 Go to Cart' : '+ Add to Cart'}
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
