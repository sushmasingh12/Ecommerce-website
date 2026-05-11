const TopProducts = ({ products }) => {
  if (!products) return null;

  return (
    <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-on-surface tracking-tight">Top Products</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">By revenue this period</p>
        </div>
        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        {products.map((p, i) => (
          <div
            key={p.name}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors"
          >
            <span className="text-xs font-bold text-on-surface-variant w-4 text-center">{i + 1}</span>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-sm text-primary">inventory_2</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">{p.name}</p>
              <p className="text-xs text-on-surface-variant">{p.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-on-surface">{p.revenue}</p>
              <p className="text-xs text-on-surface-variant">{p.units} units</p>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-2">
              {p.growth}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
