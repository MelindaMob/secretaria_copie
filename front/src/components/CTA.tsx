import { useEffect } from "react";

const CTA = () => {
  useEffect(() => {
    // Charger le script Typeform si ce n'est pas déjà fait
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer le script si le composant est démonté
      const existingScript = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="formulaire" className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Prêt à révolutionner votre gestion des réservations ?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Rejoignez ceux qui ont fait le choix de l'excellence avec Secretar.IA
            Remplissez le formulaire ci-dessous pour commencer, on vous recontacte dans les 24 heures.
          </p>
          
          {/* Formulaire Typeform */}
          <div className="mt-8 w-full">
            <div 
              data-tf-live="01KBD607V7HA6SK0M8Z5GKSPMB"
              className="w-full"
              style={{ minHeight: "800px", width: "100%", height: "800px" }}
            />
          </div>

          <p className="text-sm text-primary-foreground/60">
            Installation rapide  •  Support dédié
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
