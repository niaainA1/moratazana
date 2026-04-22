const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const auth = {
  login: async (telephone: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telephone, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur de connexion');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        nom: data.nom,
        telephone: data.telephone
      }));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
// Exports individuels pour compatibilité
export const login = auth.login;
export const logout = auth.logout;
export const removeToken = auth.logout;
export const getCurrentUser = auth.getCurrentUser;
export const getToken = auth.getToken;
export const isAuthenticated = auth.isAuthenticated;

// Export par défaut
export default auth;

