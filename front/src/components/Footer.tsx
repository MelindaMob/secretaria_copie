import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/Logo.svg";
import cguPdf from "@/assets/CGU SECRETARIA.pdf";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-border/50">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="mb-3">
              <img src={logo} alt="Secretar.IA Logo" className="h-12 w-auto mb-2" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Secretar IA</h3>
            <p className="text-muted-foreground">
              L'agent IA téléphonique qui révolutionne la gestion des réservations pour les restaurants.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <span>contact@secretar-ia.fr</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Accès clients */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Accès</h4>
            <div className="space-y-2">
              <Link 
                to="/login?type=restaurant"
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                Espace Client
              </Link>
              <Link 
                to="/login?type=commercial"
                className="block text-muted-foreground hover:text-accent transition-colors"
              >
                Espace Commercial
              </Link>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Liens utiles</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                À propos
              </a>
              <a href={cguPdf} target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-accent transition-colors">
                CGV
              </a>
              <a href="#" className="block text-muted-foreground hover:text-accent transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Secretar IA. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
