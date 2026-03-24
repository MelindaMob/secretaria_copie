import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Bistrot 50",
    location: "Bordeaux",
    quote:
      "Nous avons récupéré 23 réservations le premier mois grâce à l'IA. Et surtout, l'équipe est beaucoup plus sereine pendant le service.",
  },
  {
    name: "Chez Dupont",
    location: "Arcachon",
    quote:
      "On ne laisse plus personne tomber sur un téléphone occupé. Les clients sont bluffés par la rapidité.",
  },
  {
    name: "La Petite Marée",
    location: "Teste-de-Buch",
    quote:
      "L'installation a été faite en quelques jours. On voit très clairement l'impact dans notre carnet de réservations.",
  },
];

const Testimonials = () => {
  return (
    <section id="temoignages" className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ils utilisent déjà Secretar.IA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les restaurateurs font confiance aux autres restaurateurs. Voici ce
            qu'ils disent.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="p-6 h-full flex flex-col justify-between bg-card border-border/80 shadow-sm"
            >
              <div className="space-y-4">
                <p className="text-foreground text-base leading-relaxed">
                  “{testimonial.quote}”
                </p>
              </div>
              <div className="mt-6">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
                <p className="mt-2 text-yellow-400">
                  {"⭐️⭐️⭐️⭐️⭐️"}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

