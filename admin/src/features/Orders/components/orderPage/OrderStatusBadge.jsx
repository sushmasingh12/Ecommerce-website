// src/features/orders/components/OrderStatusBadge.jsx

const PAYMENT_STYLES = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Refunded: "bg-slate-100 text-slate-500",
};

const FULFILLMENT_STYLES = {
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Unfulfilled: "bg-red-100 text-red-700",
  Refunded: "bg-slate-100 text-slate-500",
};

export const PaymentBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
      PAYMENT_STYLES[status] || "bg-slate-100 text-slate-500"
    }`}
  >
    {status}
  </span>
);

export const FulfillmentBadge = ({ status }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
      FULFILLMENT_STYLES[status] || "bg-slate-100 text-slate-500"
    }`}
  >
    {status}
  </span>
);