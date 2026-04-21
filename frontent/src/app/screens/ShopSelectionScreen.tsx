import { useNavigate } from "react-router";
import { Store, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

export function ShopSelectionScreen() {
  const navigate = useNavigate();
  const { setSelectedShop } = useApp();

  const shops = [
    {
      id: "main",
      name: "Moratazana – Boutique principale",
      location: "Fenerive Est",
    },
    {
      id: "second",
      name: "Moratazana – Deuxième boutique",
      location: "Centre ville",
    },
  ];

  const handleShopSelect = (shopId: string) => {
    // Store selected shop
    setSelectedShop(shopId);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-6 py-8">
        <div className="max-w-[360px] mx-auto">
          <h1 className="text-2xl mb-2">Sélectionnez votre boutique</h1>
          <p className="text-white/80 text-sm">
            Choisissez la boutique à gérer
          </p>
        </div>
      </div>

      {/* Shop Cards */}
      <div className="max-w-[360px] mx-auto px-6 py-6 space-y-4">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => handleShopSelect(shop.id)}
            className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex items-center gap-4 active:scale-98"
          >
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] p-3 rounded-xl">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 mb-1">{shop.name}</h3>
              <p className="text-sm text-gray-500">{shop.location}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="max-w-[360px] mx-auto px-6 mt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Astuce :</strong> Vous pouvez changer de boutique à tout moment depuis le tableau de bord.
          </p>
        </div>
      </div>
    </div>
  );
}