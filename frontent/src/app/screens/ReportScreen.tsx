import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, AlertTriangle, Package, RefreshCw } from "lucide-react";
import { formatPrice } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { getStats, getAlertes, StatsAPI, ProduitAPI } from "../services/api";

export function ReportScreen() {
  const navigate = useNavigate();
  const { selectedShop, products } = useApp();

  const [stats, setStats] = useState<StatsAPI | null>(null);
  const [alertes, setAlertes] = useState<ProduitAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getFormattedDate = () => {
    const days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    const months = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const now = new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  const getShopName = () => {
    if (selectedShop === "main") return "Boutique principale";
    if (selectedShop === "second") return "Deuxième boutique";
    return "Boutique";
  };

  const loadData = async () => {
    if (!selectedShop) return;
    setLoading(true);
    setError(null);
    try {
      const [statsData, alertesData] = await Promise.all([
        getStats(selectedShop),
        getAlertes(selectedShop),
      ]);
      setStats(statsData);
      setAlertes(alertesData);
    } catch (err: any) {
      setError("Impossible de charger les rapports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedShop]);

  // Valeur totale calculée depuis les produits locaux
  const valeurTotale = products.reduce((sum, p) => sum + p.currentStock * p.price, 0);
  const prixMoyen = products.length > 0
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-6 py-6">
        <div className="max-w-[360px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl">Rapports</h1>
                <p className="text-white/80 text-xs mt-1">{getShopName()}</p>
              </div>
            </div>
            <button
              onClick={loadData}
              className="p-2 hover:bg-white/10 rounded-lg"
              title="Recharger"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[360px] mx-auto px-6 py-6 space-y-6">

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Chargement */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500 text-sm">
            Chargement des statistiques...
          </div>
        )}

        {/* Statistiques stock */}
        {!loading && stats && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[#1e3a8a]" />
              <h2 className="text-gray-900">Stock actuel</h2>
              <span className="text-xs text-gray-400 ml-1">{getFormattedDate()}</span>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Total unités</p>
                  <p className="text-2xl font-semibold text-[#1e3a8a]">{stats.totalStock}</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">Valeur stock</p>
                  <p className="text-lg font-semibold text-[#f97316]">{formatPrice(stats.valeurTotale)}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total produits</span>
                  <span className="text-sm font-medium text-gray-900">{stats.totalProduits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Produits disponibles</span>
                  <span className="text-sm font-medium text-green-700">{stats.produitsEnStock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stock faible</span>
                  <span className="text-sm font-medium text-orange-600">{stats.produitsFaible}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">En rupture</span>
                  <span className="text-sm font-medium text-red-600">{stats.produitsRupture}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Prix moyen</span>
                  <span className="text-sm font-medium text-gray-900">{formatPrice(stats.prixMoyen)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Répartition stock - barres visuelles */}
        {!loading && stats && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-[#1e3a8a]" />
              <h2 className="text-gray-900">Répartition des produits</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">
              {[
                { label: "Disponibles", value: stats.produitsEnStock, total: stats.totalProduits, color: "bg-green-500" },
                { label: "Stock faible", value: stats.produitsFaible, total: stats.totalProduits, color: "bg-orange-500" },
                { label: "Rupture", value: stats.produitsRupture, total: stats.totalProduits, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value} / {item.total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`${item.color} h-2.5 rounded-full transition-all`}
                      style={{ width: item.total > 0 ? `${(item.value / item.total) * 100}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alertes - produits en rupture ou stock faible */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h2 className="text-gray-900">Produits à commander</h2>
            {alertes.length > 0 && (
              <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                {alertes.length}
              </span>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-400 text-sm">Chargement...</div>
            ) : alertes.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-green-600 text-sm font-medium">
                  Tous les produits ont un stock suffisant
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {alertes.map((produit) => {
                  const isRupture = produit.currentStock === 0;
                  return (
                    <div key={produit.id} className="p-4 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-gray-900 truncate">{produit.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Stock: {produit.currentStock} / Min: {produit.minStock}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                        isRupture
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {isRupture ? "Rupture" : "Stock faible"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
