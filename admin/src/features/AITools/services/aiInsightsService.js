// src/services/aiInsightsService.js

const mockAIInsightsData = {
  salesForecast: {
    weeklyBars: [
      { height: 30, opacity: 10, value: "12.4k" },
      { height: 45, opacity: 20, value: null },
      { height: 35, opacity: 30, value: null },
      { height: 60, opacity: 40, value: null },
      { height: 50, opacity: 50, value: null },
      { height: 75, opacity: 60, value: null },
      { height: 85, opacity: 100, value: "PREDICTED: 24.8k", isHighlighted: true },
      { height: 80, isDashed: true },
      { height: 70, isDashed: true },
      { height: 75, isDashed: true },
    ],
    confidenceScore: "94.2%",
    predictedGrowth: "+12.4%",
    anomalies: "2 Found",
  },
  insights: [
    {
      id: "stock",
      category: "Stock Replenishment",
      icon: "inventory",
      colorClass: "bg-secondary-container/50",
      textColorClass: "text-primary",
      message:
        '<span class="font-bold">Urgent:</span> Inventory for <span class="text-primary font-medium">"Organic Linen Tunic"</span> is projected to deplete in 4 days. Increase order volume by 15% to meet weekend surge.',
    },
    {
      id: "marketing",
      category: "Marketing Optimization",
      icon: "campaign",
      colorClass: "bg-tertiary-fixed/50",
      textColorClass: "text-tertiary",
      message:
        'The <span class="font-bold">"Tech Enthusiast"</span> cohort is showing 2.4x higher engagement on social channels. Redirect 10% of display ad budget to influencer partnerships for this segment.',
    },
  ],
  proTip:
    "Bundle the 'Wireless Earbuds' with 'Silicon Cases' to increase AOV by an estimated 8.5%.",
  recommendationEngine: [
    { label: "Direct Personalization", lift: "+22% lift", width: "75%", opacity: "100" },
    { label: "Dynamic Retargeting", lift: "+14% lift", width: "45%", opacity: "60" },
    { label: "Predictive Bundling", lift: "+31% lift", width: "88%", opacity: "100" },
  ],
  cohorts: [
    {
      id: "vip",
      name: "VIP Platinum",
      icon: "workspace_premium",
      iconBg: "bg-primary-fixed",
      iconColor: "text-on-primary-fixed",
      borderColor: "border-primary",
      retention: "89.4%",
      ltv: "$4,280",
      ltvColor: "text-primary",
      sentiment: "High",
      sentimentClass: "bg-green-100 text-green-700",
    },
    {
      id: "new",
      name: "New Explorers",
      icon: "person_search",
      iconBg: "bg-secondary-fixed",
      iconColor: "text-on-secondary-fixed",
      borderColor: "border-slate-200",
      retention: "24.1%",
      ltv: "$310",
      ltvColor: "text-on-surface",
      sentiment: "Neutral",
      sentimentClass: "bg-amber-100 text-amber-700",
    },
    {
      id: "atrisk",
      name: "At-Risk Loyalists",
      icon: "history",
      iconBg: "bg-tertiary-fixed",
      iconColor: "text-on-tertiary-fixed",
      borderColor: "border-slate-200",
      retention: "62.8%",
      ltv: "$1,150",
      ltvColor: "text-on-surface",
      sentiment: "Low",
      sentimentClass: "bg-error-container text-on-error-container",
    },
  ],
  summaryCards: {
    efficiencyScore: "91.8",
    modelReliability: { precision: "80%", bars: [true, true, true, true, false] },
    sentimentMap: [30, 50, 90, 70, 40, 20, 60],
  },
};

export const fetchAIInsightsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAIInsightsData), 500);
  });
};