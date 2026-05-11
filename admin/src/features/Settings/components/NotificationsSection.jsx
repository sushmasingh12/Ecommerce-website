import ToggleSwitch from "./ToggleSwitch";



const NotificationsSection = ({ notifications, onToggle }) => (
  <section id="notifications" className="grid grid-cols-5 gap-8">
    <div className="col-span-2">
      <h2 className="text-xl font-bold tracking-tight text-on-surface">Notifications</h2>
      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
        Control how the platform communicates critical updates to your team and customers.
      </p>
    </div>

    <div className="col-span-3 space-y-4">
      {notifications.map((item) => (
        <div
          key={item.id}
          className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group hover:bg-surface-bright transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center ${item.iconColor}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">{item.title}</p>
              <p className="text-xs text-on-surface-variant">{item.description}</p>
            </div>
          </div>
          <ToggleSwitch
            checked={item.enabled}
            onChange={() => onToggle(item.id)}
          />
        </div>
      ))}
    </div>
  </section>
);

export default NotificationsSection;