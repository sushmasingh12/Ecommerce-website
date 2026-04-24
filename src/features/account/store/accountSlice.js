import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: 'user-1',
    name: 'Julian Vane',
    legalName: 'Julian Alistair Vane',
    email: 'j.vane@editorial.com',
    phone: '+44 (0) 20 7946 0128',
    language: 'English (UK)',
    status: 'Maison Curator Status',
    memberSince: 'October 2022',
    points: 12450
  },
  addresses: [
    {
      id: 'addr-1',
      type: 'Default',
      name: 'Home',
      street: 'Flat 4, The Mews',
      city: '12 Kensington Gardens, London',
      postalCode: 'W8 4PU',
      country: 'United Kingdom'
    }
  ],
  payments: [
    {
      id: 'pay-1',
      brand: 'Platinum Amex',
      last4: '8802',
      expiry: '09/26',
      isDefault: true
    }
  ],
  isLoading: false,
  error: null
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    addAddress: (state, action) => {
      state.addresses.push({ ...action.payload, id: Date.now() });
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(a => a.id === action.payload.id);
      if (index !== -1) state.addresses[index] = action.payload;
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
    },
    addPayment: (state, action) => {
      state.payments.push({ ...action.payload, id: Date.now() });
    },
    removePayment: (state, action) => {
      state.payments = state.payments.filter(p => p.id !== action.payload);
    }
  }
});

export const { 
  updateProfile, 
  addAddress, 
  updateAddress, 
  removeAddress, 
  addPayment, 
  removePayment 
} = accountSlice.actions;

export const selectUser = (state) => state.account.user;
export const selectAddresses = (state) => state.account.addresses;
export const selectPayments = (state) => state.account.payments;

export default accountSlice.reducer;
