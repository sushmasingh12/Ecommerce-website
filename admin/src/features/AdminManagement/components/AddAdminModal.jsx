import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAdminThunk } from '../store/adminManagementSlice';
import { useForm } from 'react-hook-form';

export default function AddAdminModal({ onClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(createAdminThunk(data)).unwrap();
      onClose();
    } catch (err) {
      // Error handled by thunk/toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high/30">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">Create New Admin</h2>
            <p className="text-sm text-on-surface-variant">Add a new member to your administrative team.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Full Name</label>
              <input 
                {...register('name', { required: 'Name is required' })}
                type="text" 
                className={`w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 transition-all outline-none
                  ${errors.name ? 'ring-2 ring-error' : 'focus:ring-primary'}
                `}
                placeholder="e.g. John Doe"
              />
              {errors.name && <p className="text-xs text-error ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Phone Number</label>
              <input 
                {...register('phone', { required: 'Phone is required', pattern: /^[6-9]\d{9}$/ })}
                type="text" 
                className={`w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 transition-all outline-none
                   ${errors.phone ? 'ring-2 ring-error' : 'focus:ring-primary'}
                `}
                placeholder="10-digit number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">Email Address</label>
            <input 
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              type="email" 
              className={`w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 transition-all outline-none
                 ${errors.email ? 'ring-2 ring-error' : 'focus:ring-primary'}
              `}
              placeholder="admin@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Role</label>
              <select 
                {...register('role')}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary transition-all outline-none"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Initial Password</label>
              <input 
                {...register('password', { required: 'Password is required', minLength: 8 })}
                type="password" 
                className={`w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 transition-all outline-none
                   ${errors.password ? 'ring-2 ring-error' : 'focus:ring-primary'}
                `}
                placeholder="Min 8 characters"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-bold border border-outline hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>}
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
