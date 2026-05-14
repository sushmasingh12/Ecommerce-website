import React from 'react';

export default function ViewAdminModal({ admin, onClose }) {
  if (!admin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header with Background Gradient */}
        <div className="relative h-32 bg-gradient-to-r from-primary to-primary-container">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors z-10"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
          
          <div className="absolute -bottom-12 left-8">
            <img 
              src={admin.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
              alt={admin.name} 
              className="w-24 h-24 rounded-2xl object-cover border-4 border-surface-container-lowest shadow-lg"
            />
          </div>
        </div>

        <div className="p-8 pt-16 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">{admin.name}</h2>
              <p className="text-on-surface-variant">{admin.email}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight
              ${admin.role === 'super_admin' ? 'bg-primary/10 text-primary' : 
                admin.role === 'admin' ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-on-surface-variant'}
            `}>
              {admin.role.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-outline-variant/10">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Phone</label>
              <p className="text-sm font-medium">{admin.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Status</label>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${admin.status === 'active' ? 'bg-emerald-500' : 'bg-error'}`}></span>
                <p className="text-sm font-medium capitalize">{admin.status}</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Created By</label>
              <p className="text-sm font-medium">{admin.createdBy?.name || 'System'}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Created Date</label>
              <p className="text-sm font-medium">{new Date(admin.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block">Last Login</label>
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-sm text-primary">login</span>
              <p className="text-on-surface-variant">
                {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'No login history recorded.'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold rounded-xl transition-all mt-4"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
