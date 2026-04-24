import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 'CR-88291',
      status: 'Delivered',
      date: 'Dec 14, 2023',
      total: 3240.00,
      items: [
        {
          id: 'item-1',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuHWyoyVPtJ9ZD9lghAE__thIXs5J-KWJ3gGaEJa51ExvT0WreEestsOwN_IgwSVaDZeQql_kJS6ykXQeS_HUzd2o0VWuQ6js27WG4t5X9mbI0nbrK1i5JL3vve_PdBMqjb-89ID2H0YmTaTNXKZsd2I7EcNuPgrrONNagjekBF2dj4GYW9RERMTqgJYq6ej3wsDZKWjgw0aRTGpf4YOuv7FAUhHmveqE-ePb7mUkqJ3gM-x2Jgr9kkOlb9n5eRW695RVEEy2ZpAk',
          name: 'Hand-Tailored Wool Blazer'
        },
        {
          id: 'item-2',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsPLW38Ge7DUlwvjGyrdkJ2_D_Zhz_BPKGrdp3r22Y1rEMCmmsgQOGzTthFsaavKR6CBdgI1-IQo17ThN5pXsF4WFRmaPvg_VYZzq8KhOgnfJelBmRxV4a8cquY1__2sY7w_EWjdujez6tjj1faG4s-qVDjOoFnCAY4ykLlcboEacfOje-aEEagd9xsrSv4nauyZn4XJixxXmzal3Fj04rXT_1OsgQCN4JD-iQ4ISHRXu5d6C2SROrrZJu6uQ1ADXRgEvp-jgKHfQ',
          name: 'Luxury Tan Accessory'
        }
      ],
      moreItemsCount: 1
    },
    {
      id: 'CR-87104',
      status: 'Shipped',
      date: 'Nov 28, 2023',
      total: 1850.00,
      items: [
        {
          id: 'item-3',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgUNdWz9BYRUOBNAj40vHTWcgGbpSPRDNbvtdDJnzyeb7zmK06MaEgAUoAH8h8geXed905Ih5gyHQk8Mqw21u7VdLltffPGYG1oef4hY1GLPHApJYfOOTqeIhDcPtkDT44poCnOd5MEEGPa-K5bhcP49Bwhcejd_d-7t1YgWRD6Ebav4Y103NiimEBrAe4ciVmtiL5rapNwVwHlcSRUvH7TiWKrGuyV9F0l7sBb81rZvR7j_piSsPyEGCIrz-wJeTNrGaOQUTPePo',
          name: 'Minimal Silk Dress'
        }
      ],
      moreItemsCount: 0
    },
    {
      id: 'CR-85092',
      status: 'Delivered',
      date: 'Oct 02, 2023',
      total: 4100.00,
      items: [
        {
          id: 'item-4',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3OxmqsWXIIduML4uzqZ6qKJXzO6kBHV1eGw48cpdB71Z3gr8m_w1Zh-oaHtDQEEOMLUPmpVU9a4oXaKy8opnaZcw4n55GsQ8tWRAhqoKkLmTiIqfCheJw3Y3Cqklxw_-Fp0tHIR3vou7mEnOAdnaXyNPjbBMr3IO2NuXL0SFzZ9AddKaQOTTrMGFc4XdWHpKO0MCp3N4HpZZ9gXnQnoML5y_o1_MQ8V0OvMAK4I95vxvi1wVQCJ9d3KP5TZ7svuXJhWTqGdAxT60',
          name: 'Handmade Leather Boots'
        },
        {
          id: 'item-5',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjDkfYJnzjW5gxns-h29hAtzpI8n5g79oFMulgTIM-VrZRUcP-9tFvu7lByGmWP2u36QVcpNPGgClrZ-uobCG3gDS7lOnkwnX2mOCuOvY46CZ8aoIWaT_zN0obsHtG42eSbcq5eLkVUgxV_sUQJ5XOYzbS4LcV16M5XYwK0-N-Nn-VEy147l7YAk0m1eQqWcXtQ_TZngAklx8rgReJ0YI_qwGhayn3OToYFfIB3NxsnuGJvMkRHI0NQb_vyw39rWUmnAPrhnVloyw',
          name: 'Minimalist Luxury Watch'
        }
      ],
      moreItemsCount: 0
    }
  ],
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setError } = orderSlice.actions;
export const selectOrders = (state) => state.orders.orders;
export default orderSlice.reducer;
