// src/features/Settings/components/SettingsNav.jsx

const NAV_ITEMS = [
  { id: "store-profile", icon: "store", label: "Store Profile", filled: true },
  { id: "notifications", icon: "notifications_active", label: "Notifications" },
  { id: "shipping", icon: "local_shipping", label: "Shipping & Taxes" },
  { id: "security", icon: "shield_lock", label: "Security" },
  { id: "team", icon: "group", label: "Team Members" },
];

const SettingsNav = ({ activeSection, onSectionChange }) => (
  <div className="col-span-3 space-y-1">
    {NAV_ITEMS.map((item) => {
      const isActive = activeSection === item.id;
      return (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            onSectionChange(item.id);
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
            isActive
              ? "bg-surface-container-lowest shadow-sm text-primary font-bold"
              : "text-on-surface-variant hover:bg-surface-container-low font-medium"
          }`}
        >
          <span
            className="material-symbols-outlined text-lg"
            style={
              isActive && item.filled
                ? { fontVariationSettings: "'FILL' 1" }
                : {}
            }
          >
            {item.icon}
          </span>
          {item.label}
        </a>
      );
    })}
  </div>
);

export default SettingsNav;