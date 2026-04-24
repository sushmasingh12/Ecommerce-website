import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { items, total, count, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = total;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="pt-16 pb-16 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto min-h-screen bg-white">
      {/* Header */}
      <header className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-3xl font-semibold tracking-tight mb-2">
          Shopping Bag
        </h1>

        <p className="font-label text-xs uppercase tracking-[0.2em] text-gray-500">
          {count} {count === 1 ? "Item" : "Items"} in your curation
        </p>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-t border-gray-100">
          <p className="text-xl text-gray-400 mb-8 text-center">
            Your shopping bag is currently empty.
          </p>

          <Link
            to="/"
            className="bg-black text-white px-10 py-4 text-xs font-label uppercase tracking-widest hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Product List */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.variant}`}
                className="bg-white border border-gray-200 shadow-sm"
              >
                {/* Product Info */}
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Image + Quantity */}
                  <div className="w-full sm:w-30 shrink-0">
                    <Link
                      to={`/product/${item.id}`}
                      className="w-full sm:w-30 h-45 sm:h-30 border border-gray-200 rounded overflow-hidden bg-gray-50 flex items-center justify-center"
                    >
                      <img
                        alt={item.name}
                        src={item.image}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="mt-4 w-full sm:w-28">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            item.variant,
                            Number(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 rounded-sm px-2 py-2 text-sm bg-white focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5].map((qty) => (
                          <option key={qty} value={qty}>
                            Qty: {qty}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg md:text-xl font-medium text-black hover:text-blue-600 block leading-snug"
                    >
                      {item.name}
                    </Link>

                    <p className="text-sm text-gray-500 mt-2">
                      Size: {item.variant || "S"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-4 text-sm flex-wrap">
                      <div className="flex items-center text-green-600 text-lg leading-none">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span className="text-gray-300">★</span>
                      </div>

                      <span className="text-green-700 font-medium">3.7</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 font-semibold">
                        (45,869)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-5 flex-wrap">
                      <span className="text-green-600 font-bold text-xl">
                        ↓78%
                      </span>

                      <span className="text-gray-500 line-through text-lg">
                        {formatPrice(item.originalPrice || item.price * 4)}
                      </span>

                      <span className="text-2xl font-bold text-black">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <div className="mt-2 text-blue-700 text-sm font-medium">
                      <span className="bg-blue-700 text-white px-1 italic font-bold mr-2">
                        WOW!
                      </span>
                      Buy at {formatPrice(Math.max(item.price - 50, 0))}
                    </div>

                    <p className="mt-6 text-sm md:text-base text-black">
                      Delivery by Thu Apr 30
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-gray-200">
                 

                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.variant)}
                    className="flex items-center justify-center gap-2 py-4 text-gray-600 font-semibold sm:border-l border-t sm:border-t-0 border-gray-200 hover:text-red-500 hover:bg-gray-50 transition"
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                    Remove
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="flex items-center justify-center gap-2 py-4 text-gray-600 font-semibold sm:border-l border-t sm:border-t-0 border-gray-200 hover:text-black hover:bg-gray-50 transition"
                  >
                    <span className="material-symbols-outlined text-lg">
                      bolt
                    </span>
                    Buy this now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-100">
            <div className="bg-gray-50 p-6 sm:p-8 lg:p-10 sticky top-32">
              <h2 className="text-2xl mb-8 border-b border-gray-200 pb-6 uppercase font-medium tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-lg font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-gray-500">
                    Shipping
                  </span>
                  <span className="text-sm uppercase tracking-tighter font-medium text-emerald-600">
                    Complimentary
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-label text-xs uppercase tracking-widest text-gray-500">
                    Estimated Tax
                  </span>
                  <span className="text-sm font-medium">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                  <span className="font-label text-sm uppercase tracking-[0.3em] font-bold">
                    Total
                  </span>
                  <span className="text-3xl font-bold tracking-tighter">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-black text-white py-5 px-6 font-label text-xs uppercase tracking-[0.25em] hover:bg-gray-800 transition-all duration-500 active:scale-[0.99] active:opacity-90"
                >
                  Proceed to Checkout
                </button>

                <p className="text-center text-[10px] uppercase tracking-widest text-gray-400">
                  Tax calculated at next step
                </p>
              </div>

              {/* Additional Context */}
              <div className="mt-12 space-y-6 pt-10 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">
                    verified_user
                  </span>

                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest font-bold mb-1">
                      Secure Transaction
                    </p>
                    <p className="text-xs text-gray-500 font-light">
                      Your data is protected by industry-standard encryption.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary">
                    local_shipping
                  </span>

                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest font-bold mb-1">
                      Premium Delivery
                    </p>
                    <p className="text-xs text-gray-500 font-light">
                      Complimentary express shipping on all curated orders.
                    </p>
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