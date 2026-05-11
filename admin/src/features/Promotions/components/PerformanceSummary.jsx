// src/features/Promotions/components/PerformanceSummary.jsx

const PerformanceSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-12 gap-6 mb-12">
      {summary.map((card) =>
        card.highlight ? (
          <div
            key={card.id}
            className="col-span-12 md:col-span-4 bg-primary text-white rounded-xl p-6 shadow-xl shadow-primary/20 flex flex-col justify-between min-h-[160px] relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start relative z-10">
              <span className={`p-2 ${card.iconBg} ${card.iconColor} rounded-lg material-symbols-outlined`}>
                {card.icon}
              </span>
              <span className={`text-xs font-bold ${card.badgeClass} px-2 py-0.5 rounded-full`}>
                {card.badge}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <h3 className="text-2xl font-bold tracking-tighter">{card.value}</h3>
            </div>
          </div>
        ) : (
          <div
            key={card.id}
            className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-xl p-6 flex flex-col justify-between min-h-[160px]"
            style={{ boxShadow: "0 4px 6px -1px rgba(25,28,29,0.04), 0 10px 15px -3px rgba(25,28,29,0.08)" }}
          >
            <div className="flex justify-between items-start">
              <span className={`p-2 ${card.iconBg} ${card.iconColor} rounded-lg material-symbols-outlined`}>
                {card.icon}
              </span>
              <span className={`text-xs font-bold ${card.badgeClass} px-2 py-0.5 rounded-full`}>
                {card.badge}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <h3 className="text-2xl font-bold tracking-tighter">
                {card.value}
                {card.unit && (
                  <span className="text-lg font-medium text-slate-400 ml-1">{card.unit}</span>
                )}
              </h3>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PerformanceSummary;