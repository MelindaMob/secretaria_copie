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
            <span className="bg-gradient-accent bg-clip-text text-transparent">décroche toutes vos résas.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl animate-slide-up">
            Votre agent IA disponible 24/7 pour répondre aux appels, gérer vos réservations et améliorer l'expérience client de votre restaurant
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => {
                const videoSection = document.getElementById('video');
                if (videoSection) {
                  videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Découvrir la vidéo
            </Button>
            <Button 
              variant="heroPrimary" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => {
                const formulaireSection = document.getElementById('formulaire');
                if (formulaireSection) {
                  formulaireSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Commencer
            </Button>
          </div>

          {/* Key features badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 animate-fade-in">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Phone className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">Réponse instantanée</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Calendar className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">Gestion automatique</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <MessageCircle className="h-5 w-5 text-accent" />
              <span className="text-primary-foreground">Service 24h/24h et 7j/7</span>
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
