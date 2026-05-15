const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

// ── Core fetch helper ─────────────────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
};

// ── Build query string from filters ──────────────────────────
const buildQuery = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', filters.page);
  if (filters.limit) params.set('limit', filters.limit);
  if (filters.search) params.set('keyword', filters.search);
  if (filters.category && filters.category !== 'All')
    params.set('category', filters.category);
  if (filters.status && filters.status !== 'All')
    params.set('status', filters.status);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
};

// ── Product API ───────────────────────────────────────────────

/** GET /admin/products?page=&keyword=&category=&status= */
export const getAdminProducts = (filters = {}) =>
  apiFetch(`/admin/products${buildQuery(filters)}`);

/** GET /product/:id */
export const getProductDetails = (id) =>
  apiFetch(`/product/${id}`);

/** POST /admin/product/new  (JSON, no images) */
export const createProduct = (productData) =>
  apiFetch('/admin/product/new', {
    method: 'POST',
    body: JSON.stringify(productData),
  });

/**
 * POST /admin/product/:id/images
 * Upload images separately so we can use multipart/form-data
 */
export const uploadProductImages = async (id, files) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('images', file));

  const response = await fetch(`${API_URL}/admin/product/${id}/images`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
    // NOTE: do NOT set Content-Type here; the browser sets it with the boundary
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Image upload failed.');
  return data;
};

/**
 * POST /admin/product/:id/image-url
 */
export const uploadProductImageByUrl = async (id, url) => {
  return apiFetch(`/admin/product/${id}/image-url`, {
    method: 'POST',
    body: JSON.stringify({ url }),
  });
};

/** PUT /admin/product/:id */
export const updateProduct = (id, productData) =>
  apiFetch(`/admin/product/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });

/** DELETE /admin/product/:id */
export const deleteProduct = (id) =>
  apiFetch(`/admin/product/${id}`, { method: 'DELETE' });

/** DELETE /admin/product/:id/image/:imageId */
export const deleteProductImage = (productId, imageId) =>
  apiFetch(`/admin/product/${productId}/image/${imageId}`, { method: 'DELETE' });
