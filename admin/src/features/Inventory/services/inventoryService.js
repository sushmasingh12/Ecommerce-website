// src/services/inventoryService.js

const MOCK_STATS = {
  totalSkuValue: "$4,281,090",
  totalSkuValueChange: "+2.4%",
  lowStockCount: 42,
  outOfStockCount: 8,
  inTransitUnits: 1420,
  inTransitShipments: 12,
};

const MOCK_ALERTS = [
  {
    id: "alert-001",
    type: "critical",
    product: "Velocity Glide Runners",
    message: "Stock level: 0. Backorder volume increasing.",
    action: "Process Urgent PO",
  },
  {
    id: "alert-002",
    type: "warning",
    product: "Arctic Shell Parka",
    message: "Lead time delay detected (Warehouse B).",
    action: "Contact Carrier",
  },
];

const MOCK_AI_RECOMMENDATION = {
  title: "Recommendation: Restock 50 units of Aura Pro Headphones",
  description:
    "Based on current sales velocity (+18%) and upcoming seasonal trends, stocking an additional 50 units will mitigate stock-out risk for the next 45 days.",
  confidence: 94.2,
  avgDailySales: 12.4,
  daysRemaining: 4,
};

const MOCK_INVENTORY = [
  {
    id: "inv-001",
    name: "Aura Pro Headphones",
    sku: "EL-AUD-209",
    category: "Electronics",
    stockCurrent: 12,
    stockMax: 100,
    warehouse: "NY-MAIN-A4",
    status: "Low Stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJKcGXIz_twYOVotmty4GobQJ-5eQBMg-sP9Xjzur9Z3Ouz8YnsojbAcNRgNC9grpRq9wDk33zZfXHCw_VWE9eXRReFU3Oi8s_4Fr4McbYNJozpoIAkw5JlNKHVgXv2YJDzLcoM7GFotwA1EyMfJu-J_VfN9WVHBALZiqTxcGmvRmHPDq1Bzv1LRR63rAI8-uWmVLB_Iq-uFR9SnnGW8OZ7dBd7F_wFDD3C9hF8A4JbuQ86rg6qtgY3X5Cw91baSE5pqBZX0kBfgYP",
  },
  {
    id: "inv-002",
    name: "Velocity Glide Runners",
    sku: "AP-SHO-012",
    category: "Apparel",
    stockCurrent: 0,
    stockMax: 250,
    warehouse: "LA-WEST-B2",
    status: "Out of Stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0Pm6pmO8Tec59RDBao5LEM5YaNq2RQutziW1wQYTHx2w3gpm0IRm-r4h0O2vTL30IZ4QiJlBsuGgXFtlpV3aXmaOKDxtN6dm97qB1k_lPOKOass27f7MZkQL-Pqm8nKsNZ3bZYJjxvnv2aW3DvIZsT8nGujuwssY9xTnkc2iY81XusLRSF02OJSlN9rB-9tY_tBSEa67FTNTHRomDy0L_wymmFuPAmmUIpWHiAbfD4_nHYxm3L9liYtw0WCujC7Kdh5qj54Rp7cPY",
  },
  {
    id: "inv-003",
    name: "Zenith Series 7 Watch",
    sku: "EL-WTC-772",
    category: "Electronics",
    stockCurrent: 412,
    stockMax: 500,
    warehouse: "DE-CENT-1",
    status: "In Stock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJow3KOCK0hYEoIM0-Fp1zENyLZN7z9CHfYr3h6l8nAgttLN9nOAztY0VmOCOec8XkTLKXIMFFK4MkDNZPnhjOpvM2lHklRc-PPyU9rqB2cNAYuhL7Om2lIQmvmDwpk5cC70QpJKdyUQNPCaw4y555cdUDpuYRYwq-5F1YNOOv8rEuepuXP72XRauuPEDM_fgG_7Z002rHJDAwn7zO_Nusxfw5l2b0ImwCXPvyul8fpPbO7bX1J6jz16d8ESogtuICfHlGyUtu8mO_",
  },
  {
    id: "inv-004",
    name: "Organic Cotton Tee Set",
    sku: "AP-TEE-990",
    category: "Apparel",
    stockCurrent: 160,
    stockMax: 250,
    warehouse: "NY-MAIN-C1",
    status: "In Transit",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiTF6T9vKstEEFogZWjhdGwUoQipR3rOlLDKxTayinhbVGQ6nzqLrWtul3beRTCKilYNRmqR4Mm8Q5hQr9UdVdmSaFfw4U4gUw_as5XIlf4N7rtPzQLMimfxiC0SA9wjJ98dVkgWHG7rDfhY7x5J1LN0-QG9h_xICyXK0giUYdbzpO92ewAtP0tudD6vNkoFP_iXb0lBK1jpycnfLU1AWW44W9UvwXCjcOrw2ZK75kI7QpZWeTSA6o0GQWeDJVcrlfrOqHw4zMW3cY",
  },
];

export const fetchInventoryStatsAPI = async () => {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_STATS;
};

export const fetchInventoryAlertsAPI = async () => {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_ALERTS;
};

export const fetchAIRecommendationAPI = async () => {
  await new Promise((r) => setTimeout(r, 500));
  return MOCK_AI_RECOMMENDATION;
};

export const fetchInventoryItemsAPI = async ({ stockFilter, categoryFilter, warehouseFilter }) => {
  await new Promise((r) => setTimeout(r, 600));
  let items = [...MOCK_INVENTORY];

  if (stockFilter && stockFilter !== "Stock Level: All") {
    items = items.filter((i) => i.status === stockFilter);
  }
  if (categoryFilter && categoryFilter !== "Category: All") {
    items = items.filter((i) => i.category === categoryFilter);
  }
  if (warehouseFilter && warehouseFilter !== "Warehouse: All") {
    const warehouseMap = {
      "Main Hub (NY)": "NY",
      "West Coast (LA)": "LA",
      "EU Central (DE)": "DE",
    };
    const prefix = warehouseMap[warehouseFilter];
    if (prefix) items = items.filter((i) => i.warehouse.startsWith(prefix));
  }

  return { items, total: 820 };
};