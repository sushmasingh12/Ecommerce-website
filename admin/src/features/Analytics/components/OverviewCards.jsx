const CARD_CONFIG = [
  { key: "revenue", label: "Total Revenue", icon: "payments", iconBg: "bg-primary/10", iconColor: "text-primary" },
  { key: "sessions", label: "Sessions", icon: "person", iconBg: "bg-secondary-container/50", iconColor: "text-secondary" },
  { key: "avgOrderValue", label: "Avg Order Value", icon: "shopping_bag", iconBg: "bg-tertiary-fixed/30", iconColor: "text-tertiary" },
  { key: "returnRate", label: "Return Rate", icon: "assignment_return", iconBg: "bg-error-container/50", iconColor: "text-error" },
];

const OverviewCards = ({ overview }) => {
  if (!overview) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {CARD_CONFIG.map(({ key, label, icon, iconBg, iconColor }) => {
        const item = overview[key];
        const isPositive = item.trend === "up";
        return (
          <div
            key={key}
            className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  isPositive
                    ? "bg-green-100 text-green-700"
                    : "bg-error-container text-on-error-container"
                }`}
              >
                {item.change}
              </span>
            </div>
            <p className="text-2xl font-bold tracking-tighter text-on-surface">{item.value}</p>
            <p className="text-xs text-on-surface-variant mt-1 font-medium">{label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
