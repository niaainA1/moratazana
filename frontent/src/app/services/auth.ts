const BASE_URL = "https://moratazana-api.onrender.com/api";

export const auth = {
  login: async (telephone: string, password: string) => {
    console.log("Login URL:", `${BASE_URL}/auth/login`);
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  saveToken: (token: string, userData: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
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

export const login = auth.login;
export const saveToken = auth.saveToken;
export const logout = auth.logout;
export const removeToken = auth.logout;
export const getCurrentUser = auth.getCurrentUser;
export const getToken = auth.getToken;
export const isAuthenticated = auth.isAuthenticated;

export default auth;
