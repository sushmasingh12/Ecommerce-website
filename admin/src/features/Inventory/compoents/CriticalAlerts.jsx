// src/features/Inventory/components/CriticalAlerts.jsx

const AlertSkeleton = () => (
  <div className="p-4 bg-surface-container-low rounded-xl animate-pulse space-y-2">
    <div className="h-4 w-40 bg-surface-container-high rounded" />
    <div className="h-3 w-56 bg-surface-container-high rounded" />
    <div className="h-3 w-24 bg-surface-container-high rounded mt-3" />
  </div>
);

const CriticalAlerts = ({ alerts, isLoading }) => {
  return (
    <div className="lg:col-span-1 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">
          Critical Alerts
        </h4>
        <span className="text-xs text-primary font-medium cursor-pointer">
          View All
        </span>
      </div>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => <AlertSkeleton key={i} />)
          : alerts.map((alert) => {
              const isCritical = alert.type === "critical";
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-l-4 flex gap-4 ${
                    isCritical
                      ? "bg-error/5 border-error"
                      : "bg-tertiary/5 border-tertiary"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined ${
                      isCritical ? "text-error" : "text-tertiary"
                    }`}
                  >
                    {isCritical ? "priority_high" : "hourglass_empty"}
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-on-surface">
                      {alert.product}
                    </h5>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {alert.message}
                    </p>
                    <button
                      className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${
                        isCritical ? "text-error" : "text-tertiary"
                      }`}
                    >
                      {alert.action}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CriticalAlerts;