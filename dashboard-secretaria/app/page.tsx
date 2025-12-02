export default function Home() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
      padding: "40px",
      fontFamily: "system-ui, sans-serif"
    }}>
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
        SecretarIA API
      </h1>
      <p style={{ color: "#666", fontSize: "16px", textAlign: "center" }}>
        Backend API pour SecretarIA
      </p>
      <div style={{ marginTop: "32px", fontSize: "14px", color: "#999" }}>
        <p>Routes disponibles :</p>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
          <li>GET /api/factures-restaurant</li>
          <li>GET /api/commissions-commercial</li>
        </ul>
      </div>
    </div>
  );
}

