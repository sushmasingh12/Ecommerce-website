
const mockReviewsData = {
  insights: [
    {
      id: "avg_rating",
      label: "Average Rating",
      icon: "star",
      iconFill: true,
      iconColor: "text-primary",
      value: "4.8",
      badge: "+0.2",
      badgeIcon: "trending_up",
      badgeClass: "text-emerald-600",
    },
    {
      id: "total_reviews",
      label: "Total Reviews",
      icon: "forum",
      iconFill: false,
      iconColor: "text-primary",
      value: "12,482",
      badge: "this month",
      badgeClass: "text-on-surface-variant",
    },
    {
      id: "sentiment",
      label: "AI Sentiment Score",
      icon: "auto_awesome",
      iconFill: false,
      iconColor: "text-primary animate-pulse",
      value: "94%",
      badge: "Positive",
      badgeClass: "text-primary font-bold",
      hasGlow: true,
    },
    {
      id: "pending",
      label: "Pending Moderation",
      icon: "pending",
      iconFill: false,
      iconColor: "text-tertiary",
      value: "156",
      badge: "High Priority",
      badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
      valueClass: "text-tertiary",
    },
  ],
  reviews: [
    {
      id: "r1",
      product: {
        name: "Aura Run Elite '24",
        sku: "AR-9920",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBY3o_3mr-ngPX91_0a-Gco9dy2mWt2bk8UvuLZsXIfov7_ykat1tjrYntZnx2w6uT_XprbEnyt7Pn7_Om0yoIeE1NxDEBFtNtuBBPwiFdPIq6UiM-fX-QJ4mw_xtqhkQzig1BDTVnNSFM8BNyCRlsOFgRMGhqjfKN6lyIhkLC-zD8gq_nrVA3UsHINVgxSj8ZiQqtNhReP_7B-vOx-pKcjD-02qSIEay-ehWdAV9vrlY9xioY0uffvBDeXHojqGC-ZHTWSN8sjZBtX",
      },
      customer: {
        name: "Elena Aris",
        initials: "EA",
        avatarBg: "bg-secondary-container",
        avatarTextColor: "text-on-secondary-fixed",
        verified: true,
      },
      rating: 5,
      text: 'These shoes are incredible. The carbon fiber plate really gives back energy on every stride. Took them out for a 10k and felt like I was flying.',
      aiLabel: "GENUINE",
      aiLabelClass: "bg-secondary-container/50 text-on-secondary-fixed-variant",
      aiIcon: "auto_awesome",
      aiIconAnimate: true,
      suspicious: false,
      media: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Y8u_NQYv4c8CKt9UXGtW6UXzIVTmadxOI_a5ARX9ReLUPsEc3mDBQMkuHm6_RVX24nFmMP4uVZ6_BEKuMF_5YO77GxB4pfk0GkH1IXfIs-JtiApQPHZ5mOmauaRKJeC5FIjt5kUAGnXc9ijEUQrHG4Zjq7hWFveBRwKfo58aGWxYw6IV7cO4GkwP0nCFY009s0eJiBvT6YyQuRm1GYd6-tRcdcLqCwnlIvEik89rILaYayqyDA9XQ7Lm6D0JcU4clyOOaaHQg0NR",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAs4Fwu7U8I_T5P9Ot38yDqEOBqVv6fl5zzNsFAB5VfPnCDEbs1eh5r6DIsXA81nU6ffSF9SlP61HeHAVm1MtO9lj0GzBgST8W7cT9jmFv_XDPN1ZkEv7ivJ3ZXNhYEtNHSPSbiRDwYYYIdoqwA8bKqvdcw2sqtj5-Ogp_j1e5uxP_nbnvHECxMco7StrXzFEbOj3_nad2mQ7Fq40j-CATH1Uaz9d3S3WINAEITTf87z-Qobnzuq_4Rwqs1XfBDxYanFT-CbddztEIg",
      ],
      status: "pending",
    },
    {
      id: "r2",
      product: {
        name: "Chronos S Watch",
        sku: "CH-001",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBUPwJLIFoqKG1SB0R1Psnn3fm3vXWSHdexDihiA8l7Tzc8R4acXTHazOY1mT8hBhcXoEQHWh0fmCGpTqHLd6meL940UYKf083u8ge6o9hiO30NA7cLxLymRWBcMjdaGKd5Z2gnEo_Pcs57f1am85pUX0G6bYpCe2J6tXCvmOPe1SJWP2uEoVJen2MoY_MxQeLFckIE3xc3DP0oxf1rav_iqTGVuBqp0lrwRLNBVvkukEdZjlKWXGwgofd6Qfl0JMK01i9U8DHCUiv4",
      },
      customer: {
        name: "John Doe",
        initials: "JD",
        avatarBg: "bg-surface-container",
        avatarTextColor: "text-on-surface-variant",
        verified: false,
      },
      rating: 5,
      text: "This product is the best thing I have ever bought in my life. It changed my life. Incredible quality. Buy now! Everyone needs this item.",
      aiLabel: "POTENTIAL AI GENERATED / BOT",
      aiLabelClass: "bg-error-container text-error",
      aiIcon: "warning",
      aiIconAnimate: false,
      suspicious: true,
      media: [],
      status: "pending",
    },
    {
      id: "r3",
      product: {
        name: "Zenith ANC Headphones",
        sku: "ZE-440",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZViA4kwAbQUpBEUez8CTBeIKDRQR0UIoQI6psMcVzFEBaSF9HjblHrFEO45vuW-_m2DoIAkLTz2I0FCSMlg_-aKvfCoS2ejYzUQye5mbJrjhnTWsBu-DVJZonpDjZ9duid3BEtqy9B39OL6ZJb_K6IXcpM1T1-z5uGvD-QsnwBStiTnVr0htJ_OuxckVj6AqXGQzO-Sh0sDDqH4fCMuO5KiajoVHVfRy7a0jH9G1xCdWYfLIqty82UZpHrtYFTXrxjNl60mDqYJd",
      },
      customer: {
        name: "Mark Sloan",
        initials: "MS",
        avatarBg: "bg-tertiary-fixed-dim",
        avatarTextColor: "text-on-tertiary-fixed",
        verified: true,
      },
      rating: 4,
      text: "Noise cancelling is top notch, but the battery life is slightly less than advertised. Overall still a solid buy for commuters.",
      aiLabel: "GENUINE",
      aiLabelClass: "bg-secondary-container/50 text-on-secondary-fixed-variant",
      aiIcon: "auto_awesome",
      aiIconAnimate: true,
      suspicious: false,
      media: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuChd0VAx07wjhxPZLbfDPBL5qMsYp7IAm1o9CXolVsvksUqr3vluO3Z2uBvenuMnA9RB7Rfqp40DY8R5GUPf5YDehXyIXcS0rHkJhd8QJbPz-a-n8Ui337xF_A9OkBYZjUWQLeQmfEKS85V8GR3sJBfNc_HTnT6m8mPUdGhnI_vmGE65EFbPeUb7ToY0kji3Ms4qWJkwpkoO4lG3wO6WN9Kz8eiP_NCMhdIP1fAd90zCKwvAH3LC5HX9Xb0W78gmC44v-dIBF15QO_Q",
      ],
      status: "pending",
    },
  ],
  pagination: {
    current: 1,
    total: 3,
    showing: "1 to 3",
    totalCount: 156,
  },
};

export const fetchReviewsData = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockReviewsData), 400));