const STATS_CONFIG = [
  {
    key: "totalActive",
    icon: "check_circle",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    label: "Total Active",
    sublabel: "Products",
    valueColor: "text-on-surface",
  },
  {
    key: "lowStock",
    icon: "warning",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    label: "Low Stock",
    sublabel: "Alerts",
    valueColor: "text-amber-600",
  },
  {
    key: "avgRating",
    icon: "insights",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    label: "Avg. Rating",
    sublabel: "Global",
    valueColor: "text-on-surface",
  },
];

const SkeletonStat =() => {
  return (
    <div className="flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100" />
        <div>
          <div className="w-20 h-3 bg-slate-100 rounded mb-1" />
          <div className="w-14 h-2 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="w-10 h-6 bg-slate-100 rounded" />
    </div>
  );
}

const QuickStatsCard = ({ stats, loading = false }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-8 shadow-sm">
      <h4 className="text-md font-bold text-on-surface mb-6">Quick Stats</h4>
      <div className="space-y-6">
        {loading
          ? [...Array(3)].map((_, i) => <SkeletonStat key={i} />)
          : STATS_CONFIG.map(({ key, icon, iconBg, iconColor, label, sublabel, valueColor }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center ${iconColor}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{label}</div>
                    <div className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                      {sublabel}
                    </div>
                  </div>
                </div>
                <span className={`text-xl font-bold tracking-tight ${valueColor}`}>
                  {stats?.[key] ?? "—"}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}

export default  QuickStatsCard