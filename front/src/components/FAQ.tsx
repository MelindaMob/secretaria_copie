import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Toutes les réponses aux objections classiques des restaurateurs.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>
                Mes clients vont-ils savoir qu'ils parlent à une IA ?
              </AccordionTrigger>
              <AccordionContent>
                La voix de l'agent est conçue pour être naturelle et
                fluide. Dans la majorité des cas, les clients apprécient
                surtout d'obtenir une réponse immédiate sans attendre
                qu'un membre de l'équipe décroche pendant le service.
                <br />
                <br />
                L'agent peut également transférer l'appel vers le
                restaurant si nécessaire.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger>Est-ce compliqué à installer ?</AccordionTrigger>
              <AccordionContent>
                Non. L'installation est entièrement prise en charge.
                <br />
                <br />
                Il suffit de remplir un formulaire avec les informations du
                restaurant (horaires, capacité, règles de réservation) et
                l'agent est opérationnel en 48 heures.
                <br />
                <br />
                Aucune installation technique n'est nécessaire.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger>
                Que se passe-t-il si l'IA ne comprend pas le client ?
              </AccordionTrigger>
              <AccordionContent>
                Si l'agent ne comprend pas une demande ou si la situation
                est complexe, l'appel peut être :
                <br />
                <br />
                – transféré vers le restaurant
                <br />
                – ou traité avec des questions supplémentaires
                <br />
                <br />
                L'objectif est qu'aucun appel ne soit perdu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger>Que se passe-t-il en cas de panne ?</AccordionTrigger>
              <AccordionContent>
                Le système prévoit un renvoi automatique vers un numéro humain
                si un problème technique survient.
                <br />
                <br />
                Ainsi, aucun appel important n'est perdu pendant le
                service.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q5">
              <AccordionTrigger>
                Est-ce que cela remplace mon équipe ?
              </AccordionTrigger>
              <AccordionContent>
                Non.
                <br />
                <br />
                Secretar.IA agit comme un assistant de réservation, pas comme
                un remplacement du personnel.
                <br />
                <br />
                Il permet simplement d'éviter les appels manqués pendant :
                <br />
                – les heures de service
                <br />
                – les heures de fermeture
                <br />
                – les périodes de forte activité.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger>
                Avec quoi l'agent est-il fourni ?
              </AccordionTrigger>
              <AccordionContent>
                Secretar.IA est livré clé en main avec un système de gestion des
                réservations.
                <br />
                <br />
                Chaque restaurant dispose d'un agenda Google configuré
                automatiquement, dans lequel toutes les réservations prises par
                téléphone sont enregistrées.
                <br />
                <br />
                Cela vous permet de :
                <br />
                – voir toutes vos réservations au même endroit
                <br />
                – recevoir des notifications en temps réel
                <br />
                – partager facilement l'agenda avec votre équipe
                <br />
                – garder une vision claire de votre service
                <br />
                <br />
                Aucune configuration technique n'est nécessaire : tout est
                mis en place pour vous lors de l'installation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q7">
              <AccordionTrigger>
                Mes clients peuvent-ils modifier ou annuler leur réservation ?
              </AccordionTrigger>
              <AccordionContent>
                Oui.
                <br />
                <br />
                L'agent peut :
                <br />
                <br />
                – prendre une réservation
                <br />
                – modifier une réservation existante
                <br />
                – annuler une réservation
                <br />
                <br />
                Les informations sont mises à jour automatiquement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q8">
              <AccordionTrigger>
                Puis-je ajouter des réservations moi-même ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, bien sûr.
                <br />
                <br />
                L'agenda reste entièrement modifiable par le restaurant.
                <br />
                <br />
                Vous pouvez :
                <br />
                – ajouter des réservations prises en salle ou par message
                <br />
                – modifier une réservation existante
                <br />
                – bloquer des créneaux
                <br />
                – ajuster la capacité du restaurant
                <br />
                <br />
                L'agent IA et l'équipe du restaurant utilisent le
                même agenda, ce qui permet de garder les disponibilités toujours
                à jour.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q9">
              <AccordionTrigger>Combien cela coûte ?</AccordionTrigger>
              <AccordionContent>
                Le service fonctionne avec un abonnement mensuel.
                <br />
                <br />
                Le tarif dépend du volume d'appels et du nombre
                d'établissements.
                <br />
                <br />
                Vous pouvez consulter les offres sur la page Tarifs ou tester
                l'agent directement via notre numéro de démonstration.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q10">
              <AccordionTrigger>
                Puis-je tester l'agent avant de m'abonner ?
              </AccordionTrigger>
              <AccordionContent>
                Oui.
                <br />
                <br />
                Vous pouvez tester l'agent en appelant le numéro de
                démonstration directement depuis votre téléphone et simuler une
                réservation comme un client.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

