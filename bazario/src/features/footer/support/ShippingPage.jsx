import React, { useState } from "react";
import { Link } from "react-router-dom";

const SHIPPING_TABLE = [
  {
    method: "Standard Delivery",
    time: "4–7 Business Days",
    cost: "FREE on orders ₹499+",
    cost2: "₹49 below ₹499",
  },
  {
    method: "Express Delivery",
    time: "2–3 Business Days",
    cost: "₹99",
    cost2: "₹99 flat",
  },
  {
    method: "One-Day Delivery",
    time: "Next Business Day",
    cost: "₹199",
    cost2: "Selected cities only",
  },
  {
    method: "Same-Day Delivery",
    time: "Within 6–8 hours",
    cost: "₹249",
    cost2: "Metro cities only",
  },
  {
    method: "COD (Cash on Delivery)",
    time: "Standard time",
    cost: "₹40 handling fee",
    cost2: "Orders up to ₹10,000",
  },
];

const STEPS = [
  { icon: "inventory_2",     title: "Order Placed",    desc: "You place your order. Payment is confirmed instantly." },
  { icon: "warehouse",       title: "Processing",      desc: "Our warehouse team picks, packs, and quality checks your items within 24 hrs." },
  { icon: "local_shipping",  title: "Dispatched",      desc: "Your package is handed to our logistics partner. Tracking link sent to your email & SMS." },
  { icon: "pin_drop",        title: "Out for Delivery", desc: "Delivery agent picks up your package for last-mile delivery." },
  { icon: "home",            title: "Delivered",       desc: "Package delivered to your doorstep. Rate your experience!" },
];

const FAQ = [
  { q: "What happens if I miss the delivery?",    a: "Our delivery partner will attempt 3 deliveries. After that, the package is held at the nearest facility for 5 days. You can also reschedule via the tracking link." },
  { q: "Can I change my delivery address?",       a: "Yes, you can change the address before the order is dispatched from our warehouse. Go to My Orders → select order → Change Address." },
  { q: "Do you deliver to remote pin codes?",     a: "We deliver to 27,000+ pin codes across India. If your pin code is not serviceable, you'll be notified at checkout." },
  { q: "Is COD available everywhere?",            a: "COD is available in most pin codes for orders up to ₹10,000. An extra ₹40 handling fee is charged for COD orders." },
];

const ShippingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [pin, setPin]         = useState("");
  const [pinResult, setPinResult] = useState(null);

  const checkPin = () => {
    if (pin.length !== 6) return;
    // Mock result
    const serviceable = parseInt(pin) % 2 === 0;
    setPinResult(serviceable
      ? { ok: true,  msg: `✓ Delivery available to ${pin}. Expected: 4–6 business days.` }
      : { ok: false, msg: `✗ Standard delivery not available to ${pin}. Express may be available.` }
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="max-w-[1100px] mx-auto px-4">

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#131921] to-[#232f3e] rounded-2xl px-8 py-12 mb-8 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 h-full w-64 opacity-10">
            <span className="material-symbols-outlined text-[200px] text-white leading-none">local_shipping</span>
          </div>
          <span className="text-[#FF9F00] text-xs font-bold uppercase tracking-widest block mb-3">Delivery Information</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Shipping & Delivery
          </h1>
          <p className="text-white/60 text-sm max-w-xl">
            Fast, reliable delivery across 27,000+ pin codes in India. Free delivery on orders ₹499 and above.
          </p>

          {/* Pin checker */}
          <div className="mt-7 flex gap-2 max-w-sm">
            <input
              value={pin}
              onChange={e => { setPin(e.target.value.replace(/\D/g, '').slice(0, 6)); setPinResult(null); }}
              placeholder="Enter pin code to check delivery"
              className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-[#FF9F00]"
            />
            <button onClick={checkPin}
              className="px-5 py-2.5 bg-[#FF9F00] text-[#131921] rounded-lg text-sm font-bold hover:bg-[#e8900a] transition-all">
              Check
            </button>
          </div>
          {pinResult && (
            <p className={`mt-3 text-sm font-medium ${pinResult.ok ? 'text-green-300' : 'text-red-300'}`}>{pinResult.msg}</p>
          )}
        </div>

        {/* Shipping options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">local_shipping</span>
            <h2 className="font-bold text-gray-900">Shipping Options</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {["Delivery Method", "Estimated Time", "Charges", "Notes"].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SHIPPING_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{row.method}</td>
                    <td className="px-6 py-4 text-gray-600">{row.time}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${row.cost?.includes('FREE') ? 'text-green-600' : 'text-gray-800'}`}>{row.cost}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{row.cost2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-green-50 border-t border-green-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            <p className="text-sm text-green-700 font-medium">Get FREE standard delivery on every order above ₹499 — no coupon needed.</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">route</span>
            <h2 className="font-bold text-gray-900">How Your Order Gets to You</h2>
          </div>
          <div className="px-6 py-6">
            <div className="flex flex-col sm:flex-row gap-0">
              {STEPS.map((step, i) => (
                <div key={i} className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-3 flex-1 relative">
                  {/* connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden sm:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-100 z-0" />
                  )}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#131921] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#FF9F00] text-xl">{step.icon}</span>
                  </div>
                  <div className="sm:text-center pb-6 sm:pb-0">
                    <p className="text-sm font-bold text-gray-900 mb-1">{step.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed hidden sm:block">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two col info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Track order */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#FF9F00]">pin_drop</span>
              <h3 className="font-bold text-gray-900">Track Your Order</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Once dispatched, you'll receive an SMS and email with your tracking link. You can also track from <strong>My Orders</strong> in your account.
            </p>
            <Link to="/account/orders"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#131921] border border-gray-200 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all">
              <span className="material-symbols-outlined text-base">open_in_new</span>
              Go to My Orders
            </Link>
          </div>

          {/* International */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#FF9F00]">flight</span>
              <h3 className="font-bold text-gray-900">International Shipping</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              We currently ship to <strong>India only</strong>. International orders are not supported at this time. Stay tuned — we're expanding soon!
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'].map(c => (
                <span key={c} className="text-[10px] bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-full">{c}</span>
              ))}
              <span className="text-[10px] bg-[#FF9F00]/10 text-[#b36b00] font-semibold px-2.5 py-1 rounded-full">+50 more cities</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FF9F00]">quiz</span>
            <h2 className="font-bold text-gray-900">Shipping FAQs</h2>
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

export default ShippingPage;