import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectAddresses, addAddress, removeAddress, setDefaultAddress } from '../store/accountSlice';
import AccountLayout from './Accountlayout';

const EMPTY = { type: 'Home', name: '', phone: '', flat: '', area: '', city: '', state: '', pincode: '', isDefault: false };
const STATES = ['Uttar Pradesh','Delhi','Maharashtra','Karnataka','Tamil Nadu','West Bengal','Haryana','Gujarat','Telangana','Rajasthan'];

const AddressForm = ({ initial = EMPTY, onSave, onCancel }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: initial
  });

  const addressType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-4">
      <h3 className="font-bold text-gray-900 mb-4 text-sm">Add New Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Type */}
        <div className="sm:col-span-2 flex gap-2">
          {['Home','Work','Other'].map(t => (
            <button key={t} type="button" onClick={() => setValue('type', t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                addressType === t ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}>
              {t}
            </button>
          ))}
        </div>
        {[
          { label: 'Full Name', name: 'name', full: false, required: true },
          { label: 'Phone Number', name: 'phone', full: false, required: true },
          { label: 'Flat / House / Apartment', name: 'flat', full: true, required: true },
          { label: 'Area / Colony / Street', name: 'area', full: true, required: true },
          { label: 'City', name: 'city', full: false, required: true },
          { label: 'Pin Code', name: 'pincode', full: false, required: true },
        ].map(({ label, name, full, required }) => (
          <div key={name} className={full ? 'sm:col-span-2' : ''}>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
            <input {...register(name, { required: required ? "Required" : false })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white ${errors[name] ? 'border-red-500' : 'border-gray-200'}`} />
            {errors[name] && <p className="text-[10px] text-red-500 mt-1">{errors[name].message}</p>}
          </div>
        ))}
        {/* State */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">State</label>
          <select {...register('state', { required: "Required" })}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white ${errors.state ? 'border-red-500' : 'border-gray-200'}`}>
            <option value="">Select State</option>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-[10px] text-red-500 mt-1">{errors.state.message}</p>}
        </div>
        {/* Default */}
        <div className="sm:col-span-2 flex items-center gap-2 mt-1">
          <input type="checkbox" id="default" {...register('isDefault')}
            className="accent-secondary w-4 h-4" />
          <label htmlFor="default" className="text-sm text-gray-700">Set as default address</label>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit"
          className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-container transition-all">
          Save Address
        </button>
        <button type="button" onClick={onCancel}
          className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
};

const SavedAddresses = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (form) => { dispatch(addAddress(form)); setShowForm(false); };
  const handleDefault = (id) => dispatch(setDefaultAddress(id));
  const handleRemove = (id) => { if (window.confirm('Remove this address?')) dispatch(removeAddress(id)); };

  return (
    <AccountLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">location_on</span>
            <h2 className="font-bold text-gray-900">Saved Addresses</h2>
          </div>
          <button onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-1.5 text-sm font-bold text-primary border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
            <span className="material-symbols-outlined text-base">add</span>
            Add New
          </button>
        </div>

        <div className="px-5 py-4">
          {showForm && <AddressForm onSave={handleSave} onCancel={() => setShowForm(false)} />}

          {addresses.length === 0 && !showForm ? (
            <div className="py-14 text-center">
              <span className="material-symbols-outlined text-5xl text-gray-200">location_off</span>
              <p className="text-gray-500 mt-3 font-medium">No saved addresses yet</p>
              <p className="text-xs text-gray-400 mt-1">Add an address to speed up checkout</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {addresses.map(addr => (
                <div key={addr.id}
                  className={`relative border rounded-xl p-4 transition-all ${
                    addr.isDefault ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold bg-secondary text-primary px-2 py-0.5 rounded-full">
                      DEFAULT
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-base text-gray-400">
                      {addr.type === 'Home' ? 'home' : addr.type === 'Work' ? 'work' : 'location_on'}
                    </span>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{addr.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{addr.name}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {addr.flat}, {addr.area}<br/>
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{addr.phone}</p>
                  <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                    {!addr.isDefault && (
                      <button onClick={() => handleDefault(addr.id)}
                        className="text-xs text-blue-600 font-semibold hover:underline">
                        Set as Default
                      </button>
                    )}
                    <button onClick={() => handleRemove(addr.id)}
                      className="text-xs text-red-500 font-semibold hover:underline ml-auto">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default SavedAddresses;