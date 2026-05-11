import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_DATA } from '../data/navigationData';

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState(null);

  const activeCategory = useMemo(() => {
    const active = NAV_DATA.find(
      (cat) => location.pathname.startsWith(cat.path) && cat.subcategories
    );
    return active?.name || null;
  }, [location.pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen, closeSidebar]);

  const toggleCategory = (name) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-90 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-hidden="true"
      />

      <aside
        aria-hidden={!isSidebarOpen}
        className={`fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-primary z-100 shadow-2xl border-r border-white/10 flex flex-col p-8 sm:p-10 lg:p-12 overflow-y-auto transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="font-headline text-2xl tracking-tight text-white">
              The Collection
            </h2>
            <p className="font-label text-xs uppercase tracking-widest text-white/50 mt-1">
              Curated Excellence
            </p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="hover:rotate-90 transition-transform duration-500 cursor-pointer text-white/60 hover:text-secondary"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          {NAV_DATA.map((category) => {
            const hasSub = category.subcategories && category.subcategories.length > 0;
            const isOpen =
              openCategory === category.name ||
              (openCategory === null && activeCategory === category.name);

            return (
              <div key={category.name} className="border-b border-white/10 pb-4 last:border-0">
                <div
                  className="flex items-center justify-between cursor-pointer group mb-2"
                  onClick={() => hasSub ? toggleCategory(category.name) : closeSidebar()}
                >
                  <div className="flex items-center gap-4">
                    {category.icon && (
                      <span
                        className={`material-symbols-outlined text-lg ${
                          isOpen ? 'text-secondary' : 'text-white/50'
                        }`}
                      >
                        {category.icon}
                      </span>
                    )}

                    {hasSub ? (
                      <span
                        className={`font-label text-xs uppercase tracking-[0.2em] transition-colors ${
                          isOpen
                            ? 'text-secondary font-bold'
                            : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {category.name}
                      </span>
                    ) : (
                      <Link
                        to={category.path}
                        onClick={closeSidebar}
                        className="font-label text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white"
                      >
                        {category.name}
                      </Link>
                    )}
                  </div>

                  {hasSub && (
                    <span
                      className={`material-symbols-outlined text-sm transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-secondary' : 'text-white/30'
                      }`}
                    >
                      expand_more
                    </span>
                  )}
                </div>

                {hasSub && (
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="space-y-4 pl-9">
                      {category.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            onClick={closeSidebar}
                            className={`font-body text-sm font-light transition-all duration-300 block hover:translate-x-2 ${
                              location.pathname === sub.path
                                ? 'text-secondary font-medium'
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-auto pt-14">
          <div className="bg-primary-container p-6 flex flex-col items-start gap-4 border border-white/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">
              Limited Release
            </span>

            <p className="font-headline text-lg leading-tight text-white">
              The Autumnal Silk Collection is now live.
            </p>

            <Link
              to="/collections"
              onClick={closeSidebar}
              className="bg-secondary text-primary px-6 py-3 font-label text-[10px] uppercase tracking-widest font-bold hover:bg-secondary-container transition-colors"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;