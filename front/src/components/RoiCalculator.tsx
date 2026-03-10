import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RoiCalculator = () => {
  const [missedCallsPerDay, setMissedCallsPerDay] = useState<string>("8");
  const [averageTicket, setAverageTicket] = useState<string>("35");

  const parsedMissedCalls = Number(missedCallsPerDay.replace(",", "."));
  const parsedAverageTicket = Number(averageTicket.replace(",", "."));

  const isValid =
    !Number.isNaN(parsedMissedCalls) &&
    !Number.isNaN(parsedAverageTicket) &&
    parsedMissedCalls >= 0 &&
    parsedAverageTicket >= 0;

  const estimatedLoss = isValid
    ? Math.round(parsedMissedCalls * parsedAverageTicket * 30)
    : 0;

  return (
    <section id="roi" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Calculez ce que vous perdez chaque mois
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En quelques secondes, estimez le manque à gagner lié aux appels
              manqués et comparez-le au coût de Secretar.IA.
            </p>
          </div>

          <Card className="p-6 md:p-8 bg-card border-border shadow-elegant">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="missedCalls">Appels manqués / jour</Label>
                  <Input
                    id="missedCalls"
                    type="number"
                    min={0}
                    value={missedCallsPerDay}
                    onChange={(e) => setMissedCallsPerDay(e.target.value)}
                    placeholder="Ex : 8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageTicket">Ticket moyen (€)</Label>
                  <Input
                    id="averageTicket"
                    type="number"
                    min={0}
                    value={averageTicket}
                    onChange={(e) => setAverageTicket(e.target.value)}
                    placeholder="Ex : 35"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Estimation basée sur une moyenne de 30 jours par mois.
                </p>
              </div>

              <div className="space-y-4 flex flex-col justify-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-[0.18em]">
                    Estimation
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Vous perdez environ
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-secondary">
                    {isValid ? estimatedLoss.toLocaleString("fr-FR") : "—"} € / mois
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    en réservations non prises à cause des appels manqués.
                  </p>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <p className="text-sm text-foreground font-semibold">
                    Secretar.IA coûte{" "}
                    <span className="text-secondary">
                      à partir de 45€ / mois
                    </span>
                    .
                  </p>
                  <p className="text-sm text-muted-foreground">
                  Si vous récupérez ne serait-ce qu'une ou deux
                  réservations par jour, l'agent s'auto-finance
                    largement.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;

