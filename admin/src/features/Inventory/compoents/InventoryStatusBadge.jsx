// src/features/Inventory/components/InventoryStatusBadge.jsx

const STATUS_CONFIG = {
  "Low Stock": {
    wrapperClass: "bg-tertiary-fixed text-tertiary",
    dotClass: "bg-tertiary",
    label: "Low Stock",
  },
  "Out of Stock": {
    wrapperClass: "bg-error-container text-on-error-container",
    dotClass: "bg-error",
    label: "Out of Stock",
  },
  "In Stock": {
    wrapperClass: "bg-green-50 text-green-700",
    dotClass: "bg-green-500",
    label: "In Stock",
  },
  "In Transit": {
    wrapperClass: "bg-blue-50 text-blue-700",
    dotClass: "bg-blue-500",
    label: "In Transit",
  },
};

export const InventoryStatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["In Stock"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${config.wrapperClass}`}
    >
      <span className={`w-1 h-1 rounded-full ${config.dotClass}`} />
      {config.label}
    </span>
  );
};

export const getStockBarColor = (status) => {
  switch (status) {
    case "Low Stock":
      return "bg-tertiary";
    case "Out of Stock":
      return "bg-error";
    case "In Transit":
      return "bg-blue-500";
    default:
      return "bg-green-500";
  }
};