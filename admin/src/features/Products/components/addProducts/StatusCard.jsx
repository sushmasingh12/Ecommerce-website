const STATUS_OPTIONS = [
  {
    value: "Active",
    icon: "rocket_launch",
    label: "Active",
    description: "Visible in storefront",
  },
  {
    value: "Draft",
    icon: "edit_note",
    label: "Draft",
    description: "Internal use only",
  },
  {
    value: "Archived",
    icon: "archive",
    label: "Archived",
    description: "Out of circulation",
  },
];

const StatusCard = ({ value, onChange }) => {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-on-secondary-container mb-6">
        Product Status
      </h3>
      <div className="space-y-3">
        {STATUS_OPTIONS.map((opt) => {
          const isActive = value === opt.value;
          return (
            <label
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                isActive
                  ? "border-primary/20 bg-primary/5"
                  : "border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-on-secondary-container/10 text-on-secondary-container"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{opt.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">{opt.label}</p>
                  <p className="text-[10px] text-on-surface-variant">{opt.description}</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? "border-primary bg-white" : "border-outline-variant bg-transparent"
                }`}
              >
                {isActive && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
export default StatusCard