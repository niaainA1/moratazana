// src/app/routes.tsx

import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LoginScreen } from "./screens/LoginScreen";
import { ShopSelectionScreen } from "./screens/ShopSelectionScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { EveningUpdateScreen } from "./screens/EveningUpdateScreen";
import { InventoryScreen } from "./screens/InventoryScreen";
import { ReportScreen } from "./screens/ReportScreen";
import { NotFoundScreen } from "./screens/NotFoundScreen";
import { PrivateRoute } from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LoginScreen,
      },
      {
        path: "shop-selection",
        element: (
          <PrivateRoute>
            <ShopSelectionScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "evening-update",
        element: (
          <PrivateRoute>
            <EveningUpdateScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <PrivateRoute>
            <InventoryScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "report",
        element: (
          <PrivateRoute>
            <ReportScreen />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: NotFoundScreen,
      },
    ],
  },
]);
