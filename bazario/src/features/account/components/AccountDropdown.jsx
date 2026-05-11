import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

const AccountDropdown = ({ isOpen, closeDropdown }) => {
  const { user, isAuthenticated, logout } = useAuth();
  if (!isOpen) return null;
  const LINKS = [
    { label: 'My Profile', path: '/account', icon: 'account_circle' },
    { label: 'My Orders', path: '/account/orders', icon: 'shopping_bag' },
    { label: 'Wishlist', path: '/wishlist', icon: 'favorite' },
    { label: 'Settings', path: '/account/settings', icon: 'settings' },
  ];
  return (
    <div className="w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      {isAuthenticated ? (
        <>
          {/* User Header */}
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="py-2">
            {LINKS.map(({ label, path, icon }) => (
              <Link
                key={path}
                to={path}
                onClick={closeDropdown}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">{icon}</span>
                {label}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => {
                logout();
                closeDropdown();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="p-4">
          <p className="text-sm font-bold text-gray-900 mb-1">Welcome!</p>
          <p className="text-xs text-gray-500 mb-4">Access your orders, wishlist and more.</p>
          <div className="space-y-2">
            <Link
              to="/signin"
              onClick={closeDropdown}
              className="block w-full text-center py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-container transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={closeDropdown}
              className="block w-full text-center py-2 border border-gray-200 text-primary text-sm font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default AccountDropdown;