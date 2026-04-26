import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectPayments, addPayment, removePayment, setDefaultPayment } from '../store/accountSlice';
import AccountLayout from './Accountlayout';


const ICON = { upi: 'account_balance_wallet', card: 'credit_card', netbanking: 'account_balance' };

const PaymentCard = ({ p, onRemove, onDefault }) => (
  <div className={`relative border rounded-xl p-4 transition-all ${p.isDefault ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'}`}>
    {p.isDefault && (
      <span className="absolute top-3 right-3 text-[10px] font-bold bg-secondary text-primary px-2 py-0.5 rounded-full">DEFAULT</span>
    )}
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-gray-600 text-xl">{ICON[p.type] || 'credit_card'}</span>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">
          {p.type === 'upi' ? p.label : p.brand}
        </p>
        <p className="text-xs text-gray-500">
          {p.type === 'upi' ? p.upiId : `${p.cardType} •••• ${p.last4} · Expires ${p.expiry}`}
        </p>
      </div>
    </div>
    <div className="flex gap-3 pt-3 border-t border-gray-100">
      {!p.isDefault && (
        <button onClick={() => onDefault(p.id)} className="text-xs text-blue-600 font-semibold hover:underline">
          Set as Default
        </button>
      )}
      <button onClick={() => onRemove(p.id)} className="text-xs text-red-500 font-semibold hover:underline ml-auto">
        Remove
      </button>
    </div>
  </div>
);

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const [tab, setTab]         = useState('upi');
  const [showForm, setShowForm] = useState(false);

  const { register: registerUpi, handleSubmit: handleSubmitUpi, reset: resetUpi, formState: { errors: upiErrors } } = useForm({
    defaultValues: { upiId: '' }
  });

  const { register: registerCard, handleSubmit: handleSubmitCard, reset: resetCard, formState: { errors: cardErrors } } = useForm({
    defaultValues: { brand: '', last4: '', expiry: '', cardType: 'Visa Debit' }
  });

  const handleRemove  = id => { if (window.confirm('Remove this payment method?')) dispatch(removePayment(id)); };
  const handleDefault = id => dispatch(setDefaultPayment(id));

  const onAddUpi = (data) => {
    dispatch(addPayment({ type: 'upi', label: 'UPI', upiId: data.upiId, isDefault: false }));
    resetUpi();
    setShowForm(false);
  };

  const onAddCard = (data) => {
    dispatch(addPayment({ ...data, type: 'card', isDefault: false }));
    resetCard();
    setShowForm(false);
  };

  return (
    <AccountLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">payments</span>
            <h2 className="font-bold text-gray-900">Payment Methods</h2>
          </div>
          <button onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-1.5 text-sm font-bold text-primary border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
            <span className="material-symbols-outlined text-base">add</span>
            Add New
          </button>
        </div>

        <div className="px-5 py-4">
          {/* Add Form */}
          {showForm && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Add Payment Method</h3>
              {/* Type tabs */}
              <div className="flex gap-2 mb-4">
                {[['upi', 'UPI / Wallets'], ['card', 'Debit / Credit Card']].map(([t, l]) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      tab === t ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'
                    }`}>
                    {l}
                  </button>
                ))}
              </div>

              {tab === 'upi' ? (
                <form onSubmit={handleSubmitUpi(onAddUpi)}>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">UPI ID</label>
                  <input {...registerUpi('upiId', { required: "Required" })} placeholder="yourname@upi"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white mb-3 ${upiErrors.upiId ? 'border-red-500' : 'border-gray-200'}`} />
                  <div className="flex gap-2">
                    <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-container transition-all">Add UPI</button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">Cancel</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmitCard(onAddCard)} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Card Number (last 4 digits)', key: 'last4', placeholder: '1234', required: true },
                    { label: 'Expiry (MM/YY)', key: 'expiry', placeholder: '08/27', required: true },
                    { label: 'Bank / Issuer Name', key: 'brand', placeholder: 'HDFC Bank', required: true },
                  ].map(({ label, key, placeholder, required }) => (
                    <div key={key}>
                      <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                      <input {...registerCard(key, { required: required ? "Required" : false })} placeholder={placeholder}
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white ${cardErrors[key] ? 'border-red-500' : 'border-gray-200'}`} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Type</label>
                    <select {...registerCard('cardType')}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                      {['Visa Debit','Mastercard Debit','Visa Credit','Mastercard Credit','RuPay'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex gap-2 mt-1">
                    <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-container transition-all">Add Card</button>
                    <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Payment list */}
          {payments.length === 0 && !showForm ? (
            <div className="py-14 text-center">
              <span className="material-symbols-outlined text-5xl text-gray-200">credit_card_off</span>
              <p className="text-gray-500 mt-3 font-medium">No payment methods saved</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {payments.map(p => (
                <PaymentCard key={p.id} p={p} onRemove={handleRemove} onDefault={handleDefault} />
              ))}
            </div>
          )}

          {/* Security note */}
          <div className="mt-5 flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
            <span className="material-symbols-outlined text-green-500 text-lg shrink-0 mt-0.5">verified_user</span>
            <p className="text-xs text-green-700">Your payment information is encrypted and stored securely. Bazario never stores full card numbers.</p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default PaymentMethods;