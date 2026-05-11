const ProductsFilters = ({ filters, onSearch, onCategory, onStatus }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      {/* Search */}
      <div className="sm:col-span-2 lg:col-span-3 bg-surface-container-lowest p-1 rounded-xl shadow-sm border border-outline-variant/15 min-w-0">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search product name, SKU, or category..."
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 outline-none text-sm"
          />
        </div>
      </div>

      {/* Category */}
      <div className="bg-surface-container-lowest p-1 rounded-xl shadow-sm border border-outline-variant/15 min-w-0">
        <select
          value={filters.category}
          onChange={(e) => onCategory(e.target.value)}
          className="w-full py-3 px-4 bg-transparent border-none focus:ring-0 outline-none text-sm font-normal text-on-secondary-container"
        >
          <option value="All">Category: All</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Footwear">Footwear</option>
          <option value="Home Deco">Home Deco</option>
        </select>
      </div>

      {/* Status */}
      <div className="bg-surface-container-lowest p-1 rounded-xl shadow-sm border border-outline-variant/15 min-w-0">
        <select
          value={filters.status}
          onChange={(e) => onStatus(e.target.value)}
          className="w-full py-3 px-4 bg-transparent border-none focus:ring-0 outline-none text-sm font-normal text-on-secondary-container"
        >
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* More Filters */}
      <div className="bg-surface-container-lowest p-1 rounded-xl shadow-sm border border-outline-variant/15 min-w-0">
        <button className="w-full py-3 px-4 flex items-center justify-between text-sm font-normal text-on-secondary-container">
          <span>Filters</span>
          <span className="material-symbols-outlined text-lg">tune</span>
        </button>
      </div>
    </div>
  );
}
export default ProductsFilters