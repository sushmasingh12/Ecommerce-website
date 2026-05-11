// src/features/Inventory/components/InventoryStatsGrid.jsx

const SkeletonCard = () => (
  <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-surface-container-high rounded-lg" />
      <div className="w-16 h-5 bg-surface-container-high rounded-full" />
    </div>
    <div className="h-3 w-28 bg-surface-container-high rounded mb-2" />
    <div className="h-7 w-32 bg-surface-container-high rounded" />
  </div>
);

const STAT_CONFIGS = [
  {
    key: "skuValue",
    icon: "payments",
    iconBg: "bg-primary/5",
    iconColor: "text-primary",
    label: "Total SKU Value",
    getValue: (stats) => stats.totalSkuValue,
    getBadge: (stats) => ({
      text: stats.totalSkuValueChange,
      className: "text-green-600 bg-green-50",
    }),
  },
  {
    key: "lowStock",
    icon: "warning",
    iconBg: "bg-tertiary/5",
    iconColor: "text-tertiary",
    label: "Low Stock Items",
    getValue: (stats) => `${stats.lowStockCount} Products`,
    getBadge: () => ({
      text: "Action Needed",
      className: "text-tertiary bg-tertiary-fixed",
    }),
  },
  {
    key: "outOfStock",
    icon: "dangerous",
    iconBg: "bg-error/5",
    iconColor: "text-error",
    label: "Out of Stock",
    getValue: (stats) =>
      `0${stats.outOfStockCount} Products`,
    getBadge: () => ({
      text: "Critical",
      className: "text-error bg-error-container",
    }),
  },
  {
    key: "inTransit",
    icon: "local_shipping",
    iconBg: "bg-secondary/5",
    iconColor: "text-secondary",
    label: "In Transit",
    getValue: (stats) =>
      `${stats.inTransitUnits.toLocaleString()} Units`,
    getBadge: (stats) => ({
      text: `${stats.inTransitShipments} Shipments`,
      className: "text-blue-600 bg-blue-50",
    }),
  },
];

const InventoryStatsGrid = ({ stats, isLoading }) => {
  if (isLoading || !stats) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {STAT_CONFIGS.map(({ key, icon, iconBg, iconColor, label, getValue, getBadge }) => {
        const badge = getBadge(stats);
        return (
          <div
            key={key}
            className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`p-2 ${iconBg} rounded-lg ${iconColor}`}>
                <span className="material-symbols-outlined">{icon}</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full ${badge.className}`}
              >
                {badge.text}
              </span>
            </div>
            <p className="text-xs font-bold text-on-secondary-container tracking-wider uppercase">
              {label}
            </p>
            <h3 className="text-md font-bold mt-1">{getValue(stats)}</h3>
          </div>
        );
      })}
    </section>
  );
};

export default InventoryStatsGrid;