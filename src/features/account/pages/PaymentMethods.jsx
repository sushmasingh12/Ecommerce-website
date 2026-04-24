import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPayments, removePayment } from '../store/accountSlice';

const PaymentMethods = () => {
  const payments = useSelector(selectPayments);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      dispatch(removePayment(id));
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Settings</p>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-black">Payment Methods</h1>
          <p className="text-gray-500 font-light mt-4">Manage your digital wallet and preferred transaction sources.</p>
        </div>
        <button className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add New Method
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {payments.map((pay) => (
          <div key={pay.id} className="p-10 bg-black text-white flex flex-col justify-between group transition-all hover:bg-white hover:text-black hover:shadow-2xl border border-black min-h-[240px] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <span className="material-symbols-outlined text-3xl opacity-50 group-hover:opacity-100 group-hover:text-secondary transition-all">credit_card</span>
                <button 
                  onClick={() => handleRemove(pay.id)}
                  className="material-symbols-outlined text-white/30 hover:text-red-500 group-hover:text-black/30 transition-colors"
                >
                  delete
                </button>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Primary Access</p>
              <h3 className="text-2xl font-headline mb-1 tracking-tight">{pay.brand}</h3>
              <p className="text-lg font-light tracking-[0.2em] opacity-80 group-hover:opacity-100">•••• •••• •••• {pay.last4}</p>
            </div>
            
            <div className="relative z-10 flex justify-between items-end mt-12">
              <div className="text-[10px] uppercase tracking-widest">
                <p className="opacity-40 mb-1">Expires</p>
                <p className="font-bold">{pay.expiry}</p>
              </div>
              {pay.isDefault ? (
                <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 bg-white/10 group-hover:bg-black/5 text-secondary border border-secondary/30">
                  Default Method
                </span>
              ) : (
                <button className="text-[9px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity underline underline-offset-4">
                  Set as Default
                </button>
              )}
            </div>

            {/* Background Texture Effect */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 group-hover:bg-black/5 rounded-full -mr-24 -mb-24 transition-transform duration-1000 group-hover:scale-110"></div>
          </div>
        ))}

        {payments.length === 0 && (
          <div className="md:col-span-2 py-20 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-gray-200 mb-4">payments</span>
            <p className="text-gray-400 font-light italic">No payment methods saved.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PaymentMethods;
