// src/app/screens/DashboardScreen.tsx

import { useNavigate } from "react-router";
import { Package, AlertCircle, Clock, WifiOff, ArrowRight, LogOut, RefreshCw } from "lucide-react";
import { getStockStatus } from "../data/mockData";
import { useApp } from "../context/AppContext";

export function DashboardScreen() {
  const navigate = useNavigate();
  const { products, selectedShop, loading, error, reloadProducts, logout } = useApp();

  const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0);
  const outOfStock = products.filter((p) => getStockStatus(p) === "Rupture").length;
  const lowStock = products.filter((p) => getStockStatus(p) === "Stock faible").length;

  const getShopName = () => {
    if (selectedShop === "main") return "Boutique principale";
    if (selectedShop === "second") return "Deuxième boutique";
    return "Boutique";
  };

  const getFormattedDate = () => {
    const days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    const months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-6 pt-6 pb-8">
        <div className="max-w-[360px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Bouton recharger */}
            <button
              onClick={reloadProducts}
              className="p-2 hover:bg-white/10 rounded-lg"
              title="Recharger"
            >
              <RefreshCw className={`w-6 h-6 ${loading ? "animate-spin" : ""}`} />
            </button>
            <div className="text-center flex-1">
              <h1 className="text-xl">Tableau de bord</h1>
              <p className="text-white/80 text-xs mt-1">{getShopName()}</p>
            </div>
            {/* Bouton déconnexion */}
            <button
              onClick={logout}
              className="p-2 hover:bg-white/10 rounded-lg"
              title="Se déconnecter"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center text-white/90 text-sm">
            {getFormattedDate()}
          </div>
        </div>
      </div>

      <div className="max-w-[360px] mx-auto px-6 -mt-4 space-y-3">

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error} Données locales utilisées.</span>
          </div>
        )}

        {/* Chargement */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-md p-5 text-center text-gray-500 text-sm">
            Chargement des données...
          </div>
        )}

        {/* Stock total */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package className="w-6 h-6 text-[#1e3a8a]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Stock total peinture</p>
              <h2 className="text-2xl text-gray-900 mt-1">{totalStock} unités</h2>
            </div>
          </div>
        </div>

        {/* Rupture de stock */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Produits en rupture</p>
              <h2 className="text-2xl text-gray-900 mt-1">{outOfStock} produits</h2>
              {lowStock > 0 && (
                <p className="text-xs text-orange-600 mt-1">{lowStock} en stock faible</p>
              )}
            </div>
          </div>
        </div>

        {/* Saisie du soir */}
        <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-2xl shadow-md p-5 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white/90">Mise à jour du soir</p>
              <h2 className="text-lg mt-1">En attente</h2>
            </div>
          </div>
          <button
            onClick={() => navigate("/evening-update")}
            className="w-full bg-white text-[#f97316] rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/90"
          >
            <span>Mettre à jour le stock</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accès rapide */}
      <div className="max-w-[360px] mx-auto px-6 mt-6">
        <h3 className="text-gray-900 mb-3 px-1">Accès rapide</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/inventory")}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all active:scale-95"
          >
            <Package className="w-8 h-8 text-[#1e3a8a] mb-2" />
            <p className="text-sm text-gray-900">Inventaire</p>
          </button>
          <button
            onClick={() => navigate("/report")}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all active:scale-95"
          >
            <AlertCircle className="w-8 h-8 text-[#1e3a8a] mb-2" />
            <p className="text-sm text-gray-900">Rapports</p>
          </button>
        </div>
      </div>

      {/* Mode hors ligne */}
      <div className="max-w-[360px] mx-auto px-6 mt-6">
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
          <WifiOff className="w-5 h-5 text-gray-600" />
          <p className="text-sm text-gray-700">Mode hors ligne possible</p>
        </div>
      </div>
    </div>
  );
}
