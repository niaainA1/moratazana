import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PaintProduct } from "../data/mockData";
import { getProduits } from "../services/api";
import { PaintProduct } from "../data/mockData";
import { removeToken } from "../services/auth";

// Fonction utilitaire pour convertir les données de l'API au format PaintProduct
const toPaintProduct = (data: any): PaintProduct => {
  return {
    id: data.id,
    nom: data.nom,
    prix: data.prix,
    stock: data.stock,
    seuilAlerte: data.seuilAlerte,
    category: data.category,
    description: data.description,
    image: data.image || "/placeholder.jpg"
  };
};

interface AppContextType {
  products: PaintProduct[];
  updateProducts: (products: PaintProduct[]) => void;
  selectedShop: string | null;
  setSelectedShop: (shopId: string) => void;
  loading: boolean;
  error: string | null;
  reloadProducts: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<PaintProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedShop, setSelectedShopState] = useState<string | null>(
    localStorage.getItem("selectedShop")
  );

  const loadProducts = async (shopId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProduits(shopId);
      setProducts(data.map(toPaintProduct));
    } catch (err: any) {
      if (err.message === "SESSION_EXPIRED") {
        removeToken();
        window.location.href = "/";
        return;
      }
      setError("Impossible de charger les produits.");
      // Fallback localStorage si pas de connexion
      const saved = localStorage.getItem(`products_${shopId}`);
      if (saved) setProducts(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits quand la boutique change
  useEffect(() => {
    if (selectedShop) {
      loadProducts(selectedShop);
    }
  }, [selectedShop]);

  // Sauvegarde locale comme backup offline
  useEffect(() => {
    if (selectedShop && products.length > 0) {
      localStorage.setItem(`products_${selectedShop}`, JSON.stringify(products));
    }
  }, [products, selectedShop]);

  const updateProducts = (newProducts: PaintProduct[]) => {
    setProducts(newProducts);
  };

  const handleSetSelectedShop = (shopId: string) => {
    setSelectedShopState(shopId);
    localStorage.setItem("selectedShop", shopId);
  };

  const reloadProducts = () => {
    if (selectedShop) loadProducts(selectedShop);
  };

  const logout = () => {
    removeToken();
    setProducts([]);
    setSelectedShopState(null);
    localStorage.removeItem("selectedShop");
    window.location.href = "/";
  };

  return (
    <AppContext.Provider
      value={{
        products,
        updateProducts,
        selectedShop,
        setSelectedShop: handleSetSelectedShop,
        loading,
        error,
        reloadProducts,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
