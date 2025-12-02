const steps = [
  {
    number: "01",
    title: "Remplissez le formulaire",
    description: "Indiquez-nous vos informations, horaires d'ouverture, menu et spécificités",
  },
  {
    number: "02",
    title: "Solution 100% personnalisée",
    description: "Nous créons votre agent IA sur mesure adapté à votre restaurant",
  },
  {
    number: "03",
    title: "Intégration clé en main",
    description: "Nous intégrons la solution à votre système existant en toute simplicité",
  },
  {
    number: "04",
    title: "Mise en service immédiate",
    description: "Votre agent IA gère vos appels et réservations dès le premier jour",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Comment ça fonctionne ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et rapide pour transformer votre gestion des réservations
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-secondary to-accent transform -translate-x-1/2" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 lg:text-right lg:pr-12 lg:pl-0">
                    <div
                      className={`${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left lg:pl-12 lg:pr-0"
                      }`}
                    >
                      <div className="inline-block mb-4">
                        <span className="text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-glow border-4 border-background">
                      <div className="w-6 h-6 bg-accent-foreground rounded-full" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
