import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAddresses, removeAddress } from '../store/accountSlice';

const SavedAddresses = () => {
  const addresses = useSelector(selectAddresses);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      dispatch(removeAddress(id));
    }
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">Settings</p>
          <h1 className="text-4xl md:text-5xl font-headline tracking-tighter text-black">Saved Addresses</h1>
          <p className="text-gray-500 font-light mt-4">Manage your delivery locations for a seamless acquisition process.</p>
        </div>
        <button className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span> Add New Location
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {addresses.map((addr) => (
          <div key={addr.id} className="p-10 bg-gray-50 border border-gray-100 flex flex-col justify-between group transition-all hover:bg-white hover:shadow-2xl">
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 border ${addr.type === 'Default' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                  {addr.type}
                </span>
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="material-symbols-outlined text-gray-400 hover:text-black">edit</button>
                  <button 
                    onClick={() => handleRemove(addr.id)}
                    className="material-symbols-outlined text-gray-400 hover:text-red-500"
                  >
                    delete
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-headline mb-4 uppercase tracking-tight">{addr.name}</h3>
              <p className="text-md font-light text-gray-600 leading-relaxed">
                {addr.street}<br/>
                {addr.city}<br/>
                {addr.postalCode}<br/>
                {addr.country}
              </p>
            </div>
            
            {addr.type !== 'Default' && (
              <button className="mt-12 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-4 font-bold">
                Set as Default
              </button>
            )}
          </div>
        ))}

        {addresses.length === 0 && (
          <div className="md:col-span-2 py-20 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-gray-200 mb-4">location_off</span>
            <p className="text-gray-400 font-light italic">No addresses saved yet.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default SavedAddresses;
