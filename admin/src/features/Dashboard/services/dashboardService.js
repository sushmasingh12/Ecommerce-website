// Mock API service — replace with real axios/fetch calls later

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const dashboardService = {
  async fetchMetrics() {
    await delay(600);
    return {
      totalSales: "$142,890.00",
      totalSalesChange: "+12.5%",
      conversionRate: "4.82%",
      conversionChange: "+2.4%",
      customerSentiment: "92/100",
      urgentStockAlerts: 14,
    };
  },

  async fetchRevenueChart() {
    await delay(700);
    return [
      { month: "Jan", actual: 33, forecast: true },
      { month: "Feb", actual: 50, forecast: true },
      { month: "Mar", actual: 66, forecast: true },
      { month: "Apr", actual: 85, forecast: false },
      { month: "May", actual: 60, forecast: false },
      { month: "Jun", actual: 90, forecast: false },
      { month: "Jul", actual: 40, forecast: true },
    ];
  },

  async fetchRecentOrders() {
    await delay(800);
    return [
      {
        id: "#ORD-88219",
        customer: { name: "Julian Chen", email: "julian@example.com", initials: "JC" },
        product: { name: "Minimalist Desk Lamp", category: "Lighting" },
        amount: "$129.00",
        status: "Delivered",
      },
      {
        id: "#ORD-88220",
        customer: { name: "Elena Soros", email: "elena.s@webmail.com", initials: "ES" },
        product: { name: "ErgoChair Pro v2", category: "Office Furniture" },
        amount: "$499.00",
        status: "Processing",
      },
      {
        id: "#ORD-88221",
        customer: { name: "Marcus Thorne", email: "m.thorne@cloud.io", initials: "MT" },
        product: { name: "4K Curator Display", category: "Tech Gear" },
        amount: "$899.00",
        status: "Shipped",
      },
    ];
  },

  async fetchAIInsight() {
    await delay(500);
    return {
      message: `We detected a <strong class="text-primary">15% surge</strong> in "Eco-friendly" searches. Consider restocking the Bamboo Series early to prevent potential loss.`,
      cta: "Apply recommendation",
    };
  },
};