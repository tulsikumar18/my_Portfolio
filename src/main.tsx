import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

console.log("[main] Starting application");
console.log("[main] Root element:", document.getElementById("root"));

try {
  const root = createRoot(document.getElementById("root")!);
  console.log("[main] Root created, rendering App");
  root.render(<App />);
  console.log("[main] App rendered successfully");
} catch (error) {
  console.error("[main] Error rendering app:", error);
  throw error;
}
