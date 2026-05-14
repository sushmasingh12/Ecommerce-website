import React from 'react';

export default function AdminTable({ admins, isLoading, onDelete, onToggleStatus, currentUserId, onView, onEdit }) {
  if (isLoading) {
    return (
      <div className="p-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (admins.length === 0) {
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl">person_off</span>
        </div>
        <div>
          <h3 className="text-xl font-bold">No Admins Found</h3>
          <p className="text-on-surface-variant">Try adjusting your filters or search term.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-high text-on-surface-variant uppercase text-xs font-bold tracking-wider">
            <th className="px-6 py-4">Profile</th>
            <th className="px-6 py-4">Name & Email</th>
            <th className="px-6 py-4 text-center">Role</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Last Login</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {admins.map((admin) => (
            <tr key={admin._id} className="hover:bg-surface-container/50 transition-colors group">
              <td className="px-6 py-4">
                <img 
                  src={admin.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                  alt={admin.name} 
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant/20"
                />
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-on-surface">{admin.name}</div>
                <div className="text-sm text-on-surface-variant">{admin.email}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight
                  ${admin.role === 'super_admin' ? 'bg-primary/10 text-primary' : 
                    admin.role === 'admin' ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-on-surface-variant'}
                `}>
                  {admin.role.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <button 
                  onClick={() => onToggleStatus(admin._id)}
                  disabled={admin._id === currentUserId}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                    ${admin.status === 'active' ? 'bg-emerald-500' : 'bg-surface-container-high'}
                    ${admin._id === currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${admin.status === 'active' ? 'translate-x-6' : 'translate-x-1'}
                  `} />
                </button>
              </td>
              <td className="px-6 py-4 text-center text-sm text-on-surface-variant">
                {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onView(admin)}
                    className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </button>
                  <button 
                    onClick={() => onEdit(admin)}
                    className="p-2 hover:bg-secondary/10 rounded-lg text-secondary transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button 
                    onClick={() => onDelete(admin._id)}
                    disabled={admin._id === currentUserId}
                    className={`p-2 hover:bg-error/10 rounded-lg text-error transition-colors
                      ${admin._id === currentUserId ? 'opacity-30 cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
