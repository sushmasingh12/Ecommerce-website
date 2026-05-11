

import { SegmentBadge,StatusBadge } from "./CustomerBadges";


// ─── Skeleton Row ──────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-4">
      <div className="w-4 h-4 bg-surface-container-high rounded" />
    </td>
    <td className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex-shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 bg-surface-container-high rounded" />
          <div className="h-2.5 w-36 bg-surface-container-high rounded" />
        </div>
      </div>
    </td>
    <td className="p-4"><div className="h-4 w-8 bg-surface-container-high rounded" /></td>
    <td className="p-4"><div className="h-4 w-20 bg-surface-container-high rounded" /></td>
    <td className="p-4"><div className="h-5 w-16 bg-surface-container-high rounded-md" /></td>
    <td className="p-4"><div className="h-5 w-16 bg-surface-container-high rounded-full" /></td>
    <td className="p-4"><div className="h-3 w-16 bg-surface-container-high rounded" /></td>
  </tr>
);

// ─── Customer Avatar ───────────────────────────────────────────────────────────
const CustomerAvatar = ({ customer, isActive }) => {
  if (customer.avatar) {
    return (
      <img
        alt={customer.name}
        className={`w-10 h-10 rounded-full object-cover ${
          isActive ? "ring-2 ring-primary/20" : ""
        }`}
        src={customer.avatar}
      />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-tertiary-fixed-dim flex items-center justify-center text-on-tertiary-fixed font-bold text-sm">
      {customer.initials}
    </div>
  );
};

// ─── Customer Row ──────────────────────────────────────────────────────────────
const CustomerRow = ({ customer, isActive, isChecked, onSelect, onToggleCheck }) => (
  <tr
    className={`transition-colors cursor-pointer ${
      isActive
        ? "bg-primary/5 hover:bg-primary/[0.08]"
        : "hover:bg-surface-bright"
    }`}
    onClick={() => onSelect(customer.id)}
  >
    <td className="p-4" onClick={(e) => e.stopPropagation()}>
      <input
        checked={isChecked}
        className="rounded border-outline-variant text-primary focus:ring-primary/20"
        type="checkbox"
        onChange={() => onToggleCheck(customer.id)}
      />
    </td>
    <td className="p-4">
      <div className="flex items-center gap-3">
        <CustomerAvatar customer={customer} isActive={isActive} />
        <div>
          <p className="text-sm font-semibold text-on-surface">{customer.name}</p>
          <p className="text-xs text-on-surface-variant">{customer.email}</p>
        </div>
      </div>
    </td>
    <td className="p-4 text-sm font-medium">{customer.orders}</td>
    <td className="p-4 text-sm font-bold text-on-surface">
      ${customer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
    </td>
    <td className="p-4">
      <div className="flex gap-2">
        <SegmentBadge segment={customer.segment} />
      </div>
    </td>
    <td className="p-4">
      <StatusBadge status={customer.status} />
    </td>
    <td className="p-4 text-xs text-on-surface-variant">{customer.lastActive}</td>
  </tr>
);

// ─── Customers Table ───────────────────────────────────────────────────────────
const CustomersTable = ({
  customers,
  isLoading,
  activeCustomerId,
  selectedCustomerIds,
  allSelected,
  currentPage,
  totalPages,
  onSelectCustomer,
  onToggleCheck,
  onToggleSelectAll,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [1, 2, 3];
    if (totalPages > 3) pages.push("...", totalPages);
    return pages;
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm ring-1 ring-outline-variant/15">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50 border-b border-outline-variant/15">
              <th className="p-4 w-10">
                <input
                  checked={allSelected}
                  className="rounded border-outline-variant text-primary focus:ring-primary/20 transition-all"
                  type="checkbox"
                  onChange={onToggleSelectAll}
                />
              </th>
              <th className="p-4 text-xs font-bold text-on-secondary-container uppercase tracking-widest">
                Customer
              </th>
              <th className="p-4 text-xs font-bold text-on-secondary-container uppercase tracking-widest">
                Orders
              </th>
              <th className="p-4 text-xs font-bold text-on-secondary-container uppercase tracking-widest">
                Total Spent
              </th>
              <th className="p-4 text-xs font-bold text-on-secondary-container uppercase tracking-widest">
                Segment
              </th>
              <th className="p-4 text-xs font-bold text-on-secondary-container uppercase tracking-widest">
                Status
              </th>
              <th className="p-4 text-xs font-bold text-on-secondary-container uppercase tracking-widest">
                Active
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              : customers.map((customer) => (
                  <CustomerRow
                    key={customer.id}
                    isActive={activeCustomerId === customer.id}
                    isChecked={selectedCustomerIds.includes(customer.id)}
                    customer={customer}
                    onSelect={onSelectCustomer}
                    onToggleCheck={onToggleCheck}
                  />
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 flex items-center justify-between bg-surface-container-low/30 border-t border-outline-variant/10">
        <p className="text-xs font-medium text-on-surface-variant">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded hover:bg-surface-container-high transition-colors text-slate-400 disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, i) =>
              page === "..." ? (
                <span className="px-1 text-on-surface-variant" key={`ellipsis-${i}`}>
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-white font-bold"
                      : "hover:bg-surface-container-high text-on-surface"
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            className="p-1 rounded hover:bg-surface-container-high transition-colors text-on-surface disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;