// src/features/Settings/components/SecuritySection.jsx

const SecuritySection = ({ security }) => (
  <section id="security" className="space-y-6">
    <div className="flex items-center gap-2 mb-2">
      <span className="material-symbols-outlined text-primary">verified_user</span>
      <h2 className="text-xl font-bold tracking-tight">Security &amp; Governance</h2>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {/* Login History */}
      <div className="col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
        <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">history</span> Login History
        </h3>
        <div className="space-y-4">
          {security.loginHistory.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between py-3 border-b border-surface-container-low last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  {session.icon}
                </span>
                <div>
                  <p className="text-sm font-bold">{session.device}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase font-semibold">
                    {session.location}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-bold ${
                  session.isCurrent ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {session.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2FA Card */}
      <div className="bg-gradient-to-br from-inverse-surface to-slate-900 p-8 rounded-2xl text-white flex flex-col justify-between">
        <div>
          <span
            className="material-symbols-outlined text-primary-fixed mb-4 text-3xl block"
          >
            authenticator
          </span>
          <h3 className="text-lg font-bold leading-tight">Two-Factor Authentication</h3>
          <p className="text-xs text-slate-400 mt-2">
            Enhanced protection for high-value operations and withdrawals.
          </p>
        </div>
        <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition-all">
          Setup 2FA
        </button>
      </div>
    </div>
  </section>
);

export default SecuritySection;