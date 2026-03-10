import { Card } from "@/components/ui/card";
import { ShieldCheck, Clock, Rocket } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Zéro appel manqué",
    description:
      "Chaque appel est pris en charge par l'agent IA, même en plein service. Vous ne laissez plus aucune réservation sur le répondeur.",
  },
  {
    icon: Clock,
    title: "Disponible 24h/24 et 7j/7",
    description:
      "Vos clients peuvent réserver à n'importe quelle heure, même en dehors des horaires d'ouverture et pendant vos jours de fermeture.",
  },
  {
    icon: Rocket,
    title: "Installation en 48h",
    description:
      "Nous configurons votre agent, vos horaires, vos règles de réservation et l'intégration Google Agenda en quelques jours seulement.",
  },
];

const WhySecretaria = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Pourquoi choisir Secretar.IA ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trois piliers pour sécuriser vos réservations et simplifier votre
            quotidien.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="p-6 bg-card border-border/80 h-full flex flex-col"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/15 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySecretaria;

