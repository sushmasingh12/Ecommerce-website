import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ isOpen, closeDropdown }) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: 'My Profile', icon: 'person_outline', path: '/account/profile' },
    { label: 'My Orders', icon: 'package', path: '/account/orders' },
    { label: 'Wishlist', icon: 'favorite_border', path: '/wishlist' },
    { label: 'Cart', icon: 'shopping_bag', path: '/cart' },
    { label: 'Saved Addresses', icon: 'location_on', path: '/account/addresses' },
    { label: 'Payment Methods', icon: 'credit_card', path: '/account/payments' },
    { label: 'Settings', icon: 'settings', path: '/account/settings' },
    { label: 'Help & Support', icon: 'help_outline', path: '/support' },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="p-6 border-b border-gray-50 bg-gray-50/50">
        <p className="text-[10px] font-label uppercase tracking-widest text-gray-400 mb-1">Signed in as</p>
        <p className="font-headline text-sm truncate font-medium">Julian Moreau</p>
      </div>
      
      <div className="py-3">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={closeDropdown}
            className="flex items-center gap-4 px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-all group"
          >
            <span className="material-symbols-outlined text-xl text-gray-400 group-hover:text-black">
              {item.icon}
            </span>
            <span className="font-label text-xs uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </div>
      
      <div className="py-3 border-t border-gray-100">
        <button
          onClick={closeDropdown}
          className="w-full flex items-center gap-4 px-6 py-3 text-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-all group"
        >
          <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">
            logout
          </span>
          <span className="font-label text-xs uppercase tracking-widest font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
