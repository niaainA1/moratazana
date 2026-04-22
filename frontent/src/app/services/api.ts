const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = {
  // Produits
  getProduits: async (shopId: number) => {
    const response = await fetch(`${BASE_URL}/produits?shopId=${shopId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  createProduit: async (produit: any) => {
    const response = await fetch(`${BASE_URL}/produits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(produit)
    });
    return response.json();
  },

  updateProduit: async (id: number, produit: any) => {
    const response = await fetch(`${BASE_URL}/produits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(produit)
    });
    return response.json();
  },

  deleteProduit: async (id: number) => {
    const response = await fetch(`${BASE_URL}/produits/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  saveSaisieSoir: async (id: number, data: any) => {
    const response = await fetch(`${BASE_URL}/produits/${id}/saisie-soir`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Rapports
  getStats: async (shopId: number) => {
    const response = await fetch(`${BASE_URL}/rapports/stats?shopId=${shopId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  getAlertes: async (shopId: number) => {
    const response = await fetch(`${BASE_URL}/rapports/alertes?shopId=${shopId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  }
};

// Fonction de conversion
export const toPaintProduct = (data: any) => ({
  id: data.id,
  nom: data.nom,
  prix: data.prix,
  stock: data.stock,
  seuilAlerte: data.seuilAlerte,
  category: data.category,
  description: data.description,
  image: data.image || "/placeholder.jpg"
});

// Exports individuels
export const getProduits = api.getProduits;
export const createProduit = api.createProduit;
export const updateProduit = api.updateProduit;
export const deleteProduit = api.deleteProduit;
export const saveSaisieSoir = api.saveSaisieSoir;
export const getStats = api.getStats;
export const getAlertes = api.getAlertes;

export default api;