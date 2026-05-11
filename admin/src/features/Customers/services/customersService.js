// src/services/customersService.js

const MOCK_CUSTOMERS = [
  {
    id: "cust-001",
    name: "Sarah Connor",
    email: "sarah.c@gmail.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdhBSikb_Bp2D4Ujdhy0KiJIQuIHh9ooRLMpyqlPsIIUJAyquSWtcl8J15CVCCtU9X7d0csgg_d_IR4XpfjLDA00tboT31IlglPJN_lq5NKA0fMt7mjd4ptkoI-9aSRZeVNDCXKODHdzdeu6g8OZKOOtZDXAeJ3GSBMujcVY2GknHU1rSHWVLtnd9d3aTRf2prTE4qDN2icFvDYd15gDTVr6PVMc3oDh0nJoSlHimwn9LyYIUyl32eVlgpUEJ3ShS_GKoRnt1B04fj",
    orders: 24,
    totalSpent: 4250.0,
    segments: ["VIP", "Loyal"],
    lastActive: "2 hours ago",
    status: "Active",
  },
  {
    id: "cust-002",
    name: "Marcus Wright",
    email: "m.wright@techcorp.io",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHrM3vOYfOCV-v3ungg2n6EBH_bpNfdaiFW2o0QQo3z3XG87U2zguPXWT88RP493xlK_ekE24gevAiW63-sZal2FD3ILxZuo1rLeDeWr9VffU5heBonki-KPg2HR3gqtg9QfCBviS9U1xzQmZyLbKx-qboE7AJQjWonsLqfOKwMOGiUqoy7w91RsjT317rXQ9WijlokY0VeCO7cy7kNfTD1ZVznlysQNuVl0goO_lgCHf9nVcsLEUSBurOg4WUXzYCkV9CmD3oMkoJ",
    orders: 1,
    totalSpent: 89.0,
    segments: ["New"],
    lastActive: "Yesterday",
    status: "Active",
  },
  {
    id: "cust-003",
    name: "Elena Fisher",
    email: "elena.f@outlook.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuzO4nIypih2zS3UPkWu4u9VU00HOU7k-j9q_z6jtkyYW8NmDoDohUjn1skV7o_maMPp8LIAEYCpQRVKb29VSATgPFp8CYOwMRrq61m1aWIIR5Lma6AfTfGUKG9fN_-6mKFUi0QTcKjG9trWJURSuKb4420gSVhzGbJpubygrX6iBgkIdRtdZIvmU1MQH_J3-qXL4AIcy5yjExz2m2BZSf6zj98oItCcZshNHTHz8EmYZxSI4I4R-TIm_i_wPvH_dvNxvmYKi8GB6g",
    orders: 12,
    totalSpent: 1120.5,
    segments: ["Returning"],
    lastActive: "3 days ago",
    status: "Inactive",
  },
];

const MOCK_CUSTOMER_DETAIL = {
  "cust-001": {
    id: "cust-001",
    name: "Sarah Connor",
    email: "sarah.c@gmail.com",
    phone: "+1 (555) 234-8902",
    address: "742 Evergreen Terrace, Springfield, OR 97403",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMeCrXrUZq_S1u4CjIN_HjC5_B8wzEcu3R7gCwJx5NkgBOO5VRNX6VGCWi0Ypv7sNDe1LXE2f-UDGhJwv7D2-iP2HCgavW6TJG6ZKh4k0YIv83gvE3hGcKSHCRN2tytCBeF1Z4KyJLXQF2l7cpKnBWxEc9aiFFD8e9oT9PxEtwAbLdQgFgIMBADFLu6dWWJMjRGZQI3Ajf1woAVmNW0lNatPperCEkqTIZEcQ9AqwIlPnfohXIbMa9oFiqmaaQ9CdnbTF495eiFwf0",
    customerSince: "Oct 2021",
    lifetimeValue: 4250.0,
    avgOrder: 177.08,
    recentOrders: [
      { id: "ORD-89234", date: "24 May, 2024", amount: 240.0 },
      { id: "ORD-88102", date: "12 May, 2024", amount: 1120.0 },
    ],
    aiPrediction: "Sarah is 85% likely to purchase from the New Summer Collection based on her browsing history.",
  },
};

export const fetchCustomersAPI = async ({ activityFilter, search, spentFilter, ordersFilter }) => {
  await new Promise((r) => setTimeout(r, 600));
  let filtered = [...MOCK_CUSTOMERS];
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }
  // Mocking filter logic application
  console.log("Applying filters:", { activityFilter, spentFilter, ordersFilter });
  
  return { customers: filtered, total: 1240, matches: filtered.length };
};

export const addCustomerAPI = async (customerData) => {
  await new Promise((r) => setTimeout(r, 800));
  return {
    id: `cust-${Math.floor(Math.random() * 1000)}`,
    ...customerData,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFZ4uofivHkwBNGDgtIbBPZ0EixE8_5dQ_6kQ4k8-ECdQuyjcuOzHlT4_6KDJpp050VQDL0HawF8oly6yrf0Sxxy2HUWXqrBWYEy1EgpVtuo2U1ZXw36nlPRfOFCmyZFoE-_5uLP-yQYBromdWPs2DV5ckl-iOZdPVO-36Z2f5CMHwAK1RCNtUCcqMOygVBAkfWDLR-U7C8p_th0gA2CdA-wZLRN0GbodSslwe49RAJ5ylisvlX1bKXZ0cSp5e9MYfOsL3TYU90jpr",
    orders: 0,
    totalSpent: 0,
    segments: customerData.tags || [],
    lastActive: "Just now",
    status: "Active",
  };
};

export const fetchCustomerDetailAPI = async (customerId) => {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_CUSTOMER_DETAIL[customerId] || MOCK_CUSTOMER_DETAIL["cust-001"];
};