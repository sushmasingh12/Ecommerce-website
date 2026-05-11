// src/services/promotionsService.js

const mockPromotionsData = {
  summary: [
    {
      id: "roas",
      icon: "trending_up",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badge: "+12.4%",
      badgeClass: "text-green-600 bg-green-50",
      label: "Average ROAS",
      value: "4.82",
      unit: "x",
    },
    {
      id: "redemptions",
      icon: "confirmation_number",
      iconBg: "bg-tertiary/10",
      iconColor: "text-tertiary",
      badge: "Active",
      badgeClass: "text-slate-500 bg-slate-100",
      label: "Coupon Redemptions",
      value: "12,402",
      unit: null,
    },
    {
      id: "revenue",
      icon: "payments",
      iconBg: "bg-white/20",
      iconColor: "text-white",
      badge: "This Month",
      badgeClass: "text-white/80 border border-white/20",
      label: "Campaign Revenue",
      value: "$142,850",
      unit: null,
      highlight: true,
    },
  ],
  campaigns: [
    {
      id: "c1",
      title: "Summer Tech Blowout",
      category: "Electronics & Accessories",
      discount: "25% OFF",
      endsIn: "Ends in 2d",
      goal: "$50k",
      achieved: "$38.2k",
      progress: 76,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBVTGbghKAzABzQXu9InYZsh7z13XY5uoYEBkJ4pg8y5-MAg1O27Tc3CeAE0VTzqMN2uQ1koOtn2MdnENTQW9rLOGOgApcbrfPvc6PU68hsE63mNJok_DJxYrb2p7HzPrRlWTT02lT57Rp33LQCrQhaYl6KRC_LGuG9QR1EG-HRBpI6WeVgea2X7bMQWqWtqzudhtXFL7Ht385G-W5LPD-9Jg5Hfbvn6GWvT8_H9sG2EXEWs9gWx3QCdcbBQnfgkVnCUDSfmt9N2i9_",
    },
    {
      id: "c2",
      title: "Flash Footwear Sale",
      category: "Sporting Goods",
      discount: "BOGO 50%",
      endsIn: "Ends in 4h",
      goal: "$20k",
      achieved: "$18.9k",
      progress: 94,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAP4-VjD_ttbK5_tFOPmY1Whx93HusJwycAujbQ6EjCAaysCmbZz0RvIoPih_mHkIBDFo0XtZ9IpaT0XF2O5ixarJ-daqhJ8l5KRv9T8zVsUEWdpdRf0puueIaYNjxvZbOvQ8LQtrHcpFsWxWmNyLpBGtTvCxoIlTbXrEz1p56mhi3P3VmwBLrYuPvvtncWLv0EsQrU_Hu3kTS4Ijhm-Nhxfr_KDZp8oqvKZxsqKUUMLARzxAJi32TeXL07-AJETXB3qL0ubaHbumxz",
    },
  ],
  vouchers: [
    {
      id: "v1",
      code: "SAVE20NEXT",
      type: "Percentage",
      status: "ACTIVE",
      statusClass: "bg-green-100 text-green-700",
      usage: "1,240 / 5,000",
      revenue: "$12,400",
    },
    {
      id: "v2",
      code: "FREESHIP24",
      type: "Shipping",
      status: "ACTIVE",
      statusClass: "bg-green-100 text-green-700",
      usage: "892 / ∞",
      revenue: "$45,210",
    },
    {
      id: "v3",
      code: "WELCOME10",
      type: "Percentage",
      status: "PAUSED",
      statusClass: "bg-slate-100 text-slate-500",
      usage: "4,500 / 4,500",
      revenue: "$8,900",
    },
  ],
  banners: {
    activeBannerCount: 3,
    preview: {
      title: "New Autumn Collection",
      label: "Main Carousel",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDvHDgWTgbX_be1-Ol1_cfbcS59AXVYs65OuXM0X71a_nXCM_cRKv8jjlqqC-NpefxDpwiBRRRQfP7ICZoLFQvVbUgHR42rqTQA2fOSH6ya7RqPJwVjK-74FghNBwb2sY4znM2qsr5eQHAL03zP-frdncNdTOd8tp510UPbXG-eKCuBu1ngiEwWPyEafkvF2FRYidCQcyElJMyw-YrVFkgofKd_yYBI0iCpfElIxRF9LtxGXASHDIsYnd-iKzWL4vvmqwLNT_nwFlmJ",
    },
  },
  loyalty: {
    pointRatio: "100 Pts = $1.00 Credit",
    referrals: "1,402",
    conversionRate: "24%",
  },
  cartRecovery: {
    abandonedCount: 482,
    estimatedRevenue: "$4.2k",
    discountSuggestion: "10%",
  },
  aiInsight: "AI insight: Cross-selling is up 18.2% on seasonal banners",
};

export const fetchPromotionsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPromotionsData), 400);
  });
};