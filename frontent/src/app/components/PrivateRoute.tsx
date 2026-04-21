// src/app/components/PrivateRoute.tsx
// Redirige vers /login si l'utilisateur n'est pas connecté

import { Navigate } from "react-router";
import { isAuthenticated } from "../services/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
