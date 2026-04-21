import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-[360px] w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-[#1e3a8a] mb-4">404</div>
          <h1 className="text-2xl text-gray-900 mb-2">Page non trouvée</h1>
          <p className="text-gray-600 text-sm">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate(-1)}
            className="w-full h-12 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white rounded-xl flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </Button>

          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-12 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Tableau de bord</span>
          </Button>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            💡 Si vous pensez qu'il s'agit d'une erreur, veuillez contacter le support.
          </p>
        </div>
      </div>
    </div>
  );
}
