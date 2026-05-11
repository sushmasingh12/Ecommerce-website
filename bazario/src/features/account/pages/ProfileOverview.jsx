import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectAddresses, selectPayments } from '../store/accountSlice';
import { selectOrders } from '../../orders/store/orderSlice';
import AccountLayout from './Accountlayout';

const InfoRow = ({ label, value }) => (
  <div className="py-3 border-b border-gray-100 last:border-0 flex justify-between items-start gap-4">
    <span className="text-xs text-gray-500 shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-800 text-right">{value || '—'}</span>
  </div>
);

const ProfileOverview = () => {
  const user = useSelector(selectUser);
  const addresses = useSelector(selectAddresses);
  const payments = useSelector(selectPayments);
  const orders = useSelector(selectOrders);

  const defaultAddr = addresses.find(a => a.isDefault);
  const defaultPay  = payments.find(p => p.isDefault);
  const delivered   = orders.filter(o => o.status === 'Delivered').length;

  return (
    <AccountLayout>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Total Orders', value: orders.length, icon: 'shopping_bag', color: 'bg-blue-50 text-blue-600' },
          { label: 'Delivered',    value: delivered,      icon: 'check_circle', color: 'bg-green-50 text-green-600' },
          { label: 'Bazario Coins',value: user.points,    icon: 'workspace_premium', color: 'bg-yellow-50 text-[#b36b00]' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <span className={`material-symbols-outlined text-2xl mb-1 ${s.color.split(' ')[1]}`}>{s.icon}</span>
            <span className="text-xl font-bold text-gray-900">{s.value}</span>
            <span className="text-[10px] text-gray-500 mt-0.5">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">account_circle</span>
            <h2 className="font-bold text-gray-900">Personal Information</h2>
          </div>
          <Link to="/account/profile" className="text-xs text-blue-600 font-semibold hover:underline">Edit</Link>
        </div>
        <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user.name[0]}
          </div>
          <div>
            <p className="font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-500">{user.phone}</p>
            <span className="inline-block mt-1 text-[10px] bg-secondary/15 text-[#b36b00] font-bold px-2 py-0.5 rounded-full">
              {user.tier}
            </span>
          </div>
        </div>
        <div className="px-5 py-2">
          <InfoRow label="Gender" value={user.gender} />
          <InfoRow label="Date of Birth" value={user.dob} />
          <InfoRow label="Member Since" value={user.memberSince} />
        </div>
      </div>

      {/* Address & Payment quick view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
              <h3 className="font-bold text-gray-900 text-sm">Default Address</h3>
            </div>
            <Link to="/account/addresses" className="text-xs text-blue-600 font-semibold hover:underline">Manage</Link>
          </div>
          {defaultAddr ? (
            <p className="text-sm text-gray-600 leading-relaxed">
              {defaultAddr.name}<br/>
              {defaultAddr.flat}, {defaultAddr.area}<br/>
              {defaultAddr.city}, {defaultAddr.state} - {defaultAddr.pincode}
            </p>
          ) : (
            <p className="text-sm text-gray-400 ">No address saved.</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">payments</span>
              <h3 className="font-bold text-gray-900 text-sm">Default Payment</h3>
            </div>
            <Link to="/account/payments" className="text-xs text-blue-600 font-semibold hover:underline">Manage</Link>
          </div>
          {defaultPay ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600">{defaultPay.type === 'upi' ? 'account_balance_wallet' : 'credit_card'}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{defaultPay.type === 'upi' ? defaultPay.label : defaultPay.brand}</p>
                <p className="text-xs text-gray-500">{defaultPay.type === 'upi' ? defaultPay.upiId : `•••• ${defaultPay.last4}`}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400 ">No payment method saved.</p>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Quick Links</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { label: 'View All Orders',    icon: 'shopping_bag',  path: '/account/orders',    desc: `${orders.length} orders placed` },
            { label: 'My Wishlist',        icon: 'favorite',      path: '/wishlist',           desc: 'Saved items' },
            { label: 'Settings',           icon: 'settings',      path: '/account/settings',  desc: 'Notifications & privacy' },
            { label: 'Help & Support',     icon: 'help_outline',  path: '/account/help',      desc: '24/7 customer support' },
          ].map(({ label, icon, path, desc }) => (
            <Link key={path} to={path}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-all group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400 text-lg group-hover:text-secondary transition-colors">{icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-300 text-lg">chevron_right</span>
            </Link>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};

export default ProfileOverview;