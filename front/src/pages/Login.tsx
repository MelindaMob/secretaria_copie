import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/Autocolant-Dark.svg";
import SEO from "@/components/SEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Identifiants incorrects");
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (type === "restaurant") return "Espace Client - Restaurants";
    if (type === "commercial") return "Espace Commercial";
    return "Connexion";
  };

  const getSubtitle = () => {
    if (type === "restaurant") return "Accédez à vos factures et documents";
    if (type === "commercial") return "Consultez vos commissions mensuelles";
    return "Connectez-vous à votre compte";
  };

  return (
    <>
      <SEO
        title={`${getTitle()} - Secretar.IA`}
        description={getSubtitle()}
        ogImage="https://secretar-ia.fr/og-image.png"
      />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant animate-slide-up">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Secretar.IA Logo" className="h-12 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">{getTitle()}</CardTitle>
          <CardDescription>{getSubtitle()}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link
                to={`/register${type ? `?type=${type}` : ""}`}
                className="text-primary font-medium hover:underline"
              >
                Créer un compte
              </Link>
            </p>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default Login;
