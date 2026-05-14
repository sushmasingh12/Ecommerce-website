import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/auth/store/authSlice";

const navItems = [
  { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
  { icon: "inventory_2", label: "Products", path: "/products" },
  { icon: "shopping_cart", label: "Orders", path: "/orders" },
  { icon: "group", label: "Customers", path: "/customers" },
  { icon: "reviews", label: "Reviews", path: "/reviews" },
  { icon: "inventory", label: "Inventory", path: "/inventory" },
  { icon: "analytics", label: "Analytics", path: "/analytics" },
  { icon: "loyalty", label: "Promotions", path: "/promotions" },
  { icon: "auto_awesome", label: "AI Tools", path: "/ai-tools" },
  { icon: "admin_panel_settings", label: "Admins", path: "/admins", role: "super_admin" },
];

const Sidebar = () => {
  const user = useSelector(selectUser);
  const userRole = user?.role;

  const filteredNavItems = navItems.filter(item => !item.role || item.role === userRole);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-4 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tighter text-slate-900 leading-tight">
            Curator AI
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-on-secondary-container">
            Premium Commerce
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {filteredNavItems.map(({ icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-primary shadow-sm font-semibold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-xl"
                  style={
                    isActive
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  {icon}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* Settings */}
      <div className="pt-4  border-slate-200 mt-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-primary shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-xl"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                settings
              </span>
              <span>Settings</span>
            </>
          )}
        </NavLink>
      </div>
      </nav>

     
    </aside>
  );
}

export default Sidebar;