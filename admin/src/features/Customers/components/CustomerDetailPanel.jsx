// src/features/Customers/components/CustomerDetailPanel.jsx

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const DetailSkeleton = () => (
  <div className="pt-14 p-8 space-y-8 animate-pulse">
    <div className="space-y-2">
      <div className="h-6 w-40 bg-surface-container-high rounded" />
      <div className="h-4 w-56 bg-surface-container-high rounded" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="p-4 bg-surface-container-low rounded-2xl space-y-2">
          <div className="h-2.5 w-20 bg-surface-container-high rounded" />
          <div className="h-6 w-16 bg-surface-container-high rounded" />
          <div className="h-2.5 w-24 bg-surface-container-high rounded" />
        </div>
      ))}
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high" />
          <div className="space-y-1.5">
            <div className="h-2.5 w-12 bg-surface-container-high rounded" />
            <div className="h-3.5 w-32 bg-surface-container-high rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Customer Detail Panel ─────────────────────────────────────────────────────
const CustomerDetailPanel = ({ customerDetail, isLoading }) => {
  return (
    <div className="col-span-12 lg:col-span-4 sticky top-24">
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-white">
        {/* Card Header */}
        <div className="relative h-32 bg-gradient-to-br from-primary to-primary-container overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              alt="Abstract Decor"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVUFmcPMIZXNCK1kPFirNn_ZdS9iDhchgDZxqPhOp5-7_mtreuHviWrUea4TdF2NqNrym8KQkGp2GbjoItFsb-ejpi7_A8Iv6hc0RISzJMyR7Lu8NRC3Gn25aVB6naZzHtyUzlsnKj5AeTa5D2zk6aiHn5GW_3Il0oJ8dq_AQQJe0q38LzxQf0lL2HHOzWezLkHXTIGKjvjj7wBv0E9i5BZy8hA_vG2ZD7JMVtmrYyViFzM6VpCRIAbZB9YuOrD_LQE62M0sEZWyqy"
            />
          </div>

          {/* Avatar */}
          {!isLoading && customerDetail && (
            <div className="absolute -bottom-10 left-8">
              <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
                <img
                  alt={customerDetail.name}
                  className="w-full h-full rounded-xl object-cover"
                  src={customerDetail.avatar}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined text-[18px]">more_horiz</span>
            </button>
          </div>
        </div>

        {/* Profile Body */}
        {isLoading ? (
          <DetailSkeleton />
        ) : customerDetail ? (
          <div className="pt-14 p-8 space-y-8">
            {/* Name + Segment */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-extrabold text-on-surface tracking-tight">
                  {customerDetail.name}
                </h3>
                <span className="px-2 py-0.5 rounded bg-primary text-white text-[9px] font-black uppercase tracking-widest">
                  {customerDetail.segment}
                </span>
              </div>
              <p className="text-on-surface-variant font-medium">
                {customerDetail.company}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low rounded-2xl">
                <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-widest mb-1">
                  Lifetime Value
                </p>
                <p className="text-lg font-extrabold text-on-surface">
                  ${customerDetail.lifetimeValue.toLocaleString()}
                </p>
                <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  {customerDetail.ltv_change}
                </p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-2xl">
                <p className="text-[10px] font-bold text-on-secondary-container uppercase tracking-widest mb-1">
                  Order Volume
                </p>
                <p className="text-lg font-extrabold text-on-surface">
                  {customerDetail.orderVolume}
                </p>
                <p className="text-[10px] text-on-surface-variant font-medium mt-1">
                  {customerDetail.orderVolumeNote}
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-on-secondary-container uppercase tracking-widest">
                Contact Information
              </h4>
              <div className="space-y-3">
                {[
                  { icon: "mail", label: "Email", value: customerDetail.email },
                  { icon: "call", label: "Phone", value: customerDetail.phone },
                  { icon: "location_on", label: "Shipping", value: customerDetail.shipping },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">{label}</p>
                      <p className="text-sm font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-on-secondary-container uppercase tracking-widest">
                  Recent Orders
                </h4>
                <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">
                  View History
                </button>
              </div>
              <div className="space-y-2">
                {customerDetail.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-white/50 rounded-xl flex items-center justify-between ring-1 ring-outline-variant/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high overflow-hidden">
                        <img
                          alt="Product Thumb"
                          className="w-full h-full object-cover"
                          src={order.image}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-on-surface">
                          Order #{order.id}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          Placed {order.placedAgo}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-on-surface">
                      ${order.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <div className="p-4 bg-secondary-container/50 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  auto_awesome
                </span>
                <div>
                  <p className="text-[10px] font-black text-on-secondary-container uppercase tracking-widest mb-1">
                    AI Prediction
                  </p>
                  <p className="text-xs text-on-secondary-container leading-relaxed">
                    {customerDetail.aiInsight.split("Electronics").map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <span key={i}>
                          {part}
                          <span className="font-bold">Electronics</span>
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerDetailPanel;