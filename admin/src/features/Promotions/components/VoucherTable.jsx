// src/features/Promotions/components/VoucherTable.jsx

const VoucherTable = ({ vouchers }) => {
  if (!vouchers) return null;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold tracking-tight">Voucher Management</h4>
        <div className="flex gap-2">
          <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer">
            filter_list
          </span>
          <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer">
            download
          </span>
        </div>
      </div>

      <div
        className="bg-surface-container-lowest rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(196, 197, 217, 0.15)" }}
      >
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant/10">
            <tr>
              {["Coupon Code", "Type", "Status", "Usage", "Revenue"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-[10px] font-bold text-on-secondary-container uppercase tracking-widest"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="hover:bg-surface-bright transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-primary">{voucher.code}</span>
                </td>
                <td className="px-6 py-4 text-sm">{voucher.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${voucher.statusClass}`}
                  >
                    {voucher.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{voucher.usage}</td>
                <td className="px-6 py-4 text-sm font-semibold">{voucher.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherTable;