// Mock Analytics Service — replace with real API calls later

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const analyticsService = {
  async fetchOverview() {
    await delay(500);
    return {
      revenue: { value: "$284,920", change: "+18.4%", trend: "up" },
      sessions: { value: "142,380", change: "+9.2%", trend: "up" },
      avgOrderValue: { value: "$87.40", change: "+4.1%", trend: "up" },
      returnRate: { value: "3.2%", change: "-0.8%", trend: "down" },
    };
  },

  async fetchRevenueBreakdown() {
    await delay(600);
    return [
      { month: "Jan", revenue: 38000, orders: 420 },
      { month: "Feb", revenue: 52000, orders: 580 },
      { month: "Mar", revenue: 47000, orders: 510 },
      { month: "Apr", revenue: 61000, orders: 690 },
      { month: "May", revenue: 55000, orders: 620 },
      { month: "Jun", revenue: 73000, orders: 810 },
      { month: "Jul", revenue: 68000, orders: 760 },
    ];
  },

  async fetchTopProducts() {
    await delay(700);
    return [
      { name: "ErgoChair Pro v2", category: "Office Furniture", revenue: "$42,880", units: 86, growth: "+22%" },
      { name: "4K Curator Display", category: "Tech Gear", revenue: "$38,700", units: 43, growth: "+15%" },
      { name: "Minimalist Desk Lamp", category: "Lighting", revenue: "$21,450", units: 166, growth: "+8%" },
      { name: "Bamboo Standing Desk", category: "Office Furniture", revenue: "$19,200", units: 32, growth: "+31%" },
      { name: "Noise-Cancel Earbuds", category: "Tech Gear", revenue: "$17,640", units: 147, growth: "+12%" },
    ];
  },

  async fetchTrafficSources() {
    await delay(550);
    return [
      { source: "Organic Search", sessions: 58240, pct: 41, color: "bg-primary" },
      { source: "Direct", sessions: 31120, pct: 22, color: "bg-secondary" },
      { source: "Social Media", sessions: 24810, pct: 17, color: "bg-tertiary-fixed-dim" },
      { source: "Email Campaigns", sessions: 17080, pct: 12, color: "bg-secondary-container" },
      { source: "Paid Ads", sessions: 11130, pct: 8, color: "bg-surface-container-high" },
    ];
  },

  async fetchConversionFunnel() {
    await delay(650);
    return [
      { stage: "Sessions", count: 142380, pct: 100 },
      { stage: "Product Views", count: 98640, pct: 69 },
      { stage: "Add to Cart", count: 41820, pct: 29 },
      { stage: "Checkout", count: 18510, pct: 13 },
      { stage: "Purchased", count: 12290, pct: 8.6 },
    ];
  },

  async fetchGeography() {
    await delay(600);
    return [
      { country: "United States", revenue: "$112,400", pct: 39, flag: "🇺🇸" },
      { country: "United Kingdom", revenue: "$48,200", pct: 17, flag: "🇬🇧" },
      { country: "Germany", revenue: "$34,700", pct: 12, flag: "🇩🇪" },
      { country: "Canada", revenue: "$28,100", pct: 10, flag: "🇨🇦" },
      { country: "Australia", revenue: "$22,800", pct: 8, flag: "🇦🇺" },
      { country: "Others", revenue: "$38,720", pct: 14, flag: "🌍" },
    ];
  },
};
