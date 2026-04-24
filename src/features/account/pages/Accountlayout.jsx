import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const NAV = [
  { label: 'My Profile', path: '/account', icon: 'account_circle', mobileLabel: 'Profile' },
  { label: 'My Orders', path: '/account/orders', icon: 'shopping_bag', mobileLabel: 'Orders' },
  { label: 'Saved Addresses', path: '/account/addresses', icon: 'location_on', mobileLabel: 'Addresses' },
  { label: 'Payment Methods', path: '/account/payments', icon: 'payments', mobileLabel: 'Payments' },
  { label: 'Settings', path: '/account/settings', icon: 'settings', mobileLabel: 'Settings' },
  { label: 'Help & Support', path: '/account/help', icon: 'help_outline', mobileLabel: 'Help' },
];

const AccountLayout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-300 mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-5 items-start">

          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              {/* User card */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 leading-none mb-0.5">Hello,</p>
                  <p className="font-bold text-gray-900 text-sm truncate">{user?.name || 'User'}</p>
                  <span className="inline-block text-[10px] bg-secondary/15 text-[#b36b00] font-semibold px-2 py-0.5 rounded-full mt-1">
                    Gold Member
                  </span>
                </div>
              </div>

              <nav className="space-y-0.5">
                {NAV.map(({ label, path, icon }) => {
                  const active = path === '/account'
                    ? pathname === '/account' || pathname === '/account/profile'
                    : pathname.startsWith(path);
                  return (
                    <Link key={path} to={path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? 'bg-primary text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}>
                      <span className={`material-symbols-outlined text-lg ${active ? 'text-secondary' : 'text-gray-400'}`}>
                        {icon}
                      </span>
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all text-left"
                >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 w-full">
            {/* Mobile nav */}
            <div className="flex md:hidden gap-2 overflow-x-auto no-scrollbar bg-white rounded-xl p-2 mb-4 shadow-sm border border-gray-100">
              {NAV.map(({ path, icon, mobileLabel }) => {
                const active = path === '/account'
                  ? pathname === '/account' || pathname === '/account/profile'
                  : pathname.startsWith(path);
                return (
                  <Link key={path} to={path}
                    className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg text-[10px] font-bold shrink-0 transition-all ${active ? 'bg-primary text-white shadow-sm' : 'text-gray-500'
                      }`}>
                    <span className={`material-symbols-outlined text-base ${active ? 'text-secondary' : ''}`}>{icon}</span>
                    {mobileLabel}
                  </Link>
                );
              })}
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;