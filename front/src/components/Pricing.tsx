import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const features = [
  "Prise d'appels 24h/24 et 7j/7",
  "Réservation automatique dans Google Agenda",
  "Modification et annulation de réservation",
  "SMS de confirmation et de rappel",
  "Réduction des no-show",
  "Analytics des appels et des réservations",
  "Installation en moins de 48h",
];

const Pricing = () => {
  return (
    <section id="tarifs" className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une seule offre tout compris,{" "}
            <span className="font-semibold text-foreground">
              à partir de 50€ / mois
            </span>{" "}
            pour ne plus perdre de réservations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="relative overflow-hidden border-primary/40 bg-gradient-to-br from-background via-background to-secondary/10 p-8 md:p-10 shadow-elegant">
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-secondary blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 space-y-4">
                <p className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary">
                  Offre tout compris
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Agent IA téléphonique pour votre restaurant
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-accent bg-clip-text text-transparent">
                    à partir de 50€
                  </span>
                  <span className="text-muted-foreground text-lg">/ mois</span>
                </div>
                <p className="text-muted-foreground">
                  Aucun engagement, 14 jours d'essai gratuit sans carte
                  bancaire. Vous gardez l'agent uniquement si vous voyez
                  l'impact sur vos réservations.
                </p>
              </div>

              <div className="flex-1 space-y-4">
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 rounded-full bg-secondary/20 p-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </span>
                      <span className="text-sm md:text-base text-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 space-y-2">
                  <Button
                    size="lg"
                    className="w-full md:w-auto px-8"
                    onClick={() => {
                      const formSection = document.getElementById("formulaire");
                      if (formSection) {
                        formSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    Démarrer mon essai gratuit 14 jours
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Sans carte bancaire • Résiliable à tout moment
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

