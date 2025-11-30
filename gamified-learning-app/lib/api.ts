const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const DJANGO_BASE_URL = API_BASE_URL; // For redirects to Django

// Get CSRF token from cookies
export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// API functions
export const api = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken') || '',
      },
      body: JSON.stringify({ username: email, password }),
    });
    return response;
  },

  register: async (username: string, password: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken') || '',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password, role }),
    });
    return response;
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/api/logout/`, {
      method: 'POST',
      credentials: 'include',
    });
    return response;
  },

  getUser: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  },

  getUserCount: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user-count/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  },

  // User management APIs
  getUsers: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  },

  createUser: async (token: string, userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/users/create/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  },

  updateUser: async (token: string, userId: number, userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  },

  deleteUser: async (token: string, userId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  },
};
