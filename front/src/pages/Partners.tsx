import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Partners = () => {
  return (
    <>
      <SEO
        title="Partenaires Secretar.IA - Editeurs de caisse, experts comptables, grossistes"
        description="Devenez partenaire Secretar.IA et proposez à vos clients restaurateurs une solution d'agent IA téléphonique qui sécurise leurs réservations."
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-20 bg-gradient-subtle">
          <div className="container px-4 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Devenez partenaire Secretar.IA
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Editeurs de caisse, experts-comptables CHR, grossistes, agences :
                aidez vos clients restaurateurs à ne plus perdre de réservations
                et créez de nouvelles sources de revenus récurrents.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-10">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  Pour les éditeurs de caisse
                </h2>
                <p className="text-sm text-muted-foreground">
                  Proposez une brique &quot;agent IA téléphonique&quot; qui
                  complète votre offre caisse et renforce la fidélité de vos
                  restaurants clients.
                </p>
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  Pour les experts comptables CHR
                </h2>
                <p className="text-sm text-muted-foreground">
                  Aidez vos clients à sécuriser leur chiffre d'affaires en
                  réduisant les tables vides dues aux appels manqués.
                </p>
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-2">Pour les grossistes</h2>
                <p className="text-sm text-muted-foreground">
                  Une solution différenciante pour accompagner vos clients
                  restaurateurs sur leur remplissage et leur rentabilité.
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-card border-primary/40 mb-12">
              <h2 className="text-2xl font-bold mb-3">
                Ce que nous proposons à nos partenaires
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Programme d'apporteurs d'affaires rémunéré</li>
                <li>Support commercial (démo, argumentaires, webinaires)</li>
                <li>Intégrations techniques possibles via API</li>
                <li>Accompagnement dédié pour vos premiers clients pilotes</li>
              </ul>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
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
                Discuter d'un partenariat
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Partners;

