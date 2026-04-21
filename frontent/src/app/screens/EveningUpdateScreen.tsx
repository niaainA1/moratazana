import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useApp } from "../context/AppContext";
import { PaintProduct } from "../data/mockData";
import { toast } from "sonner";

export function EveningUpdateScreen() {
  const navigate = useNavigate();
  const { products: globalProducts, updateProducts } = useApp();
  const [products, setProducts] = useState<PaintProduct[]>(globalProducts);

  const handleSoldChange = (id: string, value: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, soldToday: parseInt(value) || 0 } : p
      )
    );
  };

  const handleArrivalChange = (id: string, value: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, newArrival: parseInt(value) || 0 } : p
      )
    );
  };

  const handleSave = () => {
    // Calculate statistics before updating
    const totalSold = products.reduce((sum, p) => sum + (p.soldToday || 0), 0);
    const totalArrival = products.reduce((sum, p) => sum + (p.newArrival || 0), 0);
    
    // Calculate new stock
    const updatedProducts = products.map((p) => ({
      ...p,
      currentStock: p.currentStock - (p.soldToday || 0) + (p.newArrival || 0),
      soldToday: 0,
      newArrival: 0,
    }));
    
    // Update global state
    updateProducts(updatedProducts);
    
    // Show success message with details
    toast.success("Stock mis à jour avec succès!", {
      description: `${totalSold} unités vendues, ${totalArrival} unités reçues`,
      duration: 3000,
    });
    
    // Navigate back after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-6 py-6 sticky top-0 z-10">
        <div className="max-w-[360px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl">Saisie du soir</h1>
              <p className="text-white/80 text-xs mt-1">
                Mise à jour quotidienne
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-[360px] mx-auto px-6 py-4 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-4">
              {/* Product Header */}
              <div className="flex gap-3 mb-4">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Stock actuel: <span className="text-[#1e3a8a]">{product.currentStock}</span>
                  </p>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Quantité vendue aujourd'hui
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={product.soldToday || ""}
                    onChange={(e) =>
                      handleSoldChange(product.id, e.target.value)
                    }
                    placeholder="0"
                    className="w-full h-10 rounded-lg border-2 border-gray-200 focus:border-[#1e3a8a] px-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Nouvel arrivage
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={product.newArrival || ""}
                    onChange={(e) =>
                      handleArrivalChange(product.id, e.target.value)
                    }
                    placeholder="0"
                    className="w-full h-10 rounded-lg border-2 border-gray-200 focus:border-[#f97316] px-3 text-sm"
                  />
                </div>
              </div>

              {/* Calculation Preview */}
              {((product.soldToday ?? 0) > 0 || (product.newArrival ?? 0) > 0) && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <p className="text-xs text-blue-900">
                    Nouveau stock:{" "}
                    <span className="font-medium">
                      {product.currentStock -
                        (product.soldToday || 0) +
                        (product.newArrival || 0)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="max-w-[360px] mx-auto">
          <Button
            onClick={handleSave}
            className="w-full h-12 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl shadow-lg flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Enregistrer</span>
          </Button>
        </div>
      </div>
    </div>
  );
}