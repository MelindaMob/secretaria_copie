import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/Autocolant-Dark.svg";
import SEO from "@/components/SEO";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type") || "";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Créer le document utilisateur dans Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        nom: name,
        role: type || "restaurant",
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Erreur inscription:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé");
      } else if (err.code === "auth/weak-password") {
        setError("Le mot de passe est trop faible");
      } else if (err.code === "auth/invalid-email") {
        setError("Email invalide");
      } else {
        setError("Une erreur est survenue lors de l'inscription");
      }
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (type === "restaurant") return "Créer un compte - Restaurants";
    if (type === "commercial") return "Créer un compte - Commerciaux";
    return "Créer un compte";
  };

  const getSubtitle = () => {
    if (type === "restaurant") return "Rejoignez-nous pour gérer vos factures";
    if (type === "commercial") return "Rejoignez-nous pour suivre vos commissions";
    return "Créez votre compte pour commencer";
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Inscription..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link
                to={`/login${type ? `?type=${type}` : ""}`}
                className="text-primary font-medium hover:underline"
              >
                Se connecter
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

export default Register;
