// src/features/Inventory/components/InventoryTable.jsx

import { InventoryStatusBadge, getStockBarColor } from "./InventoryStatusBadge";

// ─── Skeleton Row ──────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-surface-container-high flex-shrink-0" />
        <div className="h-4 w-36 bg-surface-container-high rounded" />
      </div>
    </td>
    <td className="px-6 py-4"><div className="h-3 w-20 bg-surface-container-high rounded" /></td>
    <td className="px-6 py-4"><div className="h-5 w-20 bg-surface-container-high rounded" /></td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-surface-container-high rounded-full" />
        <div className="h-3 w-12 bg-surface-container-high rounded" />
      </div>
    </td>
    <td className="px-6 py-4"><div className="h-3 w-20 bg-surface-container-high rounded" /></td>
    <td className="px-6 py-4"><div className="h-5 w-20 bg-surface-container-high rounded-full" /></td>
    <td className="px-6 py-4 text-right"><div className="h-5 w-5 bg-surface-container-high rounded ml-auto" /></td>
  </tr>
);

// ─── Inventory Row ─────────────────────────────────────────────────────────────
const InventoryRow = ({ item }) => {
  const stockPct =
    item.stockMax > 0 ? (item.stockCurrent / item.stockMax) * 100 : 0;
  const barColor = getStockBarColor(item.status);

  return (
    <tr className="hover:bg-surface-bright transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 border border-outline-variant/5">
            <img
              alt={item.name}
              className="w-full h-full object-cover"
              src={item.image}
            />
          </div>
          <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
            {item.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
        {item.sku}
      </td>
      <td className="px-6 py-4">
        <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-bold text-on-surface-variant uppercase">
          {item.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor}`}
              style={{ width: `${stockPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-on-surface w-16 text-right">
            {item.stockCurrent} / {item.stockMax}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
        {item.warehouse}
      </td>
      <td className="px-6 py-4">
        <InventoryStatusBadge status={item.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </td>
    </tr>
  );
};

// ─── Inventory Table ───────────────────────────────────────────────────────────
const InventoryTable = ({
  items,
  isLoading,
  total,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low/50">
            {["Product", "SKU", "Category", "Stock Level", "Warehouse", "Status", ""].map(
              (col, i) => (
                <th
                  key={i}
                  className={`px-6 py-4 text-[10px] font-bold text-on-secondary-container uppercase tracking-widest ${
                    col === "Stock Level" ? "w-64" : ""
                  }`}
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-low">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
            : items.map((item) => <InventoryRow key={item.id} item={item} />)}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-surface-container-low bg-surface-container-low/30 flex items-center justify-between">
        <p className="text-xs text-on-surface-variant font-medium">
          Showing{" "}
          <span className="font-bold text-on-surface">
            {startItem}-{endItem}
          </span>{" "}
          of {total.toLocaleString()} Products
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-lg border border-outline-variant/20 hover:bg-white transition-all disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                currentPage === page
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "hover:bg-white text-on-surface-variant"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="p-1.5 rounded-lg border border-outline-variant/20 hover:bg-white transition-all"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InventoryTable;