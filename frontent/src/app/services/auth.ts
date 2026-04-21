// src/app/services/auth.ts

const BASE_URL = "http://192.168.1.85:8080/api";

export interface LoginResponse {
  token: string;
  nom: string;
  telephone: string;
}

export async function login(telephone: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telephone, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Téléphone ou mot de passe incorrect");
  }

  return response.json();
}

// Sauvegarde du token
export function saveToken(token: string) {
  localStorage.setItem("jwt_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("jwt_token");
}

export function removeToken() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("selectedShop");
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  try {
    // Vérifier expiration côté client
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
