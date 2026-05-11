import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
};

const avatarColors = {
  JC: "from-blue-500 to-blue-700",
  ES: "from-purple-500 to-purple-700",
  MT: "from-orange-500 to-orange-700",
};

const SkeletonRow = () => {
  return (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-8 py-5">
          <div className="h-4 bg-slate-100 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
};

const RecentOrdersTable = ({
  orders = [],
  loading = false,
  onDeleteOrder,
}) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleToggleMenu = (orderId) => {
    setOpenMenuId((prev) => (prev === orderId ? null : orderId));
  };

  const handleViewOrder = (orderId) => {
    setOpenMenuId(null);
    navigate(`/orders/${orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    setOpenMenuId(null);
    onDeleteOrder?.(orderId);
  };

  return (
    <div className="col-span-12 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 overflow-visible">
      {/* Header */}
      <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
        <div>
          <h4 className="text-lg font-bold text-on-surface">Recent Orders</h4>
          <p className="text-sm text-on-surface-variant">
            Manage and track your latest customer transactions.
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="text-primary font-bold text-sm hover:underline"
        >
          View All Orders
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low text-[10px] font-extrabold text-on-secondary-container uppercase tracking-widest">
              {["Order ID", "Customer", "Product", "Amount", "Status", "Action"].map(
                (h) => (
                  <th key={h} className="px-8 py-4">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant/10">
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonRow key={i} />)
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-surface-container-low/50 transition-colors"
                >
                  {/* Order ID */}
                  <td className="px-8 py-5 font-mono text-xs font-bold text-on-surface">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                          avatarColors[order.customer.initials] ??
                          "from-slate-400 to-slate-600"
                        } flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {order.customer.initials}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-on-surface">
                          {order.customer.name}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Product */}
                  <td className="px-8 py-5">
                    <p className="text-sm text-on-surface">
                      {order.product.name}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                      Category: {order.product.category}
                    </p>
                  </td>

                  {/* Amount */}
                  <td className="px-8 py-5 font-bold text-on-surface">
                    {order.amount}
                  </td>

                  {/* Status */}
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        statusStyles[order.status] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-8 py-5">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() => handleToggleMenu(order.id)}
                        className="text-slate-400 hover:text-primary transition-all rounded-lg p-1 hover:bg-surface-container-low"
                      >
                        <span className="material-symbols-outlined">
                          more_horiz
                        </span>
                      </button>

                      {openMenuId === order.id && (
                        <div className="absolute right-0 top-9 z-50 w-32 rounded-xl border border-outline-variant/15 bg-surface-container-lowest shadow-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleViewOrder(order.id)}
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(order.id)}
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-8 py-10 text-center text-sm text-on-surface-variant"
                >
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;