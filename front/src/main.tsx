import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Émettre un événement pour signaler que le rendu est terminé (pour le prérendu)
// Cela permet au plugin prerender de savoir quand le contenu est prêt
if (import.meta.env.PROD) {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.dispatchEvent(new Event("render-complete"));
    }, 100);
  });
}
