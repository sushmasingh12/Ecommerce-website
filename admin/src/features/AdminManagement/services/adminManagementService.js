const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

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

export const getAdmins = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  return apiFetch(`/auth/manage-admins?${query}`);
};

export const getAdmin = async (id) => {
  return apiFetch(`/auth/manage-admins/${id}`);
};

export const createAdmin = async (adminData) => {
  return apiFetch('/auth/manage-admins', {
    method: 'POST',
    body: JSON.stringify(adminData),
  });
};

export const updateAdmin = async (id, updateData) => {
  return apiFetch(`/auth/manage-admins/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
};

export const deleteAdmin = async (id) => {
  return apiFetch(`/auth/manage-admins/${id}`, {
    method: 'DELETE',
  });
};

export const toggleAdminStatus = async (id) => {
  return apiFetch(`/auth/manage-admins/${id}/toggle-status`, {
    method: 'PATCH',
  });
};
