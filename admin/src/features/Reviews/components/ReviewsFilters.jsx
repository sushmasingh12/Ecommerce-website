import { useState, useRef, useEffect } from "react";
// src/features/Reviews/components/ReviewsFilters.jsx

const FILTERS = ["All Reviews", "Pending", "Approved", "Spam"];
const RATINGS = [5, 4, 3, 2, 1];

const ReviewsFilters = ({ activeFilter, activeRating, onFilterChange, onRatingChange }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const moreFilters = [
    { label: "With Images", icon: "image" },
    { label: "With Replies", icon: "reply" },
    { label: "Reported Reviews", icon: "report" },
    { label: "Recent Reviews", icon: "schedule" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-surface-container rounded-xl">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeFilter === f
                ? "bg-surface-container-lowest shadow-sm text-on-surface"
                : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Rating + More Filters */}
      <div className="flex items-center gap-3 relative" ref={moreMenuRef}>


        <button
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-semibold text-sm ${isMoreMenuOpen
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
            }`}
        >
          <span className="material-symbols-outlined text-lg">filter_list</span>
          More Filters
        </button>

        {/* More Filters Dropdown */}
        {isMoreMenuOpen && (
          <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-2xl border border-outline-variant/10 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 mb-2 border-b border-outline-variant/5">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">More Filters</p>
            </div>

            {/* Rating Filter inside dropdown */}
            <div className="px-4 py-2">
              <p className="text-[11px] font-bold text-on-surface mb-2">By Rating</p>
              <div className="flex gap-1.5">
                {RATINGS.map((r) => (
                  <button
                    key={r}
                    onClick={() => onRatingChange(r)}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-md border transition-all ${activeRating === r
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-on-surface-variant border-outline-variant/20 hover:border-primary/50"
                      }`}
                  >
                    {r}★
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-outline-variant/5 my-2"></div>

            {moreFilters.map((filter, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface hover:bg-surface-container-low transition-colors group"
              >
                <span className="material-symbols-outlined text-lg text-on-surface-variant group-hover:text-primary transition-colors">
                  {filter.icon}
                </span>
                {filter.label}
              </button>
            ))}

            <div className="px-4 pt-3 mt-2 border-t border-outline-variant/5 flex gap-2">
              <button
                onClick={() => {
                  onFilterChange("All Reviews");
                  onRatingChange(null);
                  setIsMoreMenuOpen(false);
                }}
                className="flex-1 py-2 text-[10px] font-bold text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="flex-1 py-2 text-[10px] font-bold bg-primary text-white rounded-lg transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsFilters;