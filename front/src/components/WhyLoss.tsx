import { Card } from "@/components/ui/card";
import { PhoneOff, PhoneIncoming, Clock, AlertTriangle } from "lucide-react";

const points = [
  {
    icon: PhoneOff,
    title: "Appels manqués pendant le service",
    description:
      "En plein rush, personne ne peut répondre. Chaque appel manqué est une réservation potentielle perdue.",
  },
  {
    icon: PhoneIncoming,
    title: "Téléphone constamment occupé",
    description:
      "Les clients raccrochent après plusieurs sonneries ou une ligne occupée et passent à un autre restaurant.",
  },
  {
    icon: Clock,
    title: "Appels en dehors des horaires d'ouverture",
    description:
      "Une grande partie des appels arrivent avant l'ouverture ou après la fermeture, quand personne n'est disponible.",
  },
  {
    icon: AlertTriangle,
    title: "No-show et mauvaise gestion",
    description:
      "Sans rappels automatiques ni confirmations par SMS, les no-show augmentent et les tables restent vides.",
  },
];

const WhyLoss = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Pourquoi les restaurants perdent des réservations ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La plupart des pertes ne viennent pas de la cuisine mais du
            téléphone. Voici où l'argent s'échappe.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <Card
                key={point.title}
                className="p-6 flex gap-4 items-start bg-card border-border/80"
              >
                <div className="mt-1 rounded-full bg-secondary/15 p-2">
                  <Icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyLoss;

