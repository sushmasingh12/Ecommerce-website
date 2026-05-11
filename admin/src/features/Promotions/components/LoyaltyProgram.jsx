// src/features/Promotions/components/LoyaltyProgram.jsx

const LoyaltyProgram = ({ loyalty }) => {
  if (!loyalty) return null;

  return (
    <div
      className="bg-surface-container-lowest rounded-xl p-6"
      style={{ boxShadow: "0 4px 6px -1px rgba(25,28,29,0.04), 0 10px 15px -3px rgba(25,28,29,0.08)" }}
    >
      <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-lg">loyalty</span>
        Loyalty Program
      </h4>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-surface-container-low flex justify-between items-center">
          <div>
            <p className="text-xs font-bold mb-1">Point Ratio</p>
            <p className="text-[10px] text-on-surface-variant">{loyalty.pointRatio}</p>
          </div>
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">
            edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-3 rounded-lg text-center"
            style={{ border: "1px solid rgba(196,197,217,0.10)" }}
          >
            <p className="text-lg font-bold">{loyalty.referrals}</p>
            <p className="text-[10px] text-on-secondary-container uppercase font-bold">Referrals</p>
          </div>
          <div
            className="p-3 rounded-lg text-center"
            style={{ border: "1px solid rgba(196,197,217,0.10)" }}
          >
            <p className="text-lg font-bold">{loyalty.conversionRate}</p>
            <p className="text-[10px] text-on-secondary-container uppercase font-bold">Conv. Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;