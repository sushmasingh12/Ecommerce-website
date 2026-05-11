// src/features/Promotions/components/AIInsightChip.jsx

const AIInsightChip = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-8 right-8 flex items-center gap-3 px-4 py-2.5 bg-secondary-container text-primary rounded-full border border-white/20"
      style={{
        boxShadow: "0 4px 6px -1px rgba(25,28,29,0.04), 0 10px 15px -3px rgba(25,28,29,0.08)",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
      </span>
      <span className="text-xs font-bold tracking-tight">{message}</span>
    </div>
  );
};

export default AIInsightChip;