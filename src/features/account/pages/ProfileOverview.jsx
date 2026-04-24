import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser, selectAddresses, selectPayments } from '../store/accountSlice';
import { selectOrders } from '../../orders/store/orderSlice';

const ProfileOverview = () => {
  const user = useSelector(selectUser);
  const addresses = useSelector(selectAddresses);
  const payments = useSelector(selectPayments);
  const orders = useSelector(selectOrders).slice(0, 2); // Show last 2 orders

  const defaultAddress = addresses.find(a => a.type === 'Default') || addresses[0];
  const defaultPayment = payments.find(p => p.isDefault) || payments[0];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Profile Summary Header */}
      <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 animate-in fade-in duration-700">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Account Overview</p>
          <h1 className="text-5xl md:text-6xl font-headline tracking-tighter text-black">{user.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="px-3 py-1 bg-gray-100 text-[10px] uppercase tracking-widest font-semibold border border-gray-200">
              {user.status}
            </span>
            <span className="text-sm font-light text-gray-500 italic">Since {user.memberSince}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Curation Points</p>
            <p className="text-3xl font-headline text-secondary">{user.points.toLocaleString()}</p>
          </div>
          <div className="mt-4 h-[1px] w-32 bg-gray-200"></div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Settings & Info */}
        <div className="lg:col-span-7 space-y-24">
          {/* Personal Information */}
          <section>
            <div className="flex justify-between items-baseline mb-10">
              <h2 className="text-2xl font-headline text-black">Personal Information</h2>
              <Link to="/account/profile" className="text-[10px] uppercase tracking-widest text-secondary hover:underline transition-all">Edit Details</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Legal Name</label>
                <p className="text-lg font-light border-b border-gray-100 pb-2">{user.legalName}</p>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <p className="text-lg font-light border-b border-gray-100 pb-2">{user.email}</p>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                <p className="text-lg font-light border-b border-gray-100 pb-2">{user.phone}</p>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Preferred Language</label>
                <p className="text-lg font-light border-b border-gray-100 pb-2">{user.language}</p>
              </div>
            </div>
          </section>

          {/* Saved Addresses & Payments */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-xl group">
              <div className="flex justify-between mb-8 text-black transition-colors group-hover:text-secondary border-b border-transparent group-hover:border-secondary/20 pb-4">
                <span className="material-symbols-outlined">location_on</span>
                <Link to="/account/addresses" className="text-[10px] uppercase tracking-widest text-black">Manage</Link>
              </div>
              <h3 className="text-lg font-headline mb-4">Saved Address</h3>
              {defaultAddress ? (
                <p className="text-sm leading-relaxed font-light text-gray-600">
                  {defaultAddress.street}<br/>
                  {defaultAddress.city}<br/>
                  {defaultAddress.postalCode}<br/>
                  {defaultAddress.country}
                </p>
              ) : (
                <p className="text-sm font-light text-gray-400 italic">No address saved.</p>
              )}
            </div>
            
            <div className="p-8 bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-xl group">
              <div className="flex justify-between mb-8 text-black transition-colors group-hover:text-secondary border-b border-transparent group-hover:border-secondary/20 pb-4">
                <span className="material-symbols-outlined">payments</span>
                <Link to="/account/payments" className="text-[10px] uppercase tracking-widest text-black">Manage</Link>
              </div>
              <h3 className="text-lg font-headline mb-4">Payment Method</h3>
              {defaultPayment ? (
                <p className="text-sm leading-relaxed font-light text-gray-600">
                  {defaultPayment.brand}<br/>
                  Ending in •••• {defaultPayment.last4}<br/>
                  Expires {defaultPayment.expiry}
                </p>
              ) : (
                <p className="text-sm font-light text-gray-400 italic">No payment method saved.</p>
              )}
            </div>
          </section>

          {/* Security & Preferences */}
          <section className="space-y-12 border-t border-gray-100 pt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-headline">Security</h3>
                <p className="text-sm font-light text-gray-500">Update your password and secure your account access.</p>
              </div>
              <button className="px-8 py-3 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Change Password</button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-headline">Notification Preferences</h3>
                <p className="text-sm font-light text-gray-500">Receive curated editorial updates and private sale access.</p>
              </div>
              <button className="px-8 py-3 border border-gray-200 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Manage Alerts</button>
            </div>
          </section>
        </div>

        {/* Right Column: Activity & Archive */}
        <aside className="lg:col-span-5 space-y-24">
          {/* Recent Acquisitions */}
          <section>
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-2xl font-headline text-black">Recent Acquisitions</h2>
              <Link to="/account/orders" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-secondary transition-colors">View History</Link>
            </div>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="flex gap-6 p-4 bg-white border border-gray-50 hover:border-gray-200 transition-all group">
                  <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={order.items[0].image} alt={order.items[0].name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${order.status === 'Delivered' ? 'text-secondary' : 'text-gray-400'}`}>
                        {order.status}
                      </p>
                      <h4 className="text-md font-headline font-medium line-clamp-1 uppercase">{order.items[0].name}</h4>
                      <p className="text-xs font-light text-gray-400 tracking-tighter">Order #{order.id}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-sm font-medium">£{order.total.toLocaleString()}</p>
                      <button className="text-[10px] uppercase tracking-widest border-b border-black/10 hover:border-black transition-colors">
                        {order.status === 'Delivered' ? 'Reorder' : 'Track'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Your Archive Shortcut */}
          <section className="bg-black p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-70">Curated Selection</p>
              <h2 className="text-3xl font-headline mb-6">Your Archive</h2>
              <p className="text-sm font-light mb-8 opacity-80 leading-relaxed">Access pieces currently held in your private collection for future acquisition.</p>
              <Link className="inline-flex items-center gap-4 group/btn" to="/wishlist">
                <span className="text-[10px] uppercase tracking-widest border-b border-white/40 group-hover/btn:border-white transition-all font-bold">Enter Archive</span>
                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            {/* Minimalist background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
          </section>
        </aside>
      </div>

      {/* Recently Viewed */}
      <section className="mt-40 border-t border-gray-100 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <h2 className="text-4xl font-headline tracking-tight uppercase">The Recently Viewed</h2>
          <p className="text-sm font-light text-gray-500 italic">Inspired by your latest explorations.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {[
            { tag: "L'Héritage", name: 'Wool-Blend Overcoat', price: '£1,250.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDONN4CxBG5kxR5uprBnkyDsM5TCp6R5hFAJdBZtiaFXoJ0wzKT93gbaLU-OdHPfRwpANKC6rWU0-IRBIIK5CU1eFZi2dGbXXMlcRM6StRjFZVUMnVsI1XCGU2f-hVveWr6GMya4kVsL1MfWmVDdOGwdTmxKHZVkAktdXqXQy4YTdrt9z3q_jm8i8O5MjQoPnvAhVasjvgKdkBDSpYhkuy-Ja6Act-KiklPlGxXp3M5uFbhvtzt0AYczKk5qCbIZnMPtwEZSz9bs-0' },
            { tag: 'Atelier V', name: 'Structured Leather Tote', price: '£2,400.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAm2Xrf23GxfEDP9fDNSNBlAS1PhbqiX-XaHoVnKDFPFwqWovLVWDQPh2wAPVvV_nH1xIXfEx3-sXjtPSms3WS0MLtVav-fIbKUXXKeBW-ruQ9Gl8QeMI4u8A10grzpdkvDjBUPIZn0sKyRX5vX2wnDISh779W34qrjBsNMknliQkLFqehydDVxQ6CGCoFqDbYLAPZcJEdA84KVqZtXy3cL8oFsp3VE-N6vmhFfPw3OLgMVfyTvGWBqHiDMWdmSz7040mFx2StTNo' },
            { tag: 'Horloge', name: 'Classic Chronograph', price: '£14,200.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGJCQHC-pE28aSF2FhBfQPtjmgnjWr7I3dH8zLliKytIqkrD60gj1OW4NKNOIDfSEWItnPxRdELQPPkoou8j4KPNx92H1uvcUiUhaapbgrea94FtIDlp4GXGDErGgGQe8VLDkhmiIFjzam2neFwCeoWEo5gI-CjsZzE1v0_5ZjxWQmsUfLeOkxtIjoMV4x6gQCBICE8FtJgre1UViV8mCSG-BX68vo9ftrB2tvPafe969Sxe0VCMyuIBLY18ukB65KBfAH1P3KRt4' },
            { tag: 'Sartorial', name: 'Pleated Wool Trousers', price: '£380.00', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIYYBmYiybL2eJiHanXasHHFGdv3jzMe-JYkFxT87Jb9K490dmR_WgzJxX1gLzDu55ELfo0onlbAQsW8ln9jzxGd2nGs0FXIc8tT3Wfstyn88XMTcC9NUE8KvHW-0nRxKX5SYRiPN25XHS_QJn7106Z7PLTxAI4CTLIwZfCm5nY0mLHkgM78M6IQXqSCeBaWCggIKg9w9HoumNq61ettVC7qvsFzltme82Jfgv5wzKlA4a13bGSyh7EN7uSugY4R__gItPku63qy4' }
          ].map((prod, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden relative">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={prod.img} alt={prod.name} />
                <button className="absolute top-4 right-4 text-white material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">favorite</button>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{prod.tag}</p>
                <h3 className="text-md font-medium tracking-tight uppercase">{prod.name}</h3>
                <p className="text-sm font-light text-gray-600">{prod.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProfileOverview;
