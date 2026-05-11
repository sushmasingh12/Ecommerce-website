const ProductsEmptyState = ({ onClear }) => {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-4xl text-outline">inventory_2</span>
      </div>
      <h3 className="text-xl font-bold text-on-surface">No products found</h3>
      <p className="text-on-surface-variant max-w-xs mt-2">
        We couldn't find any items matching your current filters. Try adjusting your search.
      </p>
      <button
        onClick={onClear}
        className="mt-6 text-primary font-bold hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default ProductsEmptyState