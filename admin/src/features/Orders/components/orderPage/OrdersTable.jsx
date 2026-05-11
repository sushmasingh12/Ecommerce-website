import { useState } from "react";
import { MoreVertical, Eye, Trash2 } from "lucide-react";
import { PaymentBadge, FulfillmentBadge } from "./OrderStatusBadge";
import { useNavigate } from "react-router-dom";

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-5">
      <div className="w-4 h-4 bg-surface-container-high rounded" />
    </td>

    <td className="p-5">
      <div className="h-4 w-24 bg-surface-container-high rounded" />
    </td>

    <td className="p-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface-container-high" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-32 bg-surface-container-high rounded" />
          <div className="h-2.5 w-24 bg-surface-container-high rounded" />
        </div>
      </div>
    </td>

    <td className="p-5 text-center">
      <div className="h-4 w-12 bg-surface-container-high rounded mx-auto" />
    </td>

    <td className="p-5">
      <div className="h-4 w-16 bg-surface-container-high rounded" />
    </td>

    <td className="p-5">
      <div className="h-6 w-16 bg-surface-container-high rounded-full" />
    </td>

    <td className="p-5">
      <div className="h-6 w-20 bg-surface-container-high rounded-full" />
    </td>

    <td className="p-5 text-right">
      <div className="flex justify-end">
        <div className="h-9 w-9 bg-surface-container-high rounded-lg" />
      </div>
    </td>
  </tr>
);

// ─── Order Row ────────────────────────────────────────────────────────────────
const OrderRow = ({
  order,
  isActive,
  isChecked,
  onSelect,
  onToggleCheck,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleView = () => {
    onSelect(order.id);
    navigate(`/orders/${order.id}`);
  };

  const handleDelete = () => {
    onDelete?.(order.id);
  };

  return (
    <tr
      className={`hover:bg-surface-bright transition-colors cursor-pointer ${
        isActive ? "bg-primary/5" : ""
      }`}
      onClick={() => onSelect(order.id)}
    >
      <td className="p-5" onClick={(e) => e.stopPropagation()}>
        <input
          checked={isChecked}
          className="rounded border-outline-variant text-primary focus:ring-primary/20"
          type="checkbox"
          onChange={() => onToggleCheck(order.id)}
        />
      </td>

      <td
        className={`p-5 font-bold text-sm ${
          isActive ? "text-primary" : "text-on-surface"
        }`}
      >
        #{order.id}
      </td>

      <td className="p-5">
        <div className="flex items-center gap-3">
          <img
            alt={order.customer.name}
            className="w-8 h-8 rounded-full border border-surface-container-high"
            src={order.customer.avatar}
          />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {order.customer.name}
            </span>

            <span className="text-[10px] text-on-surface-variant">
              {order.customer.email}
            </span>
          </div>
        </div>
      </td>

      <td className="p-5 text-center text-sm font-medium">
        {order.items} {order.items === 1 ? "item" : "items"}
      </td>

      <td className="p-5 text-sm font-bold">
        ${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </td>

      <td className="p-5">
        <PaymentBadge status={order.payment} />
      </td>

      <td className="p-5">
        <FulfillmentBadge status={order.fulfillment} />
      </td>

      <td className="p-5 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex justify-end">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Order actions"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-30 w-36 overflow-hidden rounded-xl border border-outline-variant/10 bg-white shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleView();
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <Eye size={16} />
                View
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleDelete();
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

// ─── Orders Table ─────────────────────────────────────────────────────────────
const OrdersTable = ({
  orders,
  isLoading,
  activeOrderId,
  selectedOrderIds,
  allSelected,
  total,
  currentPage,
  pageSize,
  onSelectOrder,
  onToggleCheck,
  onToggleSelectAll,
  onPageChange,
  onDeleteOrder,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  const getPageNumbers = () => {
    const pages = [1, 2, 3];

    if (totalPages > 3) {
      pages.push("...", totalPages);
    }

    return pages;
  };

  return (
    <div className="xl:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="p-5 w-12">
                <input
                  checked={allSelected}
                  className="rounded border-outline-variant text-primary focus:ring-primary/20"
                  type="checkbox"
                  onChange={onToggleSelectAll}
                />
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">
                Order ID
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">
                Customer
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container text-center">
                Items
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">
                Total
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">
                Payment
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">
                Fulfillment
              </th>

              <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-on-secondary-container text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container-low">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              : orders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    isActive={activeOrderId === order.id}
                    isChecked={selectedOrderIds.includes(order.id)}
                    onSelect={onSelectOrder}
                    onToggleCheck={onToggleCheck}
                    onDelete={onDeleteOrder}
                  />
                ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-on-surface-variant">
          Showing {startItem} to {endItem} of {total.toLocaleString()} results
        </span>

        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span className="mx-1" key={`ellipsis-${i}`}>
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white font-bold shadow-md"
                    : "hover:bg-surface-container-high"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;