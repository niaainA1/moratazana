import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Filter, RefreshCw, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { getStockStatus, formatPrice } from "../data/mockData";
import { Input } from "../components/ui/input";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useApp } from "../context/AppContext";
import { createProduit, updateProduit, deleteProduit, toPaintProduct } from "../services/api";
import { toast } from "sonner";

// Formulaire vide par défaut
const emptyForm = {
  name: "",
  price: "",
  currentStock: "",
  minStock: "",
  imageUrl: "",
};

export function InventoryScreen() {
  const navigate = useNavigate();
  const { products, loading, error, reloadProducts, selectedShop, updateProducts } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // État du formulaire (null = fermé)
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // État de confirmation suppression
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || getStockStatus(product) === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible": return "bg-green-100 text-green-800 border-green-200";
      case "Stock faible": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Rupture": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Ouvrir formulaire pour AJOUTER
  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  // Ouvrir formulaire pour MODIFIER
  const handleOpenEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      currentStock: String(product.currentStock),
      minStock: String(product.minStock),
      imageUrl: product.imageUrl || "",
    });
    setShowForm(true);
  };

  // Fermer formulaire
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // Sauvegarder (ajouter ou modifier)
  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.currentStock || !form.minStock) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        price: parseInt(form.price),
        currentStock: parseInt(form.currentStock),
        minStock: parseInt(form.minStock),
        imageUrl: form.imageUrl.trim(),
        shopId: selectedShop || "main",
      };

      if (editingId) {
        // MODIFIER un produit existant
        const updated = await updateProduit(parseInt(editingId), payload);
        updateProducts(
          products.map((p) => p.id === editingId ? { ...toPaintProduct(updated) } : p)
        );
        toast.success("Produit modifié avec succès !");
      } else {
        // AJOUTER un nouveau produit
        const created = await createProduit(payload);
        updateProducts([...products, toPaintProduct(created)]);
        toast.success("Produit ajouté avec succès !");
      }

      handleCloseForm();
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  // SUPPRIMER un produit
  const handleDelete = async (id: string) => {
    try {
      await deleteProduit(parseInt(id));
      updateProducts(products.filter((p) => p.id !== id));
      toast.success("Produit supprimé");
      setDeletingId(null);
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-6 py-6 sticky top-0 z-10">
        <div className="max-w-[360px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl">Inventaire</h1>
              <p className="text-white/80 text-xs mt-1">
                {loading ? "Chargement..." : `${filteredProducts.length} produits`}
              </p>
            </div>
            <button onClick={reloadProducts} className="p-2 hover:bg-white/10 rounded-lg" title="Recharger">
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full h-11 bg-white rounded-xl pl-10 pr-4 text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Erreur */}
      {error && (
        <div className="max-w-[360px] mx-auto px-6 pt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error} Données locales affichées.
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="max-w-[360px] mx-auto px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {["all", "Disponible", "Stock faible", "Rupture"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === f
                  ? f === "all" ? "bg-[#1e3a8a] text-white"
                  : f === "Disponible" ? "bg-green-600 text-white"
                  : f === "Stock faible" ? "bg-orange-600 text-white"
                  : "bg-red-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {f === "all" ? "Tous" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      <div className="max-w-[360px] mx-auto px-6 space-y-3">

        {/* Skeleton */}
        {loading && products.length === 0 && (
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2 pt-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Produits */}
        {filteredProducts.map((product) => {
          const status = getStockStatus(product);
          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex gap-3">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-base text-[#1e3a8a] mb-1">{formatPrice(product.price)}</p>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="text-xs text-gray-600">
                      Stock: <span className="font-medium">{product.currentStock}</span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-md border ${getStatusColor(status)}`}>
                      {status}
                    </div>
                  </div>

                  {/* Boutons Modifier / Supprimer */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 text-[#1e3a8a] text-xs font-medium hover:bg-blue-100"
                    >
                      <Pencil className="w-3 h-3" />
                      Modifier
                    </button>
                    <button
                      onClick={() => setDeletingId(product.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100"
                    >
                      <Trash2 className="w-3 h-3" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirmation suppression */}
              {deletingId === product.id && (
                <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-sm text-red-700 mb-2">Confirmer la suppression ?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium"
                    >
                      Oui, supprimer
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Aucun résultat */}
        {!loading && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        )}
      </div>

      {/* Bouton Ajouter flottant */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleOpenAdd}
          className="w-14 h-14 bg-[#f97316] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#ea580c] active:scale-95"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* Formulaire Ajouter / Modifier (panneau du bas) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-[360px] rounded-t-2xl p-6 space-y-4">

            {/* Titre formulaire */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <button onClick={handleCloseForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Nom */}
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                Nom du produit *
              </label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Peinture Acrylique Blanc 20L"
                className="w-full rounded-xl border-2 border-gray-200"
              />
            </div>

            {/* Prix et Stock */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">
                  Prix (Ar) *
                </label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="85000"
                  className="w-full rounded-xl border-2 border-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">
                  Stock actuel *
                </label>
                <Input
                  type="number"
                  value={form.currentStock}
                  onChange={(e) => setForm({ ...form, currentStock: e.target.value })}
                  placeholder="10"
                  className="w-full rounded-xl border-2 border-gray-200"
                />
              </div>
            </div>

            {/* Stock minimum */}
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                Stock minimum (alerte) *
              </label>
              <Input
                type="number"
                value={form.minStock}
                onChange={(e) => setForm({ ...form, minStock: e.target.value })}
                placeholder="5"
                className="w-full rounded-xl border-2 border-gray-200"
              />
            </div>

            {/* URL image */}
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                URL de l'image (optionnel)
              </label>
              <Input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-xl border-2 border-gray-200"
              />
            </div>

            {/* Bouton sauvegarder */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full h-12 bg-[#1e3a8a] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1e40af] disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? "Enregistrement..." : editingId ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
