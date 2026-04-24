import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateProfile } from '../store/accountSlice';
import AccountLayout from './Accountlayout';

const Field = ({ label, name, value, onChange, type = 'text', options }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
    {options ? (
      <select name={name} value={value} onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} name={name} value={value} onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
    )}
  </div>
);

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [form, setForm]     = useState({ ...user });
  const [saved, setSaved]   = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwSaved, setPwSaved] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => { dispatch(updateProfile(form)); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <AccountLayout>
      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">account_circle</span>
          <h2 className="font-bold text-gray-900">Profile Information</h2>
        </div>

        {/* Avatar */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {user.name[0]}
          </div>
          <div>
            <button className="text-sm font-semibold text-blue-600 hover:underline block mb-1">Upload Photo</button>
            <p className="text-xs text-gray-400">JPG, PNG up to 2MB</p>
          </div>
        </div>

        <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name"    name="name"      value={form.name}      onChange={handleChange} />
          <Field label="Legal Name"   name="legalName" value={form.legalName} onChange={handleChange} />
          <Field label="Email Address" name="email"    value={form.email}     onChange={handleChange} type="email" />
          <Field label="Phone Number" name="phone"     value={form.phone}     onChange={handleChange} type="tel" />
          <Field label="Gender"       name="gender"    value={form.gender}    onChange={handleChange}
            options={['Male', 'Female', 'Other', 'Prefer not to say']} />
          <Field label="Date of Birth" name="dob"      value={form.dob}       onChange={handleChange} />
          <Field label="Preferred Language" name="language" value={form.language} onChange={handleChange}
            options={['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi']} />
        </div>

        <div className="px-5 pb-5">
          <button onClick={handleSave}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-container'
            }`}>
            {saved ? '✓ Changes Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">lock</span>
          <h2 className="font-bold text-gray-900">Change Password</h2>
        </div>
        <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password',     key: 'newPw'   },
            { label: 'Confirm Password', key: 'confirm' },
          ].map(({ label, key }) => (
            <div key={key} className={key === 'current' ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
              <input type="password" value={pwForm[key]} onChange={e => setPwForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
            </div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <button onClick={() => { setPwSaved(true); setTimeout(() => setPwSaved(false), 2500); }}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              pwSaved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-container'
            }`}>
            {pwSaved ? '✓ Password Updated' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-red-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-red-400">warning</span>
          <h2 className="font-bold text-gray-900">Danger Zone</h2>
        </div>
        <div className="px-5 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">Delete Account</p>
            <p className="text-xs text-gray-400 mt-0.5">This will permanently delete your account and all associated data.</p>
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-all shrink-0">
            Delete
          </button>
        </div>
      </div>
    </AccountLayout>
  );
};

export default ProfileDetails;