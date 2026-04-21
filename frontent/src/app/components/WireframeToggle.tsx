import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function WireframeToggle() {
  const [isWireframe, setIsWireframe] = useState(false);

  const toggleWireframe = () => {
    setIsWireframe(!isWireframe);
    document.body.classList.toggle("wireframe-mode");
  };

  return (
    <button
      onClick={toggleWireframe}
      className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2 hover:bg-gray-800 transition-colors"
      title={isWireframe ? "Mode moderne" : "Mode wireframe"}
    >
      {isWireframe ? (
        <>
          <Eye className="w-4 h-4" />
          <span className="text-xs">Moderne</span>
        </>
      ) : (
        <>
          <EyeOff className="w-4 h-4" />
          <span className="text-xs">Wireframe</span>
        </>
      )}
    </button>
  );
}
