import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { items, total, count, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = total;
  const tax = subtotal * 0.08; // Example 8% tax
  const finalTotal = subtotal + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="pt-16 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto min-h-screen">
      {/* Header */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-3xl font-semibold tracking-tight mb-2">Shopping Bag</h1>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-gray-500">
          {count} {count === 1 ? 'Item' : 'Items'} in your curation
        </p>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-t border-gray-100">
          <p className="text-xl text-gray-400 mb-8">Your shopping bag is currently empty.</p>
          <Link to="/" className="bg-black text-white px-10 py-4 text-xs font-label uppercase tracking-widest hover:bg-gray-800 transition-all">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Product List */}
          <div className="flex-1 space-y-12">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="group flex flex-col sm:flex-row gap-8 pb-12 border-b border-gray-100">
                <Link to={`/product/${item.id}`} className="w-full sm:w-48 aspect-3/4 overflow-hidden bg-gray-50 block">
                  <img 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={item.image} 
                  />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link to={`/product/${item.id}`} className="text-xl mb-1 uppercase tracking-tight font-medium hover:underline block">{item.name}</Link>
                      <p className="font-label text-[10px] tracking-widest uppercase text-secondary font-semibold">
                        {item.badge || 'Seasonal Archive'}
                      </p>
                    </div>
                    <span className="text-lg font-medium">{formatPrice(item.price)}</span>
                  </div>
                  <div className="space-y-1 mb-8">
                    <p className="text-sm text-gray-500 font-light">
                      <span className="text-black/40 uppercase tracking-tighter text-[10px] mr-2">Details</span> 
                      {item.variant}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 px-3 py-1 gap-4">
                      <button 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                        className="hover:text-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                        className="hover:text-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id, item.variant)}
                      className="font-label text-[10px] tracking-widest uppercase text-black/40 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-100">
            <div className="bg-gray-50 p-8 lg:p-10 sticky top-32">
              <h2 className="text-2xl mb-8 border-b border-gray-200 pb-6 uppercase font-medium tracking-tight">Order Summary</h2>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-gray-500">Subtotal</span>
                  <span className="text-lg font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-gray-500">Shipping</span>
                  <span className="text-sm uppercase tracking-tighter font-medium text-emerald-600">Complimentary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-gray-500">Estimated Tax</span>
                  <span className="text-sm font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                  <span className="font-label text-sm uppercase tracking-[0.3em] font-bold">Total</span>
                  <span className="text-3xl font-bold tracking-tighter">{formatPrice(finalTotal)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-black text-white py-5 px-6 font-label text-xs uppercase tracking-[0.25em] hover:bg-gray-800 transition-all duration-500 active:scale-[0.99] active:opacity-90">
                  Proceed to Checkout
                </button>
                <p className="text-center text-[10px] uppercase tracking-widest text-gray-400">Tax calculated at next step</p>
              </div>

              {/* Additional Context */}
              <div className="mt-12 space-y-6 pt-10 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest font-bold mb-1">Secure Transaction</p>
                    <p className="text-xs text-gray-500 font-light">Your data is protected by industry-standard encryption.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest font-bold mb-1">Premium Delivery</p>
                    <p className="text-xs text-gray-500 font-light">Complimentary express shipping on all curated orders.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
