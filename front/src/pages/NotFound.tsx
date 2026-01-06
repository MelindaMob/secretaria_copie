import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import logo from "@/assets/Autocolant-Dark.svg";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page introuvable - Secretar.IA"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        ogImage="https://secretar-ia.fr/og-image.png"
      />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-slide-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Secretar.IA Logo" className="h-16 w-auto" />
        </div>

        {/* Icône d'erreur */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl" />
            <AlertCircle className="relative h-24 w-24 text-accent" />
          </div>
        </div>

        {/* Message d'erreur */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground">
            Page introuvable
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Bouton de redirection */}
        <div className="pt-4">
          <Link to="/">
            <Button
              variant="heroPrimary"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        {/* Liens utiles */}
        <div className="pt-8 space-y-2">
          <p className="text-sm text-primary-foreground/60">
            Vous pouvez aussi :
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                Se connecter
              </Button>
            </Link>
            <Link to="/login?type=restaurant">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                Espace Client
              </Button>
            </Link>
            <Link to="/login?type=commercial">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                Espace Commercial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotFound;
