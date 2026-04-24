import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateNotifications } from '../store/accountSlice';
import AccountLayout from './Accountlayout';

const Toggle = ({ checked, onChange }) => (
  <button onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#FF9F00]' : 'bg-gray-200'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const Section = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
      <span className="material-symbols-outlined text-[#FF9F00]">{icon}</span>
      <h2 className="font-bold text-gray-900">{title}</h2>
    </div>
    <div className="divide-y divide-gray-100">{children}</div>
  </div>
);

const Row = ({ label, desc, checked, onChange }) => (
  <div className="px-5 py-4 flex items-center justify-between gap-4">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const notif = user.notifications;

  const toggle = key => dispatch(updateNotifications({ [key]: !notif[key] }));

  const [theme, setTheme]     = useState('light');
  const [lang, setLang]       = useState('English');
  const [currency, setCurrency] = useState('INR (₹)');
  const [saved, setSaved]     = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <AccountLayout>
      {/* Notifications */}
      <Section icon="notifications" title="Notification Preferences">
        <Row label="Email Notifications" desc="Order updates, offers, and newsletters"
          checked={notif.email} onChange={() => toggle('email')} />
        <Row label="SMS Notifications" desc="Order alerts and OTP on your mobile"
          checked={notif.sms} onChange={() => toggle('sms')} />
        <Row label="WhatsApp Updates" desc="Order tracking and support on WhatsApp"
          checked={notif.whatsapp} onChange={() => toggle('whatsapp')} />
        <Row label="Promotional Offers" desc="Deals, discounts and new arrivals"
          checked={notif.offers} onChange={() => toggle('offers')} />
      </Section>

      {/* Appearance */}
      <Section icon="palette" title="Appearance">
        <div className="px-5 py-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Theme</p>
          <div className="flex gap-2">
            {['light', 'dark', 'system'].map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold border capitalize transition-all ${
                  theme === t ? 'bg-[#131921] text-white border-[#131921]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Language & Region */}
      <Section icon="language" title="Language & Region">
        <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label>
            <select value={lang} onChange={e => setLang(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]">
              {['English','Hindi','Tamil','Telugu','Bengali','Marathi'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Currency</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9F00]">
              {['INR (₹)','USD ($)','EUR (€)','GBP (£)'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="px-5 pb-5">
          <button onClick={handleSave}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-[#131921] text-white hover:bg-[#232f3e]'
            }`}>
            {saved ? '✓ Saved' : 'Save Preferences'}
          </button>
        </div>
      </Section>

      {/* Privacy */}
      <Section icon="privacy_tip" title="Privacy & Security">
        <Row label="Two-Factor Authentication" desc="Add extra security to your account"
          checked={false} onChange={() => {}} />
        <Row label="Login Alerts" desc="Get notified of new logins to your account"
          checked={true} onChange={() => {}} />
        <div className="px-5 py-4">
          <button className="text-sm font-semibold text-blue-600 hover:underline">Download My Data</button>
          <span className="mx-3 text-gray-200">|</span>
          <button className="text-sm font-semibold text-blue-600 hover:underline">Manage Cookies</button>
        </div>
      </Section>

      {/* Danger zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-red-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-400">warning</span>
          <h2 className="font-bold text-gray-900">Account Actions</h2>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Deactivate Account</p>
              <p className="text-xs text-gray-400 mt-0.5">Temporarily pause your Bazario account</p>
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex-shrink-0">
              Deactivate
            </button>
          </div>
          <div className="px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-red-600">Delete Account</p>
              <p className="text-xs text-gray-400 mt-0.5">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-all flex-shrink-0">
              Delete
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Settings;