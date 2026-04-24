import React, { useState } from "react";
import { Link } from "react-router-dom";

const POLICY = [
  { cat: "Clothing & Fashion",    days: 30, icon: "checkroom",     note: "Unworn, tags intact, original packaging" },
  { cat: "Footwear",              days: 30, icon: "steps",         note: "Unworn, original box required" },
  { cat: "Electronics",           days: 10, icon: "devices",       note: "Sealed box, all accessories included" },
  { cat: "Beauty & Skincare",     days: 15, icon: "spa",           note: "Unopened, sealed products only" },
  { cat: "Books & Stationery",    days: 10, icon: "menu_book",     note: "Unmarked, in original condition" },
  { cat: "Innerwear & Lingerie",  days: 0,  icon: "block",         note: "Non-returnable for hygiene reasons" },
  { cat: "Perishables / Food",    days: 0,  icon: "block",         note: "Non-returnable" },
];

const STEPS = [
  { icon: "assignment_return", step: "01", title: "Initiate Return",    desc: "Go to My Orders → select item → click 'Return/Exchange'. Choose reason and upload photo if needed." },
  { icon: "inventory_2",       step: "02", title: "Pack & Schedule",    desc: "Pack the item securely in original packaging. Our pickup partner will arrive in 1–2 days." },
  { icon: "local_shipping",    step: "03", title: "Pickup",             desc: "Hand the package to our delivery partner. You'll get a pickup confirmation SMS." },
  { icon: "account_balance_wallet", step: "04", title: "Refund Issued", desc: "Refund processed within 5–7 business days after we inspect the return at our warehouse." },
];

const REFUND_METHODS = [
  { method: "UPI / Wallets",     time: "Instant — 2 hrs",     icon: "account_balance_wallet" },
  { method: "Credit / Debit Card", time: "5–7 business days", icon: "credit_card" },
  { method: "Net Banking",       time: "3–5 business days",   icon: "account_balance" },
  { method: "Bazario Coins",     time: "Instant",             icon: "workspace_premium" },
  { method: "COD orders",        time: "2–3 business days (bank transfer)", icon: "payments" },
];

const FAQ = [
  { q: "Can I return just one item from a combo/bundle?",    a: "Yes, individual items from a bundle can be returned. The refund will be proportional to the item's price within the bundle." },
  { q: "What if I received a damaged or wrong item?",        a: "We're sorry! Go to My Orders → select the item → click 'Report Issue'. Upload photos and we'll resolve it within 24 hours — replacement or full refund." },
  { q: "Can I exchange for a different size or colour?",     a: "Yes! Select 'Exchange' instead of 'Return' in My Orders. Exchanges are free and processed within 5–7 days." },
  { q: "What if I miss the return pickup?",                  a: "Our partner makes 3 pickup attempts. You can also drop off at any Delhivery or BlueDart service point using the return label from your email." },
  { q: "Is there a restocking fee?",                        a: "No. Bazario does not charge any restocking or return processing fee for eligible returns." },
];

const ReturnsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-[1100px] mx-auto px-4">

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#131921] to-[#232f3e] rounded-2xl px-8 py-12 mb-8 text-white relative overflow-hidden">
          <div className="absolute right-4 top-0 h-full opacity-10 flex items-center">
            <span className="material-symbols-outlined text-[180px]">assignment_return</span>
          </div>
          <span className="text-[#FF9F00] text-xs font-bold uppercase tracking-widest block mb-3">Easy Returns</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Returns & Refunds
          </h1>
          <p className="text-white/60 text-sm max-w-xl mb-6">
            Hassle-free returns within 30 days. Free pickup from your doorstep. No questions asked for most categories.
          </p>
          <div className="flex flex-wrap gap-4">
            {["30-Day Return Window", "Free Pickup", "Fast Refunds", "No Restocking Fee"].map(b => (
              <div key={b} className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-[#FF9F00] material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Return process */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">route</span>
            <h2 className="font-bold text-gray-900">How to Return an Item</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {STEPS.map((s) => (
              <div key={s.step} className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-gray-100" style={{ fontFamily: 'Sora, sans-serif' }}>{s.step}</span>
                  <div className="w-10 h-10 rounded-full bg-[#131921] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#FF9F00] text-lg">{s.icon}</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-gray-100 bg-blue-50">
            <Link to="/account/orders"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline">
              <span className="material-symbols-outlined text-base">open_in_new</span>
              Go to My Orders to start a return
            </Link>
          </div>
        </div>

        {/* Category policy */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">policy</span>
            <h2 className="font-bold text-gray-900">Return Policy by Category</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Category", "Return Window", "Condition"].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {POLICY.map((row) => (
                  <tr key={row.cat} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-base">{row.icon}</span>
                        <span className="font-medium text-gray-800">{row.cat}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {row.days === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                          <span className="material-symbols-outlined text-xs">block</span>
                          Non-Returnable
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                          <span className="material-symbols-outlined text-xs">check</span>
                          {row.days} Days
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refund methods */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">account_balance_wallet</span>
            <h2 className="font-bold text-gray-900">Refund Timelines</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {REFUND_METHODS.map((r) => (
              <div key={r.method} className="flex items-center gap-3 border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-all">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-gray-600 text-lg">{r.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.method}</p>
                  <p className="text-xs text-green-600 font-medium mt-0.5">{r.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-6 mb-6 bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-yellow-500 text-lg flex-shrink-0 mt-0.5">info</span>
            <p className="text-xs text-yellow-800">Refund timelines start from the date we receive the item at our warehouse, not the pickup date.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">quiz</span>
            <h2 className="font-bold text-gray-900">Returns FAQs</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {FAQ.map((f, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-all">
                  <span className="text-sm font-semibold text-gray-800 pr-4">{f.q}</span>
                  <span className="material-symbols-outlined text-gray-400 flex-shrink-0">{openFaq === i ? 'expand_less' : 'expand_more'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed pt-3">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default ReturnsPage;