import React from 'react';

export default function DeleteConfirmModal({ onConfirm, onCancel, adminName }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-surface/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">delete_forever</span>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-on-surface">Delete Admin?</h2>
            <p className="text-on-surface-variant mt-2 text-sm">
              Are you sure you want to delete <span className="font-bold text-on-surface">{adminName}</span>? This action cannot be undone.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              className="w-full py-3 bg-error text-on-error rounded-xl font-bold shadow-lg hover:shadow-error/20 transition-all"
            >
              Yes, Delete Admin
            </button>
            <button 
              onClick={onCancel}
              className="w-full py-3 rounded-xl font-bold border border-outline hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
