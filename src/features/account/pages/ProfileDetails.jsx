import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateProfile } from '../store/accountSlice';

const ProfileDetails = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(user);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mb-16">
        <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Settings</p>
        <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-black">Personal Information</h1>
        <p className="text-gray-500 font-light mt-4">Manage your identity and authentication details across the Maison.</p>
      </header>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">Full Legal Name</label>
            <input 
              className="bg-transparent border-b border-gray-200 py-3 font-light text-lg focus:border-black outline-none transition-all placeholder:text-gray-200"
              type="text"
              value={formData.legalName}
              onChange={(e) => setFormData({...formData, legalName: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">Display Name</label>
            <input 
              className="bg-transparent border-b border-gray-200 py-3 font-light text-lg focus:border-black outline-none transition-all placeholder:text-gray-200"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">Email Address</label>
            <input 
              className="bg-transparent border-b border-gray-200 py-3 font-light text-lg focus:border-black outline-none transition-all placeholder:text-gray-200"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">Phone Number</label>
            <input 
              className="bg-transparent border-b border-gray-200 py-3 font-light text-lg focus:border-black outline-none transition-all placeholder:text-gray-200"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-400">Preferred Language</label>
            <select 
              className="bg-transparent border-b border-gray-200 py-3 font-light text-lg focus:border-black outline-none transition-all appearance-none"
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
            >
              <option>English (UK)</option>
              <option>French (FR)</option>
              <option>Italian (IT)</option>
              <option>Japanese (JP)</option>
            </select>
          </div>
        </div>

        <div className="pt-12 flex items-center gap-8">
          <button 
            onClick={handleSave}
            className="bg-black text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all shadow-xl active:scale-95"
          >
            Save Changes
          </button>
          {isSuccess && (
            <span className="text-secondary font-label text-xs uppercase tracking-widest animate-pulse">
              Profile updated successfully
            </span>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfileDetails;
