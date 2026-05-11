import { useNavigate } from "react-router-dom";

const actions = [
  { icon: "inventory", label: "Update Inventory", path: "/inventory" },
  { icon: "campaign", label: "Launch Campaign", path: "/promotions" },
  { icon: "description", label: "Export Report", path: "/analytics" },
];

const QuickActions = ()  =>{
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-low p-8 rounded-xl flex-1 relative overflow-hidden group">
      <div className="relative z-10">
        <h4 className="text-xl font-bold text-on-surface mb-6">Quick Actions</h4>
        <div className="flex flex-col gap-3">
          {actions.map(({ icon, label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:bg-primary hover:text-white transition-all group/btn shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary group-hover/btn:text-white">
                  {icon}
                </span>
                <span className="font-bold text-sm">{label}</span>
              </div>
              <span className="material-symbols-outlined text-sm opacity-0 group-hover/btn:opacity-100 transition-all">
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Decorative blob */}
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
    </div>
  );
}

export default QuickActions