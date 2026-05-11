

const MOCK_ORDERS = [
  {
    id: "ORD-94210",
    customer: {
      name: "Eleanor Shellstrop",
      email: "eleanor@arizona.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBG6U6DvwYzRRUsT1z0VdsNxa5JVDHkwvBQSgHVp28lTP9SRryK618MK_3A7agTMHBJqx8JNNgPRc22YyjiiA_JhBHSeNX5KUUtRjclZW5sdmyqgadmv2RxjzwSVf2pHn1w-NBDyONDnhGNHNcMCl_tao_BgXzVSLLAoUGWjWuASSZL01r9gbbBh9E98Z3h66KKV3XsZ_Q7ZEmtcdvvPItJKeQgwWgAHBlKIWORNqyH6auwvn8EWpdsOo6cD94ccLOYiaxV66ObMfVD",
    },
    items: 3,
    total: 1420.0,
    payment: "Paid",
    fulfillment: "Shipped",
    selected: true,
  },
  {
    id: "ORD-94209",
    customer: {
      name: "Chidi Jagonye",
      email: "chidi@moral.edu",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB0TmeBZw0YHKLZc54qbPg0e23tVMCr0Rd0l4Sc6w1Q-0QQnNBdRGpdWnE2ilODXP3zjiMR1M5xwKj5-hTSMzDGRoe_vsvKQP3nTH9XB94TJ2jyMBZAhJsyw_rbQikFBKF5YemNRp9L83HY8KiELHXgQvZANOCCOf6gj93hNeXEXaRw-h97yyn_dALdflFAcWS_6Anmmzwjjv30A4WoECQaCCM6eBFV7Uqexps3vEW3-9u3wOqdVnBAqYtXaAHwwuGJPA_Frxm1pWAs",
    },
    items: 1,
    total: 245.5,
    payment: "Pending",
    fulfillment: "Processing",
    selected: false,
  },
  {
    id: "ORD-94208",
    customer: {
      name: "Tahani Al-Jamil",
      email: "tahani@socialite.uk",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjnZURxEmUB63L1f0qDa572Bj17lGKhxwU5kWK9tqXZAvEPcUM47EoKja4yzxlBldnTb6F6aCDgaY7KMpJDr7CdzUP3hLS7ySDF8kk4eKJeUJkQWdHM6wAiybNltPiJ-orwbY4zFqu8VLNb-i-fNhhE5RKStbu7VCMJbFXvD6804t1jsfK6lqSTJ8Y5ZlJ5FcKw_kNA-VaRvxxt1Y-p2CUSZIR8yf50AAej4F6tHP-brkzZ3DyWneiyQhKs_0J54XfsF-9Qy2BGXI4",
    },
    items: 12,
    total: 8920.0,
    payment: "Paid",
    fulfillment: "Unfulfilled",
    selected: false,
  },
  {
    id: "ORD-94207",
    customer: {
      name: "Jason Mendoza",
      email: "jason@duval.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAb5UlLreo3uuVu7zR5ddcqvL13jvfOywITddp-BjgOQsPftB0RNwYQETny_U0EKIdkUwk6T4T_WaZ3ZsltLWlTFJhIsWBoz3c50gAxaUizVcXO_3PgMkirZGWQIGofyNyitJBqtb4X9utveDIs_-d0zU55ul7Z2bs6lnmWB8NC_2myAcuuCO6Ff2-YCT9_J9qtJ_FrS-wgZ9IiYtw7f9Jf6kA-1LFAarZc257bkTZpPM6dzRcSIDY3mKV_iYEKfpFn8cbxeMvLqLo9",
    },
    items: 2,
    total: 120.0,
    payment: "Refunded",
    fulfillment: "Refunded",
    selected: false,
  },
];

const MOCK_ORDER_DETAIL = {
  id: "ORD-94210",
  paymentStatus: "Payment Verified",
  fulfillmentStatus: "In Transit",
  invoiceId: "INV-2023-094210",
  invoiceDate: "10/22/23",
  total: 1420.0,
  items: [
    {
      id: 1,
      name: "Curator Series 7 Watch",
      variant: "Onyx Black • 44mm",
      price: 599.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBDCvRPMeeyED2BjeFdYrFVrQ2FlEq8ARy_W-73zFl7d7rd3ZNnhQAEzsUw68ivEfl8m4L9h4prjOnD5o8Lqbgwp4jpvs-u83NVmgDPfkJejlhsUEobhOmbvHcJBTIuXZIdyWQBxDaz0ZPdxzeqSgLvS1ixG1HlH7q2hRTniLWIu3SbMFAQ1PkfrPAwm3exETuDZhMoh_eJ5gzWZhQdmO02gpEiH0m_R38XacRW-jpla3CUhttUwtqXQeX8omOWDh7UvO4x_ORhbtni",
    },
    {
      id: 2,
      name: "Acoustic Pro 3 Wireless",
      variant: "Glacier Silver",
      price: 821.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMNkMoHZl8UhakEGg1aM9i_ROwlpRamNnHw5DRYg9kp2GtWo5sz0dC6JSwLIcqudlE05VamWvCFZzVDxzjbOrY_H0vnQz_zBIB1esSNZCKAm_YVXHJUpU1fiVGIlgb3gHUbtc4Bg3GFae-lqr4fXNlfqkt1WGeMp4Td4Mn3VhCCVVQU0uLFdAmRTy467ljz6H0G63wkedcWqqGgfOqqjN78q2ahs0JNljNWTChJiSM7umx_8AGqfyaxaBbE3yPcuVpjsqenXeFUyI3",
    },
  ],
  tracking: [
    {
      status: "Out for Delivery",
      location: "London Hub",
      time: "Oct 24, 08:30 AM",
      active: true,
    },
    {
      status: "Arrived at Sort Facility",
      location: "Heathrow Logistics",
      time: "Oct 23, 11:45 PM",
      active: true,
    },
    {
      status: "Shipped from Origin",
      location: "San Francisco",
      time: "Oct 22, 02:00 PM",
      active: false,
    },
  ],
};

// Simulated async API calls
export const fetchOrdersAPI = async ({ search, paymentStatus, fulfillmentStatus }) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  let filtered = [...MOCK_ORDERS];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q)
    );
  }
  if (paymentStatus && paymentStatus !== "Payment Status") {
    filtered = filtered.filter((o) => o.payment === paymentStatus);
  }
  if (fulfillmentStatus && fulfillmentStatus !== "Fulfillment Status") {
    filtered = filtered.filter((o) => o.fulfillment === fulfillmentStatus);
  }
  return { orders: filtered, total: 1284 };
};

export const fetchOrderDetailAPI = async (orderId) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_ORDER_DETAIL;
};