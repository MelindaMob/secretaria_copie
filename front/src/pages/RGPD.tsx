import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";

const RGPDPage = () => {
  return (
    <>
      <SEO
        title="RGPD & Données - Secretar.IA"
        description="Découvrez comment Secretar.IA gère l'enregistrement des appels, le stockage des données et la conformité RGPD pour les restaurants."
      />
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-28 pb-20 bg-gradient-subtle">
          <div className="container px-4 max-w-5xl mx-auto space-y-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Politique de confidentialité & RGPD
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                La protection des données personnelles est une priorité pour Secretar.IA.
              </p>
            </div>

            <Card className="p-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  1. Introduction
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  La présente politique de confidentialité a pour objectif d'informer les utilisateurs et les appelants sur la manière dont leurs données personnelles peuvent être collectées, utilisées et protégées dans le cadre de l'utilisation du service Secretar.IA.
                </p>
                <p className="text-sm text-muted-foreground">
                  Secretar.IA fournit une solution d'agent téléphonique intelligent permettant aux restaurants de gérer les appels entrants, les réservations et les demandes clients.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  2. Responsable du traitement
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Le responsable du traitement des données est :
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Secretar.IA (Responsable des données)
                  <br />
                  Secretar.IA
                  <br />
                  Monplaisant
                  <br />
                  Email de contact RGPD :{" "}
                  <a
                    href="mailto:contact@secretar-ia.fr"
                    className="text-primary underline"
                  >
                    contact@secretar-ia.fr
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Dans certains cas, les restaurants utilisant Secretar.IA peuvent également être considérés comme responsables du traitement pour les données collectées dans le cadre de leurs réservations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  3. Données collectées
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Dans le cadre du fonctionnement du service, les données suivantes peuvent être collectées :
                </p>
                <h3 className="text-base font-semibold mt-3 mb-1">
                  Données d'identification
                </h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>nom</li>
                  <li>prénom</li>
                  <li>numéro de téléphone</li>
                </ul>

                <h3 className="text-base font-semibold mt-3 mb-1">
                  Données de réservation
                </h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>date de réservation</li>
                  <li>heure</li>
                  <li>nombre de personnes</li>
                  <li>demandes spécifiques (allergies, terrasse, etc.)</li>
                </ul>

                <h3 className="text-base font-semibold mt-3 mb-1">
                  Données techniques
                </h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>horodatage de l'appel</li>
                  <li>durée de l'appel</li>
                  <li>logs techniques</li>
                </ul>

                <h3 className="text-base font-semibold mt-3 mb-1">
                  Enregistrements d'appels
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  Certains appels peuvent être enregistrés afin :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>d'améliorer la qualité du service</li>
                  <li>d'entraîner et améliorer les systèmes d'intelligence artificielle</li>
                  <li>d'assurer la résolution d'éventuels litiges</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Les appelants sont informés de cet enregistrement au début de l'appel.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  4. Finalités du traitement
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Les données collectées sont utilisées pour :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>gérer les réservations de restaurant</li>
                  <li>permettre la communication entre le client et le restaurant</li>
                  <li>améliorer la qualité du service Secretar.IA</li>
                  <li>assurer la sécurité et la fiabilité du service</li>
                  <li>analyser les performances du système</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  5. Base légale du traitement
                </h2>
                <p className="text-sm text-muted-foreground">
                  Le traitement des données repose sur :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
                  <li>
                    <span className="font-semibold">l'intérêt légitime</span> pour l'amélioration du service et la gestion des appels
                  </li>
                  <li>
                    <span className="font-semibold">l'exécution d'un service</span> demandé par l'utilisateur (prise de réservation)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  6. Destinataires des données
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Les données peuvent être traitées par les prestataires techniques nécessaires au fonctionnement du service.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Ces prestataires peuvent inclure :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>infrastructures d'intelligence artificielle vocale</li>
                  <li>services d'automatisation</li>
                  <li>services d'envoi de SMS</li>
                  <li>hébergement cloud</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Ces prestataires agissent en tant que <span className="font-semibold">sous-traitants</span> et sont contractuellement tenus de respecter les obligations de protection des données.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  7. Transferts internationaux
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Certains prestataires techniques utilisés par Secretar.IA peuvent être situés en dehors de l'Union européenne.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Dans ce cas, les transferts de données sont encadrés par des mécanismes juridiques appropriés, notamment :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>clauses contractuelles types de la Commission européenne</li>
                  <li>garanties de sécurité équivalentes aux exigences du RGPD</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  8. Durée de conservation des données
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Les données sont conservées pendant une durée limitée :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>données de réservation : jusqu'à 12 mois</li>
                  <li>logs techniques : jusqu'à 12 mois</li>
                  <li>enregistrements d'appels : maximum 30 jours sauf nécessité particulière</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Au-delà de ces durées, les données sont supprimées ou anonymisées.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  9. Sécurité des données
                </h2>
                <p className="text-sm text-muted-foreground">
                  Secretar.IA met en œuvre des mesures techniques et organisationnelles afin de protéger les données personnelles contre :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
                  <li>l'accès non autorisé</li>
                  <li>la divulgation</li>
                  <li>l'altération</li>
                  <li>la perte</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  10. Droits des utilisateurs
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), les utilisateurs disposent des droits suivants :
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>droit d'accès</li>
                  <li>droit de rectification</li>
                  <li>droit à l'effacement</li>
                  <li>droit d'opposition</li>
                  <li>droit à la limitation du traitement</li>
                  <li>droit à la portabilité des données</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Ces droits peuvent être exercés en contactant :
                </p>
                <p className="text-sm text-muted-foreground font-medium mt-1">
                  Email RGPD :{" "}
                  <a
                    href="mailto:contact@secretar-ia.fr"
                    className="text-primary underline"
                  >
                    contact@secretar-ia.fr
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Une réponse sera apportée dans un délai maximal de 30 jours.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">11. Réclamation</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à l’autorité de protection des données compétente :
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  CNIL – Commission Nationale de l’Informatique et des Libertés
                  <br />
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  12. Modification de la politique
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  Secretar.IA se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de se conformer aux évolutions légales ou techniques.
                </p>
                <p className="text-sm text-muted-foreground">
                  La dernière mise à jour de ce document a été effectuée le :{" "}
                  <span className="font-medium">10/03/2026</span>.
                </p>
              </section>
            </Card>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default RGPDPage;

