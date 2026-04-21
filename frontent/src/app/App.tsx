import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Responsive Container :
          - Mobile  : plein écran (max 480px)
          - Tablette : centré avec max 768px
          - Ordinateur : centré avec max 1024px, ombre des deux côtés
      */}
      <div className="mx-auto w-full max-w-[480px] sm:max-w-[768px] lg:max-w-[1024px] min-h-screen bg-white sm:shadow-2xl relative">
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
