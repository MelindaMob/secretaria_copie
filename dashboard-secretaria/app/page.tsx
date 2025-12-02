"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", flexDirection: "column" }}>
      {/* Navigation */}
      <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          SecretarIA
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link 
            href="/login" 
            style={{ 
              color: "white", 
              textDecoration: "none", 
              padding: "8px 16px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.2)",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          >
            Connexion
          </Link>
        </div>
      </nav>

      {/* Contenu principal */}
      <main style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        padding: "40px",
        textAlign: "center"
      }}>
        <h1 style={{ 
          fontSize: "48px", 
          fontWeight: "bold", 
          color: "white", 
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
        }}>
          Bienvenue sur SecretarIA
        </h1>
        <p style={{ 
          fontSize: "20px", 
          color: "rgba(255,255,255,0.9)", 
          marginBottom: "60px",
          maxWidth: "600px"
        }}>
          Accédez à votre espace personnalisé pour gérer vos factures et commissions
        </p>

        {/* Boutons d'accès */}
        <div style={{ 
          display: "flex", 
          gap: "30px", 
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          <Link href="/login?type=restaurant">
            <button style={{
              padding: "20px 40px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              background: "rgba(255,255,255,0.25)",
              border: "2px solid white",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s",
              minWidth: "250px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
            >
              🏪 Espace Client
              <div style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9 }}>
                Restaurants
              </div>
            </button>
          </Link>

          <Link href="/login?type=commercial">
            <button style={{
              padding: "20px 40px",
              fontSize: "18px",
              fontWeight: "600",
              color: "white",
              background: "rgba(255,255,255,0.25)",
              border: "2px solid white",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s",
              minWidth: "250px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
            >
              💼 Espace Commercial
              <div style={{ fontSize: "14px", marginTop: "8px", opacity: 0.9 }}>
                Commerciaux
              </div>
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
