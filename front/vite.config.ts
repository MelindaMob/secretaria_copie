import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { prerender } from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    prerender({
      routes: ["/", "/login", "/register", "/404"], // Routes à prérendre
      renderer: {
        renderAfterDocumentEvent: "render-complete", // Attendre que React soit monté
        renderAfterTime: 1000, // Attendre 1 seconde pour les animations
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
