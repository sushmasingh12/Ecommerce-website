// src/features/orders/components/OrdersFilters.jsx

const OrdersFilters = ({
  filters,
  onSearch,
  onPaymentFilter,
  onFulfillmentFilter,
}) => {
  return (
    <div className="bg-surface-container-low p-6 rounded-2xl flex flex-wrap items-center gap-4">
      {/* Search */}
      <div className="flex-1 min-w-[300px] relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
          search
        </span>
        <input
          className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/15 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          placeholder="Search by Order ID or Customer name..."
          type="text"
          value={filters.search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Payment Status */}
        <select
          className="px-4 py-3 bg-surface-container-lowest border border-outline-variant/15 rounded-xl text-sm font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/10 cursor-pointer"
          value={filters.paymentStatus}
          onChange={(e) => onPaymentFilter(e.target.value)}
        >
          <option>Payment Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Refunded</option>
        </select>

        {/* Fulfillment Status */}
        <select
          className="px-4 py-3 bg-surface-container-lowest border border-outline-variant/15 rounded-xl text-sm font-medium text-on-surface-variant focus:ring-2 focus:ring-primary/10 cursor-pointer"
          value={filters.fulfillmentStatus}
          onChange={(e) => onFulfillmentFilter(e.target.value)}
        >
          <option>Fulfillment Status</option>
          <option>Shipped</option>
          <option>Processing</option>
          <option>Unfulfilled</option>
        </select>

        {/* Date Range */}
        <div className="flex items-center bg-surface-container-lowest border border-outline-variant/15 rounded-xl px-4 py-3 gap-3 cursor-pointer hover:bg-surface-bright transition-colors">
          <span className="material-symbols-outlined text-outline text-lg">
            calendar_today
          </span>
          <span className="text-sm font-medium text-on-surface-variant">
            Last 30 Days
          </span>
          <span className="material-symbols-outlined text-outline text-lg">
            expand_more
          </span>
        </div>

        {/* More Filters */}
        <button className="p-3 bg-surface-container-high text-on-surface rounded-xl hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersFilters;