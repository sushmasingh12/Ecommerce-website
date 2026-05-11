
const mockSettingsData = {
  storeProfile: {
    storeName: "Precision Curator Enterprise",
    supportEmail: "ops@curator-precision.io",
  },
  notifications: [
    {
      id: "order_emails",
      icon: "mail",
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      title: "Order Success Emails",
      description: "Send confirmation after every purchase",
      enabled: true,
    },
    {
      id: "weekly_reports",
      icon: "analytics",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      title: "Weekly AI Performance Reports",
      description: "Automated insights delivered Monday morning",
      enabled: true,
    },
  ],
  security: {
    loginHistory: [
      {
        id: "session1",
        device: "macOS • Chrome 118",
        icon: "laptop_mac",
        location: "San Francisco, CA • 192.168.1.45",
        label: "Current Session",
        isCurrent: true,
      },
      {
        id: "session2",
        device: "iPhone 15 Pro • iOS 17.1",
        icon: "phone_iphone",
        location: "New York, NY • 10.0.0.12",
        label: "2 hours ago",
        isCurrent: false,
      },
    ],
  },
  team: {
    memberCount: 4,
    members: [
      {
        id: "u1",
        name: "Alex Rivera",
        email: "alex.r@curator.ai",
        role: "Admin",
        roleClass: "bg-primary/10 text-primary",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAE4XInaxkbodO3C8sdfxkkngVEtJvcjyCMcFSCxH3lqquhIhQZKVVOwFqoWxp5sjkhKqJfqOWDYgIW-eYgXw7TF-km3E4DRPcVRTDOYB42lreDIsJV79OWuWhAHadnM6Kfyrjh-rPlm0A_TzDM0pyZcTA1h3XKW4a4aChcKXrCj4Hy5JdFs82zsWKJvccNeoapiGVCSY3O5rjsquqYqu3dwMeSmKpdjmY4gATMBeUUUtJfqFA02WYL4donzMW5CWOfJVYcg8jZGYNM",
      },
      {
        id: "u2",
        name: "Sarah Jenkins",
        email: "s.jenkins@curator.ai",
        role: "Manager",
        roleClass: "bg-secondary-container text-on-secondary-container",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAXD_JUGF23ea1SOY5MfFG9xAB4qhua_IFT55eRWvIHkSzHKGkfjLM2dprikq60HeGTCCLzfs4iJH7VucGPHQ-buOklNreyqEjDEpO48eks4DFjIDuDEwpyCYDkZXIKIWtwLnBSQeiG3L19ZJTZSrzYMechltHmX9WOWw9XwKLNt9MyctDSfJJllIzfc1BiFhb9dzYh82jwk7qdPv2caQJiIROR-O9k2I7Wp1qcCdg3HeBrfROgy78Ylj0fiTKHppdYxHZhSsRIHu1E",
      },
      {
        id: "u3",
        name: "David Chen",
        email: "d.chen@curator.ai",
        role: "Support",
        roleClass: "bg-surface-container-high text-on-surface-variant",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOmclWkE8wwf6HDtKMtN3IAFIVg74hT2WE__gPF71WXct6DXs6ylmCNee_Mk30-FfcUzflbHALm6JAtlRPJyQp8BdpwVPRfjVHTNYzSp-YhmDbhFR5JCU4yo9hcT5JFqYH4646sYUoaPtErmTnRRGopUkL5a7t_I8l_fVSHBfViznX7mTmUA6SFjEbZdCk9AFotmpGcmlfjf_ygivlE2hUsILyrkMpqN_n3NvI224b_bo8-DFCilY9BwNv2sycOl-J1jlhU3T8XXr",
      },
    ],
  },
  shipping: {
    smartTaxEnabled: true,
    activeZones: [
      { label: "North America", active: true },
      { label: "European Union", active: false },
      { label: "APAC", active: false },
    ],
    currencies: [
      "USD - United States Dollar",
      "EUR - Euro",
      "GBP - British Pound",
    ],
    selectedCurrency: "USD - United States Dollar",
  },
};

export const fetchSettingsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSettingsData), 400);
  });
};

export const saveSettingsData = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data }), 600);
  });
};