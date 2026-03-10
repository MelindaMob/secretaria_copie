import { Button } from "@/components/ui/button";
import { Phone, Calendar, MessageCircle } from "lucide-react";
import logo from "@/assets/Autocolant-Dark.svg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-20 pt-32 md:pt-40">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="animate-fade-in">
            <img src={logo} alt="Secretar.IA Logo" className="h-16 md:h-20 w-auto" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight animate-slide-up">
            Secretar IA <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              décroche toutes vos résas.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl animate-slide-up">
            Les restaurants perdent en moyenne 8 à 12 appels par service, soit
            400 à 900€ de réservations perdues par semaine. Secretar.IA répond
            à votre place 24h/24 et 7j/7.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => {
                const demoSection = document.getElementById("demo");
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Tester l'agent par téléphone
            </Button>
            <Button
              variant="heroPrimary"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => {
                const pricingSection = document.getElementById("tarifs");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Voir les tarifs
            </Button>
          </div>

          {/* Phone demo highlight */}
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Phone className="h-4 w-4 text-accent" />
              <span className="text-primary-foreground text-sm md:text-base">
                Démo en direct : appelez{" "}
                <span className="font-semibold">+33379540862</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.href = "tel:+33379540862";
              }}
              className="text-sm text-primary-foreground/80 underline underline-offset-4 hover:text-primary-foreground transition-colors"
            >
              Appeler maintenant
            </button>
          </div>

          {/* Key features badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fade-in">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Phone className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">Zéro appel manqué</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Calendar className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">
                Gestion automatique
              </span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <MessageCircle className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">Service 24h/24 et 7j/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
