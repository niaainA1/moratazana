import { Outlet } from "react-router";
import { NavigationHelper } from "./NavigationHelper";
import { WireframeToggle } from "./WireframeToggle";
import { AppProvider } from "../context/AppContext";

export function RootLayout() {
  return (
    <AppProvider>
      <Outlet />
      <NavigationHelper />
      <WireframeToggle />
    </AppProvider>
  );
}