const MetricCard =({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  badge,
  badgeType = "success", // "success" | "error" | "ai"
  loading = false,
}) =>{
  const badgeStyles = {
    success: "text-emerald-600 bg-emerald-50",
    error: "text-error bg-error-container",
    ai: "bg-secondary-container text-primary",
  };

  if (loading) {
    return (
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100" />
          <div className="w-16 h-6 rounded-md bg-slate-100" />
        </div>
        <div className="w-24 h-3 rounded bg-slate-100 mb-3" />
        <div className="w-32 h-8 rounded bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${iconColor}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>

        {badgeType === "ai" ? (
          <div className="bg-secondary-container flex items-center gap-1.5 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary tracking-tight">AI ANALYZED</span>
          </div>
        ) : (
          <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${badgeStyles[badgeType]}`}>
            {badge}
            {badgeType === "success" && (
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
            )}
          </span>
        )}
      </div>

      <p className="text-on-secondary-container text-xs font-bold uppercase tracking-widest mb-1">
        {label}
      </p>
      <h3 className="text-2xl font-bold text-on-surface tracking-tight">{value}</h3>
    </div>
  );
}

export default  MetricCard