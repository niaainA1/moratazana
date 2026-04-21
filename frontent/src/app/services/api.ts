import { getToken } from "./auth";

const BASE_URL = "http://192.168.1.85:8080/api";

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface ProduitAPI {
  id: number;
  name: string;
  imageUrl: string;
  currentStock: number;
  price: number;
  minStock: number;
  shopId: string;
}

export interface SaisieSoirPayload {
  soldToday: number;
  newArrival: number;
}

export interface StatsAPI {
  totalStock: number;
  totalProduits: number;
  produitsEnStock: number;
  produitsRupture: number;
  produitsFaible: number;
  valeurTotale: number;
  prixMoyen: number;
  shopId: string;
}

// GET tous les produits d'une boutique
export async function getProduits(shopId: string): Promise<ProduitAPI[]> {
  const response = await fetch(`${BASE_URL}/produits?shopId=${shopId}`, {
    headers: authHeaders(),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors du chargement des produits");
  return response.json();
}

// POST créer un nouveau produit
export async function createProduit(produit: Partial<ProduitAPI>): Promise<ProduitAPI> {
  const response = await fetch(`${BASE_URL}/produits`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(produit),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors de la création");
  return response.json();
}

// PUT modifier un produit existant
export async function updateProduit(id: number, produit: Partial<ProduitAPI>): Promise<ProduitAPI> {
  const response = await fetch(`${BASE_URL}/produits/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(produit),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors de la mise à jour");
  return response.json();
}

// PATCH saisie du soir
export async function saisieSoir(id: number, payload: SaisieSoirPayload): Promise<ProduitAPI> {
  const response = await fetch(`${BASE_URL}/produits/${id}/saisie-soir`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors de la mise à jour");
  return response.json();
}

// DELETE supprimer un produit
export async function deleteProduit(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/produits/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors de la suppression");
}

// GET statistiques de la boutique
export async function getStats(shopId: string): Promise<StatsAPI> {
  const response = await fetch(`${BASE_URL}/rapports/stats?shopId=${shopId}`, {
    headers: authHeaders(),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors du chargement des statistiques");
  return response.json();
}

// GET produits en alerte (rupture ou stock faible)
export async function getAlertes(shopId: string): Promise<ProduitAPI[]> {
  const response = await fetch(`${BASE_URL}/rapports/alertes?shopId=${shopId}`, {
    headers: authHeaders(),
  });
  if (response.status === 401) throw new Error("SESSION_EXPIRED");
  if (!response.ok) throw new Error("Erreur lors du chargement des alertes");
  return response.json();
}

// Convertir ProduitAPI → PaintProduct (format frontend)
export function toPaintProduct(p: ProduitAPI) {
  return {
    id: String(p.id),
    name: p.name,
    imageUrl: p.imageUrl,
    currentStock: p.currentStock,
    price: p.price,
    minStock: p.minStock,
    soldToday: 0,
    newArrival: 0,
  };
}
