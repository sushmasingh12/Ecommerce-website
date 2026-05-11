// src/features/Reviews/components/InsightsPanel.jsx

const InsightsPanel = ({ insights }) => {
  if (!insights?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {insights.map((card) => (
        <div
          key={card.id}
          className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-on-secondary-container tracking-widest font-bold uppercase text-[10px]">
              {card.label}
            </span>
            <span
              className={`material-symbols-outlined ${card.iconColor}`}
              style={card.iconFill ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {card.icon}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold tracking-tighter ${card.valueClass || ""}`}>
              {card.value}
            </span>

            {/* Badge rendering */}
            {card.id === "pending" ? (
              <span className={card.badgeClass}>{card.badge}</span>
            ) : card.badgeIcon ? (
              <span className={`text-xs font-bold flex items-center gap-0.5 ${card.badgeClass}`}>
                <span className="material-symbols-outlined text-xs">{card.badgeIcon}</span>
                {card.badge}
              </span>
            ) : (
              <span className={`text-xs font-medium ${card.badgeClass}`}>{card.badge}</span>
            )}
          </div>

          {card.hasGlow && (
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
};

export default InsightsPanel;