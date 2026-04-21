// src/app/screens/LoginScreen.tsx

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PaintBucket } from "lucide-react";
import { login, saveToken } from "../services/auth";

export function LoginScreen() {
  const navigate = useNavigate();
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(telephone, password);
      saveToken(response.token);
      navigate("/shop-selection");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e3a8a] to-[#2563eb] flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
              <PaintBucket className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-white text-3xl mb-2">Moratazana</h1>
          <p className="text-white/80">Fénérive Est</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Téléphone
              </label>
              <Input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="0340000000"
                className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-[#1e3a8a] px-4"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-[#1e3a8a] px-4"
                required
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl shadow-lg"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/60 text-sm mt-8">
          Gestion de stock • Version 1.0
        </p>
      </div>
    </div>
  );
}
