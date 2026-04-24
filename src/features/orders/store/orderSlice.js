import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 'BZ-20241201',
      status: 'Delivered',
      date: '01 Dec 2024',
      deliveredOn: '04 Dec 2024',
      total: 1849,
      paymentMethod: 'Google Pay',
      address: 'B-204, Sunrise Apartments, Sector 62, Noida - 201309',
      items: [
        { id: 'i1', name: 'Men\'s Slim Fit Formal Shirt (Blue, L)', qty: 1, price: 899, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 'i2', name: 'Leather Belt - Brown (32")', qty: 1, price: 499, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 'i3', name: 'Cotton Pocket Square (White)', qty: 1, price: 199, image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=200' },
      ],
    },
    {
      id: 'BZ-20241118',
      status: 'Cancelled',
      date: '18 Nov 2024',
      deliveredOn: null,
      total: 2299,
      paymentMethod: 'HDFC Visa •••• 4221',
      address: 'B-204, Sunrise Apartments, Sector 62, Noida - 201309',
      items: [
        { id: 'i4', name: 'Women\'s Kurti - Floral Print (M)', qty: 2, price: 999, image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 'i5', name: 'Ethnic Jhumka Earrings - Gold', qty: 1, price: 349, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200' },
      ],
    },
    {
      id: 'BZ-20241005',
      status: 'Delivered',
      date: '05 Oct 2024',
      deliveredOn: '08 Oct 2024',
      total: 3499,
      paymentMethod: 'SBI Mastercard •••• 9902',
      address: '4th Floor, Tower C, Unitech Cyber Park, Sector 39, Gurugram - 122001',
      items: [
        { id: 'i6', name: 'Nike Air Max 270 - Black (UK 8)', qty: 1, price: 3499, image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=200' },
      ],
    },
    {
      id: 'BZ-20240920',
      status: 'Delivered',
      date: '20 Sep 2024',
      deliveredOn: '23 Sep 2024',
      total: 1199,
      paymentMethod: 'Google Pay',
      address: 'B-204, Sunrise Apartments, Sector 62, Noida - 201309',
      items: [
        { id: 'i7', name: 'Moisturizing Face Cream SPF 30 (50ml)', qty: 1, price: 799, image: 'https://images.pexels.com/photos/4440210/pexels-photo-4440210.jpeg?auto=compress&cs=tinysrgb&w=200' },
        { id: 'i8', name: 'Vitamin C Serum (30ml)', qty: 1, price: 399, image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=200' },
      ],
    },
  ],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
});

export const selectOrders = (state) => state.orders.orders;
export default orderSlice.reducer;