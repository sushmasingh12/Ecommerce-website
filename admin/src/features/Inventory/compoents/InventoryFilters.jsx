// src/features/Inventory/components/InventoryFilters.jsx

const FilterSelect = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      className="appearance-none pl-4 pr-10 py-2.5 bg-surface-container-low border-none rounded-xl text-xs font-semibold text-on-surface-variant focus:ring-2 focus:ring-primary/10 cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">
      expand_more
    </span>
  </div>
);

const InventoryFilters = ({ filters, onStockFilter, onCategoryFilter, onWarehouseFilter }) => {
  return (
    <section className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <FilterSelect
          options={["Stock Level: All", "Low Stock", "Out of Stock", "In Stock"]}
          value={filters.stockFilter}
          onChange={onStockFilter}
        />
        <FilterSelect
          options={["Category: All", "Electronics", "Apparel", "Home Decor"]}
          value={filters.categoryFilter}
          onChange={onCategoryFilter}
        />
        <FilterSelect
          options={["Warehouse: All", "Main Hub (NY)", "West Coast (LA)", "EU Central (DE)"]}
          value={filters.warehouseFilter}
          onChange={onWarehouseFilter}
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2.5 bg-surface-container-low rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all">
          <span className="material-symbols-outlined text-xl">filter_list</span>
        </button>
        <button className="p-2.5 bg-surface-container-low rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all">
          <span className="material-symbols-outlined text-xl">file_download</span>
        </button>
      </div>
    </section>
  );
};

export default InventoryFilters;