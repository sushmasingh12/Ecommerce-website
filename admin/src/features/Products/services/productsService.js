const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const productsService = {
  async fetchProducts({ page = 1, search = "", category = "", status = "" } = {}) {
    await delay(700);

    const allProducts = [
      {
        id: "p1",
        name: "Chronos Minimalist",
        sku: "WCH-00124",
        category: "Accessories",
        price: "$249.00",
        stock: 1204,
        stockStatus: "IN STOCK",   // "IN STOCK" | "LOW STOCK" | "OUT OF STOCK"
        status: "Active",          // "Active" | "Draft" | "Archived"
       
        image: null,
      },
      {
        id: "p2",
        name: "Sonic Runner X1",
        sku: "SHO-99012",
        category: "Footwear",
        price: "$129.50",
        stock: 12,
        stockStatus: "LOW STOCK",
        status: "Draft",
        
        image: null,
      },
      {
        id: "p3",
        name: "Audio-Pro Zero",
        sku: "AUD-11234",
        category: "Electronics",
        price: "$599.00",
        stock: 458,
        stockStatus: "IN STOCK",
        status: "Active",
        
        image: null,
      },
    ];

    // Client-side filtering simulation
    let filtered = allProducts;
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (status && status !== "All") {
      filtered = filtered.filter((p) => p.status === status);
    }

    return {
      products: filtered,
      total: 2456,
      page,
      perPage: 10,
      totalPages: 24,
    };
  },

  async fetchQuickStats() {
    await delay(500);
    return {
      totalActive: 1842,
      lowStock: 14,
      avgRating: 4.8,
    };
  },

  async fetchAIInsight() {
    await delay(600);
    return {
      title: "Inventory optimization required.",
      description: `Based on current sales velocity and upcoming holiday trends, the <strong>"Sonic Runner X1"</strong> is predicted to sell out in 4 days. We recommend increasing stock by 25% to avoid missed revenue.`,
      cta: "Apply Recommendation",
    };
  },

  async deleteProduct(id) {
    await delay(400);
    return { success: true, id };
  },

  async exportProducts() {
    await delay(300);
    return { success: true, url: "#" };
  },

  async addProduct(data) {
  await delay(800);
  return {
    success: true,
    product: {
      id: `p${Date.now()}`,
      ...data,
    },
  };
},
};