import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Calendar, MessageCircle } from "lucide-react";

const Integrations = () => {
  return (
    <>
      <SEO
        title="Intégrations Secretar.IA - Google Agenda et SMS"
        description="Découvrez comment Secretar.IA s'intègre à Google Agenda et aux SMS pour gérer automatiquement vos réservations de restaurant."
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-20 bg-background">
          <div className="container px-4 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Intégrations Secretar.IA
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Secretar.IA se connecte aujourd'hui à Google Agenda et aux
                SMS pour automatiser vos réservations et rassurer vos clients.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-10">
              <Card className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="text-xl font-semibold">Google Agenda</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chaque réservation prise par l'agent IA est créée
                  automatiquement dans votre Google Agenda : date, heure, nombre
                  de couverts, nom du client et éventuels commentaires.
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous visualisez vos services d'un coup d'œil,
                  pouvez bloquer des créneaux et garder votre planning à jour
                  depuis les outils que vous utilisez déjà.
                </p>
              </Card>

              <Card className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                  </div>
                  <h2 className="text-xl font-semibold">SMS de confirmation</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Après chaque réservation, un SMS de confirmation est envoyé au
                  client avec les détails de sa venue (date, heure, adresse).
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez également activer des SMS de rappel avant le
                  service pour réduire les no-show et garder vos tables
                  occupées.
                </p>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-subtle border-dashed border-border">
              <h2 className="text-xl font-semibold mb-2">
                Et pour vos autres outils ?
              </h2>
              <p className="text-sm text-muted-foreground">
                Nous développons progressivement des intégrations avec les
                principaux outils utilisés par les restaurants (caisse, gestion
                de réservations, etc.). Parlez-nous de votre stack actuelle et
                nous vous dirons ce que nous pouvons déjà faire pour vous.
              </p>
            </Card>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Integrations;

