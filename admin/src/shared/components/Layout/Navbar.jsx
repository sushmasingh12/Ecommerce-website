// Navbar.jsx — same rahega, sirf logo link update karo
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-8 bg-white/75 backdrop-blur-xl border-b border-slate-100">
      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          search
        </span>
        <input
          type="text"
          placeholder="Search insights, products, or orders..."
          className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Create Order */}
        <button
          onClick={() => navigate("/orders/create")}
          className="flex items-center gap-2 px-4 py-2 bg-linear-to-br from-primary to-primary-container text-on-primary rounded-lg font-semibold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Create Order
        </button>

        {/* Icon Buttons */}
        <div className="flex items-center gap-4 text-slate-600">
          <button className="hover:text-primary transition-colors">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>
          <button className="relative hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-tertiary rounded-full border-2 border-white" />
          </button>
          <button className="hover:text-primary transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface leading-tight">Alex Rivera</p>
            <p className="text-[10px] text-on-secondary-container">Admin Role</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary to-primary-container flex items-center justify-center text-white font-bold text-sm">
            AR
          </div>
        </div>
      </div>
    </header>
  );
}

export default  Navbar;