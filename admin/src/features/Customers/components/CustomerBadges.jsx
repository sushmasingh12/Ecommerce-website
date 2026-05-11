// src/features/Customers/components/CustomerBadges.jsx

const SEGMENT_STYLES = {
  VIP: "bg-secondary-container text-on-secondary-container",
  Returning: "bg-surface-container-high text-on-surface-variant",
  New: "bg-primary-fixed text-on-primary-fixed-variant",
};

export const SegmentBadge = ({ segment }) => (
  <span
    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tight ${
      SEGMENT_STYLES[segment] || "bg-surface-container-high text-on-surface-variant"
    }`}
  >
    {segment}
  </span>
);

export const StatusBadge = ({ status }) => {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`w-1 h-1 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
};