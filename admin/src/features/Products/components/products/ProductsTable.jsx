
import ProductsEmptyState from "./ProductsEmptyState";
import ProductsTableSkeleton from "./ProductsTableSkeleton";
import ProductTableRow from "./ProductTableRow";



const ProductsTable =({
  products,
  loading,
  selectedIds,
  isAllSelected,
  selectedCount,
  onToggleSelect,
  onToggleSelectAll,
  onDelete,
  onClearFilters,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/15 overflow-hidden w-full min-w-0">
      {/* Bulk Action Bar */}
      {selectedCount > 0 && (
        <div className="sticky top-20 z-30 flex items-center justify-between bg-inverse-surface text-inverse-on-surface px-6 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">{selectedCount} products selected</span>
            <div className="h-4 w-px bg-white/20" />
            <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">edit</span>
              Edit Bulk
            </button>
            <button className="flex items-center gap-2 text-sm hover:text-error transition-colors">
              <span className="material-symbols-outlined text-lg">delete</span>
              Delete
            </button>
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity"
          >
            Clear selection
          </button>
        </div>
      )}

      <div className="overflow-x-auto w-full">
    <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="py-4 px-6 w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-outline-variant text-primary focus:ring-primary/20"
                />
              </th>
              {["Product", "Category", "Price", "Stock", "Status", "image", "Actions"].map((h) => (
                <th
                  key={h}
                  className={`py-4 px-4 font-bold text-[11px] uppercase tracking-widest text-on-secondary-container ${
                    h === "Price" || h === "Actions" 
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {loading ? (
              <ProductsTableSkeleton rows={5} />
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <ProductsEmptyState onClear={onClearFilters} />
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  isSelected={selectedIds.includes(product.id)}
                  onToggleSelect={onToggleSelect}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsTable