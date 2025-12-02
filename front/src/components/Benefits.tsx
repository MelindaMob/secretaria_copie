import { PhoneCall, Clock, TrendingUp, Users, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: PhoneCall,
    title: "Zéro appel manqué",
    description: "Votre agent IA répond instantanément à chaque appel, même pendant les heures de pointe",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Service continu, jour et nuit, week-ends et jours fériés sans exception",
  },
  {
    icon: TrendingUp,
    title: "Augmentez vos réservations",
    description: "Convertissez plus d'appels en réservations grâce à une réponse immédiate et professionnelle",
  },
  {
    icon: Users,
    title: "Expérience client optimale",
    description: "Un service courtois et efficace qui reflète l'excellence de votre établissement",
  },
  {
    icon: Shield,
    title: "Gestion intelligente",
    description: "Prise, modification et annulation de réservations en toute autonomie",
  },
  {
    icon: Zap,
    title: "Déploiement rapide",
    description: "Opérationnel en quelques jours, sans formation complexe de votre équipe",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Pourquoi choisir Secretar<span className="text-secondary">.IA</span> ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une solution complète qui transforme la gestion de vos réservations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-red transition-all duration-300 hover:-translate-y-1 border-border bg-card"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-glow">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
