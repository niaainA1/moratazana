import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export function NavigationHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { path: "/", name: "🔐 Login" },
    { path: "/shop-selection", name: "🏪 Sélection boutique" },
    { path: "/dashboard", name: "📊 Tableau de bord" },
    { path: "/evening-update", name: "🌙 Saisie du soir" },
    { path: "/inventory", name: "📦 Inventaire" },
    { path: "/report", name: "📈 Rapports" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleResetData = () => {
    if (confirm("Voulez-vous vraiment réinitialiser toutes les données ? Cette action est irréversible.")) {
      localStorage.clear();
      toast.success("Données réinitialisées avec succès");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 bg-white text-gray-900 p-2 rounded-full shadow-lg z-50 hover:bg-gray-100 transition-colors border-2 border-gray-200"
        title="Navigation rapide"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Navigation
            </h3>
            <div className="space-y-2">
              {routes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => handleNavigate(route.path)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === route.path
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {route.name}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleResetData}
                className="w-full bg-red-50 text-red-700 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Réinitialiser les données</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Informations
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>📱 Format: Android 360x800</p>
                <p>🎨 Couleurs: Bleu, Orange</p>
                <p>🌍 Madagascar - Ariary (Ar)</p>
                <p>🇫🇷 Interface: Français</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}