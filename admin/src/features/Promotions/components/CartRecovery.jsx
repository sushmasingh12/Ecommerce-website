// src/features/Promotions/components/CartRecovery.jsx

const CartRecovery = ({ cartRecovery, enabled, onEnable }) => {
  if (!cartRecovery) return null;

  return (
    <div className="bg-secondary-container text-on-secondary-container rounded-xl p-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary">shopping_cart_checkout</span>
          <h4 className="text-sm font-bold">Cart Recovery</h4>
        </div>
        <p className="text-xs mb-4 leading-relaxed opacity-80">
          There are currently{" "}
          <span className="font-bold">{cartRecovery.abandonedCount} abandoned carts</span> in the
          last 24h. AI suggests a {cartRecovery.discountSuggestion} discount to recover{" "}
          {cartRecovery.estimatedRevenue}.
        </p>
        <button
          onClick={onEnable}
          disabled={enabled}
          className={`w-full py-2 rounded-lg text-xs font-bold transition-opacity ${
            enabled
              ? "bg-green-600 text-white opacity-90 cursor-default"
              : "bg-on-secondary-container text-white hover:opacity-90"
          }`}
        >
          {enabled ? "Auto-Recovery Active ✓" : "Enable Auto-Recovery"}
        </button>
      </div>
      <div className="absolute -right-6 -bottom-6 text-primary/10 select-none pointer-events-none">
        <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
      </div>
    </div>
  );
};

export default CartRecovery;