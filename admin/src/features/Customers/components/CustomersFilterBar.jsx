// src/features/Customers/components/CustomersFilterBar.jsx

const CustomersFilterBar = ({
  filters,
  matches,
  onActivityFilter,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-surface-container-low rounded-xl">
      {/* Activity Filter */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/15">
        <span className="material-symbols-outlined text-[18px] text-slate-400">
          filter_list
        </span>
        <span className="text-xs font-bold text-on-secondary-container uppercase tracking-wider">
          Activity
        </span>
        <select
          className="border-none bg-transparent text-sm font-medium py-0 focus:ring-0 cursor-pointer"
          value={filters.activityFilter}
          onChange={(e) => onActivityFilter(e.target.value)}
        >
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Active Only</option>
        </select>
      </div>

      {/* Static Filters (display only) */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/15">
        <span className="text-xs font-bold text-on-secondary-container uppercase tracking-wider">
          Spending
        </span>
        <span className="text-sm font-medium text-on-surface">&gt;$2,500</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/15">
        <span className="text-xs font-bold text-on-secondary-container uppercase tracking-wider">
          Segment
        </span>
        <span className="text-sm font-medium text-on-surface">
          VIP &amp; Returning
        </span>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        <button
          className="text-xs font-semibold text-primary px-3 py-1 hover:bg-primary/5 rounded-md transition-colors"
          onClick={onClearFilters}
        >
          Clear all filters
        </button>
        <span className="w-px h-4 bg-outline-variant/30 mx-1" />
        <p className="text-xs font-medium text-on-surface-variant">
          Showing 24 of {matches?.toLocaleString() ?? "1,280"} matches
        </p>
      </div>
    </div>
  );
};

export default CustomersFilterBar;