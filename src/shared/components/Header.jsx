import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../features/cart/hooks/useCart';
import ProfileDropdown from './ProfileDropdown';
import { NAV_DATA } from '../data/navigationData';

const Header = ({ openSidebar }) => {
  const { toggleDrawer, count } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate('/collections');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-[#131921] px-4 md:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center gap-3 md:gap-6">
          {/* Mobile menu */}
          <button onClick={openSidebar} className="flex md:hidden text-white p-1">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1">
            <span className="text-[#FF9F00] font-bold text-xl md:text-2xl" style={{ fontFamily: 'Sora, sans-serif' }}>
              baz<span className="text-white">ario</span>
            </span>
          </Link>

          {/* Search bar - prominent like Amazon/Flipkart */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-3xl">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 py-2.5 px-4 text-sm text-gray-800 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FF9F00] border-0"
              placeholder="Search products, brands, categories..."
              type="text"
            />
            <button type="submit"
              className="bg-[#FF9F00] hover:bg-[#e8900a] px-5 py-2.5 rounded-r-full transition-colors">
              <span className="material-symbols-outlined text-[#131921] text-xl">search</span>
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-4 ml-auto flex-shrink-0">
            <Link to="/wishlist" className="flex flex-col items-center text-white hover:text-[#FF9F00] transition-colors p-1.5 group">
              <span className="material-symbols-outlined text-2xl">favorite</span>
              <span className="text-[9px] hidden md:block mt-0.5 font-medium">Wishlist</span>
            </Link>

            <button onClick={toggleDrawer}
              className="flex flex-col items-center text-white hover:text-[#FF9F00] transition-colors p-1.5 relative">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              <span className="text-[9px] hidden md:block mt-0.5 font-medium">Cart</span>
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-[tertiary] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {count}
                </span>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex flex-col items-center text-white hover:text-[#FF9F00] transition-colors p-1.5">
                <span className="material-symbols-outlined text-2xl">account_circle</span>
                <span className="text-[9px] hidden md:block mt-0.5 font-medium">Account</span>
              </button>
              <div className="absolute right-0 top-full mt-2">
                <ProfileDropdown isOpen={isProfileOpen} closeDropdown={() => setIsProfileOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-[#232f3e] px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto flex items-center h-10 gap-6 overflow-x-auto no-scrollbar">
          <button onClick={openSidebar}
            className="hidden md:flex items-center gap-1.5 text-white hover:text-[#FF9F00] transition-colors flex-shrink-0 pr-6 border-r border-white/10">
            <span className="material-symbols-outlined text-lg">menu</span>
            <span className="text-xs font-semibold whitespace-nowrap">All Categories</span>
          </button>
          {NAV_DATA.map((category) => {
            const isActive = location.pathname === category.path || location.pathname.startsWith(`${category.path}/`);
            return (
              <Link key={category.name} to={category.path}
                className={`text-xs font-medium whitespace-nowrap transition-colors pb-0.5 border-b-2 flex-shrink-0 ${
                  isActive ? 'text-[#FF9F00] border-[#FF9F00]' : 'text-white/80 hover:text-white border-transparent'
                }`}>
                {category.name}
              </Link>
            );
          })}
          <span className="ml-auto text-[10px] text-white/30 whitespace-nowrap hidden lg:block flex-shrink-0">
            Free delivery on ₹499+
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
