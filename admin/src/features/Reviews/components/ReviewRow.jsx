import { useState, useRef, useEffect } from "react";
import StarRating from "./StarRating";

const STATUS_LABELS = {
  approved: "Approved",
  rejected: "Rejected",
  spam: "Flagged as Spam",
};

const ReviewRow = ({ review, onApprove, onReject, onFlagSpam, onDelete, onReply, onView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const menuRef = useRef(null);
  const { id, product, customer, rating, text, aiLabel, aiLabelClass, aiIcon, aiIconAnimate, suspicious, media, status } = review;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const actions = [
    { label: "Approve", icon: "check_circle", color: "text-emerald-600", bg: "hover:bg-success-bg hover:text-surface", onClick: () => { onApprove(id); setLastAction("Approved"); }, active: status === "approved", activeBg: "bg-success-bg hover:text-surface" },
    { label: "Reply", icon: "reply", color: "text-blue-600", bg: "hover:bg-primary-bg hover:text-surface", onClick: () => { onReply(id); setLastAction("Replied"); }, active: lastAction === "Replied", activeBg: "bg-primary-bg hover:text-surface" },
    { label: "Reject", icon: "cancel", color: "text-orange-600", bg: "hover:bg-warning-bg hover:text-surface", onClick: () => { onReject(id); setLastAction("Rejected"); }, active: status === "rejected", activeBg: "bg-warning-bg hover:text-surface" },
    { label: "Spam", icon: "report", color: "text-amber-600", bg: "hover:bg-pending-bg hover:text-surface", onClick: () => { onFlagSpam(id); setLastAction("Spam"); }, active: status === "spam", activeBg: "bg-pending-bg hover:text-surface" },
    { label: "Delete", icon: "delete", color: "text-red-600", bg: "hover:bg-red-500 hover:text-surface", onClick: () => { onDelete(id); setLastAction("Deleted"); }, active: false, activeBg: "bg-red-500 hover:text-surface" },
  ];

  return (
    <tr className="hover:bg-surface-bright transition-colors group">
      {/* Product */}
      <td className="px-6 py-6 align-top">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="max-w-[150px]">
            <p className="text-sm font-bold text-on-surface leading-snug truncate">{product.name}</p>
            <p className="text-[11px] text-on-surface-variant font-medium">SKU: {product.sku}</p>
          </div>
        </div>
      </td>

      {/* Customer */}
      <td className="px-6 py-6 align-top">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${customer.avatarBg} flex items-center justify-center text-[10px] font-bold ${customer.avatarTextColor}`}>
            {customer.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">{customer.name}</p>
            {customer.verified ? (
              <p className="text-[11px] text-on-surface-variant">Verified Buyer</p>
            ) : (
              <p className="text-[11px] text-error font-bold italic">Unverified</p>
            )}
          </div>
        </div>
      </td>

      {/* Rating & Review */}
      <td className="px-6 py-6 align-top max-w-md">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <StarRating rating={rating} />
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded ml-2">
              {rating}.0
            </span>
          </div>
          <p className="text-sm text-on-surface leading-relaxed">
            {text}
            {!suspicious && (
              <span className="text-primary font-semibold cursor-pointer"> read more</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 ${aiLabelClass} text-[10px] font-bold rounded-md`}>
              <span className={`material-symbols-outlined text-xs ${aiIconAnimate ? "animate-pulse" : ""}`}>
                {aiIcon}
              </span>
              {aiLabel}
            </span>
          </div>
        </div>
      </td>

      {/* Media */}
      <td className="px-6 py-6 align-top">
        {media.length > 0 ? (
          <div className="flex gap-1.5 flex-wrap">
            {media.map((src, i) => (
              <div key={i} className="w-12 h-12 rounded-md bg-surface-container overflow-hidden ring-1 ring-outline-variant/20">
                <img src={src} alt="Review media" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-[10px] text-on-surface-variant font-medium italic">No media attached</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-6 py-6 align-top text-right">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-end gap-2 relative" ref={menuRef}>
            {/* View Button */}
            <button
              onClick={() => onView(id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high text-on-surface text-xs font-bold rounded-lg hover:bg-surface-container-highest transition-all group/view"
              title="View Details"
            >
              <span className="material-symbols-outlined text-sm group-hover/view:scale-110 transition-transform">visibility</span>
              View
            </button>

            {/* 3-Dot Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isMenuOpen ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"}`}
            >
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-xl border border-outline-variant/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 mb-1">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Actions</p>
                </div>
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      action.onClick();
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors ${action.active ? action.activeBg : `text-on-surface ${action.bg}`}`}
                  >
                    <span className={`material-symbols-outlined text-lg ${action.active ? "" : action.color}`}>
                      {action.icon}
                    </span>
                    {action.label}
                    {action.active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Status/Action Label */}
          {(status !== "pending" || lastAction) && (
            <div className={`px-3 py-2 rounded-lg mt-10 text-[10px] font-bold uppercase tracking-wider ${(status === "approved" || lastAction === "Approved") ? "bg-success-bg  text-surface" :
              (status === "rejected" || lastAction === "Rejected") ? "bg-warning-bg text-surface" :
                (status === "spam" || lastAction === "Spam") ? "bg-pending-bg text-surface" :
                  lastAction === "Replied" ? "bg-primary-bg text-surface" :
                    lastAction === "Deleted" ? "bg-red-500 text-surface" :
                      "bg-surface-container text-on-surface-variant"
              }`}>
              {lastAction || status}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ReviewRow;