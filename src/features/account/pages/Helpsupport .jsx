import React, { useState } from 'react';
import AccountLayout from './Accountlayout';

const FAQS = [
  { q: 'How do I track my order?', a: 'Go to My Orders → select your order → click Track Order. You\'ll see real-time delivery updates from our logistics partner.' },
  { q: 'What is Bazario\'s return policy?', a: 'Most items can be returned within 30 days of delivery. Items must be unused, unwashed and in original packaging with tags intact. Some categories like innerwear and perishables are non-returnable.' },
  { q: 'When will I get my refund?', a: 'Refunds are processed within 2-5 business days after we receive the returned item. UPI/wallet refunds are instant once approved. Card refunds take 5-7 business days.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be cancelled before they are shipped. Go to My Orders and click Cancel. Once shipped, you can return after delivery.' },
  { q: 'How do I use a coupon code?', a: 'Enter your coupon code in the "Apply Coupon" field at checkout. Valid coupons will automatically deduct the discount from your total.' },
  { q: 'Is Cash on Delivery (COD) available?', a: 'Yes! COD is available for orders under ₹10,000 in most pin codes. Extra ₹40 handling charge applies for COD orders.' },
  { q: 'How do I earn and use Bazario Coins?', a: 'You earn 1 Bazario Coin for every ₹100 spent. Coins can be redeemed at checkout (1 Coin = ₹1). Coins expire after 12 months.' },
];

const CATEGORIES = [
  { icon: 'local_shipping',      label: 'Order & Delivery',  topics: ['Track Order', 'Delivery Issues', 'Wrong Item'] },
  { icon: 'assignment_return',   label: 'Returns & Refunds', topics: ['Start a Return', 'Refund Status', 'Exchange'] },
  { icon: 'payments',            label: 'Payments',          topics: ['Failed Payment', 'Refund to Bank', 'EMI Queries'] },
  { icon: 'account_circle',      label: 'My Account',        topics: ['Login Issues', 'Update Profile', 'Delete Account'] },
  { icon: 'inventory_2',         label: 'Products',          topics: ['Authenticity', 'Size Guide', 'Product Info'] },
  { icon: 'workspace_premium',   label: 'Bazario Coins',     topics: ['Earn Coins', 'Redeem Coins', 'Coin Expiry'] },
];

const HelpSupport = () => {
  const [openFaq, setOpenFaq]   = useState(null);
  const [query, setQuery]       = useState('');
  const [sent, setSent]         = useState(false);
  const [activeTab, setActiveTab] = useState('faq');

  const filteredFaqs = FAQS.filter(f =>
    query === '' || f.q.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AccountLayout>
      {/* Header card */}
      <div className="bg-gradient-to-r from-[#131921] to-[#232f3e] rounded-xl p-6 mb-4 text-white">
        <div className="flex items-start gap-3 mb-4">
          <span className="material-symbols-outlined text-[#FF9F00] text-3xl">support_agent</span>
          <div>
            <h2 className="font-bold text-lg">Help & Support</h2>
            <p className="text-white/70 text-sm">We're here 24/7. How can we help you?</p>
          </div>
        </div>
        {/* Search */}
        <div className="flex gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search for help topics..."
            className="flex-1 px-4 py-2.5 rounded-lg text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-[#FF9F00] focus:ring-1 focus:ring-[#FF9F00]" />
          <button className="px-5 py-2.5 bg-[#FF9F00] text-[#131921] rounded-lg text-sm font-bold">
            Search
          </button>
        </div>
      </div>

      {/* Contact us quick cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { icon: 'chat',          label: 'Live Chat',     sub: 'Avg 2 min wait',  color: 'text-green-500' },
          { icon: 'call',          label: 'Call Us',       sub: '1800-123-4567',   color: 'text-blue-500'  },
          { icon: 'mail',          label: 'Email Us',      sub: 'Reply in 24 hrs', color: 'text-[#FF9F00]' },
        ].map(({ icon, label, sub, color }) => (
          <button key={label}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md hover:border-gray-200 transition-all">
            <span className={`material-symbols-outlined text-2xl mb-1.5 ${color}`}>{icon}</span>
            <span className="text-xs font-bold text-gray-800">{label}</span>
            <span className="text-[10px] text-gray-400 mt-0.5">{sub}</span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="flex border-b border-gray-100">
          {[['faq', 'FAQs', 'quiz'], ['categories', 'Browse Topics', 'category'], ['contact', 'Contact Us', 'mail']].map(([id, label, icon]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold transition-all border-b-2 ${
                activeTab === id ? 'border-[#FF9F00] text-[#131921]' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              <span className="material-symbols-outlined text-base">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="px-5 py-4">
          {/* FAQs */}
          {activeTab === 'faq' && (
            <div className="space-y-2">
              {filteredFaqs.length === 0 ? (
                <p className="text-center py-8 text-gray-400 text-sm">No results for "{query}"</p>
              ) : filteredFaqs.map((faq, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-all">
                    <span className="text-sm font-semibold text-gray-800 pr-4">{faq.q}</span>
                    <span className="material-symbols-outlined text-gray-400 flex-shrink-0 text-lg">
                      {openFaq === i ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                      <p className="text-sm text-gray-600 leading-relaxed pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Categories */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map(({ icon, label, topics }) => (
                <div key={label} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[#FF9F00]">{icon}</span>
                    <h3 className="text-sm font-bold text-gray-900">{label}</h3>
                  </div>
                  <div className="space-y-1.5">
                    {topics.map(t => (
                      <button key={t} className="flex items-center gap-2 text-xs text-blue-600 hover:underline w-full text-left">
                        <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact form */}
          {activeTab === 'contact' && (
            <div>
              {sent ? (
                <div className="py-10 text-center">
                  <span className="material-symbols-outlined text-5xl text-green-400">check_circle</span>
                  <p className="font-bold text-gray-900 mt-3">Message Sent!</p>
                  <p className="text-sm text-gray-500 mt-1">Our team will respond within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-sm text-blue-600 hover:underline">Send another message</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Issue Category</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]">
                      {CATEGORIES.map(c => <option key={c.label}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Order ID (optional)</label>
                    <input placeholder="e.g. BZ-20241201"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Describe Your Issue</label>
                    <textarea rows={4} placeholder="Tell us what happened..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00] resize-none" />
                  </div>
                  <button onClick={() => setSent(true)}
                    className="w-full py-3 bg-[#131921] text-white rounded-lg text-sm font-bold hover:bg-[#232f3e] transition-all">
                    Submit Request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* App download nudge */}
      <div className="bg-[#131921] rounded-xl p-5 flex items-center gap-4">
        <span className="material-symbols-outlined text-[#FF9F00] text-3xl flex-shrink-0">phone_android</span>
        <div>
          <p className="text-white font-bold text-sm">Get faster support on the Bazario app</p>
          <p className="text-white/50 text-xs mt-0.5">Live chat, instant tracking & easy returns — all in one place</p>
        </div>
        <button className="ml-auto flex-shrink-0 px-4 py-2 bg-[#FF9F00] text-[#131921] rounded-lg text-xs font-bold hover:bg-[#e8900a] transition-all">
          Download
        </button>
      </div>
    </AccountLayout>
  );
};

export default HelpSupport;