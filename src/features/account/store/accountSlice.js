import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'user-1',
    name: 'Priya Sharma',
    legalName: 'Priya Ramesh Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    language: 'English',
    gender: 'Female',
    dob: '15 March 1995',
    memberSince: 'January 2023',
    points: 3240,
    tier: 'Gold Member',
    avatar: null,
    notifications: { email: true, sms: true, whatsapp: true, offers: true },
  },
  addresses: [
    {
      id: 'addr-1',
      type: 'Home',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      flat: 'B-204, Sunrise Apartments',
      area: 'Sector 62, Noida',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201309',
      isDefault: true,
    },
    {
      id: 'addr-2',
      type: 'Work',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      flat: '4th Floor, Tower C, Unitech Cyber Park',
      area: 'Sector 39, Gurugram',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      isDefault: false,
    },
  ],
  payments: [
    { id: 'pay-1', type: 'upi', label: 'Google Pay', upiId: 'priya@oksbi', isDefault: true },
    { id: 'pay-2', type: 'card', brand: 'HDFC Bank', last4: '4221', expiry: '08/27', cardType: 'Visa Debit', isDefault: false },
    { id: 'pay-3', type: 'card', brand: 'SBI Credit Card', last4: '9902', expiry: '12/26', cardType: 'Mastercard', isDefault: false },
  ],
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateProfile: (state, action) => { state.user = { ...state.user, ...action.payload }; },
    addAddress: (state, action) => { state.addresses.push({ ...action.payload, id: `addr-${Date.now()}` }); },
    updateAddress: (state, action) => {
      const i = state.addresses.findIndex(a => a.id === action.payload.id);
      if (i !== -1) state.addresses[i] = action.payload;
    },
    removeAddress: (state, action) => { state.addresses = state.addresses.filter(a => a.id !== action.payload); },
    setDefaultAddress: (state, action) => { state.addresses.forEach(a => { a.isDefault = a.id === action.payload; }); },
    addPayment: (state, action) => { state.payments.push({ ...action.payload, id: `pay-${Date.now()}` }); },
    removePayment: (state, action) => { state.payments = state.payments.filter(p => p.id !== action.payload); },
    setDefaultPayment: (state, action) => { state.payments.forEach(p => { p.isDefault = p.id === action.payload; }); },
    updateNotifications: (state, action) => { state.user.notifications = { ...state.user.notifications, ...action.payload }; },
  },
});

export const { updateProfile, addAddress, updateAddress, removeAddress, setDefaultAddress, addPayment, removePayment, setDefaultPayment, updateNotifications } = accountSlice.actions;

export const selectUser = (state) => state.account.user;
export const selectAddresses = (state) => state.account.addresses;
export const selectPayments = (state) => state.account.payments;

export default accountSlice.reducer;