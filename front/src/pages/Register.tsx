import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo / Titre */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            {getTitle()}
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            {getSubtitle()}
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ddd")}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#fee",
                color: "#c33",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "#ccc"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.4)";
              }
            }}
          >
            {loading ? "Inscription..." : "Créer mon compte"}
          </button>
        </form>

        {/* Liens */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>
            Déjà un compte ?{" "}
            <Link
              to={`/login${type ? `?type=${type}` : ""}`}
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Se connecter
            </Link>
          </p>
          <Link
            to="/"
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

