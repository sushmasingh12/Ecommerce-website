import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAdminThunk } from '../store/adminManagementSlice';
import { useForm } from 'react-hook-form';

export default function EditAdminModal({ admin, onClose }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      status: admin.status,
    }
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(updateAdminThunk({ id: admin._id, data })).unwrap();
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
            <h2 className="text-2xl font-bold text-on-surface">Edit Admin</h2>
            <p className="text-sm text-on-surface-variant">Update details for {admin.name}.</p>
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
              <label className="text-sm font-bold text-on-surface-variant ml-1">Status</label>
              <select 
                {...register('status')}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary transition-all outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
