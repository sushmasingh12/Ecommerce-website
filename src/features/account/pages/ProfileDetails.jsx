import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectUser, updateProfile } from '../store/accountSlice';
import AccountLayout from './Accountlayout';

const Field = ({ label, name, register, validation, type = 'text', options, error }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
    {options ? (
      <select {...register(name, validation)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} {...register(name, validation)}
        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${error ? 'border-red-500' : 'border-gray-200'}`} />
    )}
    {error && <p className="text-[10px] text-red-500 mt-1">{error.message}</p>}
  </div>
);

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [saved, setSaved]   = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors } } = useForm({
    defaultValues: { ...user }
  });

  const { register: registerPw, handleSubmit: handleSubmitPw, watch: watchPw, formState: { errors: pwErrors }, reset: resetPw } = useForm({
    defaultValues: { current: '', newPw: '', confirm: '' }
  });

  const newPw = watchPw('newPw');

  const onProfileSubmit = (data) => {
    dispatch(updateProfile(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const onPwSubmit = (data) => {
    console.log("Password change request:", data);
    setPwSaved(true);
    resetPw();
    setTimeout(() => setPwSaved(false), 2500);
  };

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

        <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
          <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name"    name="name"      register={registerProfile} validation={{ required: "Required" }} error={profileErrors.name} />
            <Field label="Legal Name"   name="legalName" register={registerProfile} error={profileErrors.legalName} />
            <Field label="Email Address" name="email"    register={registerProfile} validation={{ required: "Required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }} type="email" error={profileErrors.email} />
            <Field label="Phone Number" name="phone"     register={registerProfile} type="tel" error={profileErrors.phone} />
            <Field label="Gender"       name="gender"    register={registerProfile}
              options={['Male', 'Female', 'Other', 'Prefer not to say']} error={profileErrors.gender} />
            <Field label="Date of Birth" name="dob"      register={registerProfile} error={profileErrors.dob} />
            <Field label="Preferred Language" name="language" register={registerProfile}
              options={['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi']} error={profileErrors.language} />
          </div>

          <div className="px-5 pb-5">
            <button type="submit"
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-container'
              }`}>
              {saved ? '✓ Changes Saved' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">lock</span>
          <h2 className="font-bold text-gray-900">Change Password</h2>
        </div>
        <form onSubmit={handleSubmitPw(onPwSubmit)}>
          <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Current Password" name="current" register={registerPw} validation={{ required: "Required" }} type="password" error={pwErrors.current} />
            </div>
            <Field label="New Password" name="newPw" register={registerPw} validation={{ required: "Required", minLength: { value: 6, message: "Min 6 chars" } }} type="password" error={pwErrors.newPw} />
            <Field label="Confirm Password" name="confirm" register={registerPw} 
              validation={{ 
                required: "Required", 
                validate: value => value === newPw || "Passwords mismatch" 
              }} type="password" error={pwErrors.confirm} />
          </div>
          <div className="px-5 pb-5">
            <button type="submit"
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                pwSaved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-container'
              }`}>
              {pwSaved ? '✓ Password Updated' : 'Update Password'}
            </button>
          </div>
        </form>
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