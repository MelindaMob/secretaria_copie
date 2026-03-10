import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const PhoneDemo = () => {
  return (
    <section id="demo" className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-secondary">
            Démo en temps réel
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Testez l'agent IA comme un client
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Appelez ce numéro et parlez à l'agent IA exactement comme
            vos clients le feraient pour réserver une table, modifier ou
            annuler une réservation.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-background border border-secondary/40 shadow-sm">
              <Phone className="h-5 w-5 text-secondary" />
              <span className="text-lg md:text-2xl font-semibold text-foreground">
                +33379540862
              </span>
            </div>

            <Button
              size="lg"
              className="px-8"
              asChild
            >
              <a href="tel:+33379540862">
                Tester l'IA maintenant
              </a>
            </Button>

            <p className="text-sm text-muted-foreground max-w-md">
              Disponible 24h/24 et 7j/7. Vous pouvez appeler à n'importe
              quel moment pour tester l'expérience client.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneDemo;

