const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

// credentials: 'include' — httpOnly cookie automatically har request ke saath bheja jaata hai
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

// ─── Authentication ───────────────────────────────────────────────────────────
export const fetchMe = async () => {
  return apiFetch('/auth/me');
};

// ─── Signin ───────────────────────────────────────────────────────────────────
export const signinUser = async (payload) => {
  const data = await apiFetch('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  // Cookie automatically set ho jaati hai — localStorage ki zaroorat nahi
  return { ...data, user: data.admin };
};

// ─── Signout ──────────────────────────────────────────────────────────────────
export const signoutUser = async () => {
  return apiFetch('/auth/signout', { method: 'POST' });
};
