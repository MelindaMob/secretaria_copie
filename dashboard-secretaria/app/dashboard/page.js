// app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function DashboardPage() {
  // --- état "auth / user" ---
  const [user, setUser] = useState(null);
  const [airtableId, setAirtableId] = useState("");
  const [role, setRole] = useState(""); // "restaurant" ou "commercial"
  const [loadingUser, setLoadingUser] = useState(true);

  // --- état "données restaurant" ---
  const [factures, setFactures] = useState([]);
  const [facturesError, setFacturesError] = useState("");

  // --- état "données commercial" ---
  const [commissions, setCommissions] = useState([]);
  const [commissionsError, setCommissionsError] = useState("");

  // =============================
  // 1) écoute Firebase Auth + Firestore /users
  // =============================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);

      try {
        // 1) Chercher d'abord dans la collection "users"
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          console.log("User Firestore (collection users) :", data);
          setAirtableId(data.id_airtable || "");
          setRole(data.role || "");
        } else {
          // 2) Si pas trouvé dans "users", chercher dans "restaurants" avec auth_uid
          const restaurantsQuery = query(
            collection(db, "restaurants"),
            where("auth_uid", "==", currentUser.uid)
          );
          const restaurantsSnap = await getDocs(restaurantsQuery);

          if (!restaurantsSnap.empty) {
            const restaurantData = restaurantsSnap.docs[0].data();
            console.log("User Firestore (collection restaurants) :", restaurantData);
            setAirtableId(restaurantData.id_airtable || "");
            setRole("restaurant");
          } else {
            // 3) Si pas trouvé dans "restaurants", chercher dans "commerciaux" avec auth_uid
            const commerciauxQuery = query(
              collection(db, "commerciaux"),
              where("auth_uid", "==", currentUser.uid)
            );
            const commerciauxSnap = await getDocs(commerciauxQuery);

            if (!commerciauxSnap.empty) {
              const commercialData = commerciauxSnap.docs[0].data();
              console.log("User Firestore (collection commerciaux) :", commercialData);
              setAirtableId(commercialData.id_airtable || "");
              setRole("commercial");
            } else {
              console.warn("Aucun document Firestore trouvé pour cet utilisateur dans users, restaurants ou commerciaux");
            }
          }
        }
      } catch (err) {
        console.error("Erreur Firestore :", err);
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // =============================
  // 2) Fetch factures (restaurant)
  // =============================
  async function fetchFactures() {
    if (!airtableId) return;

    try {
      console.log(
        "Appel API factures restaurant avec airtableId =",
        airtableId
      );

      const res = await fetch(
        `/api/factures-restaurant?airtableId=${airtableId}`
      );
      const data = await res.json();

      console.log("Réponse API factures:", data);

      if (!res.ok) {
        setFacturesError(data.error || "Erreur Airtable");
        setFactures([]);
        return;
      }

      setFacturesError("");
      // L'API retourne { records: [...] } où chaque élément a { id, fields }
      const facturesData = data.records || data.factures || [];
      setFactures(facturesData);
    } catch (err) {
      console.error("Erreur API factures:", err);
      setFacturesError("Erreur réseau lors de l'appel à l'API");
      setFactures([]);
    }
  }

  // =============================
  // 3) Fetch commissions (commercial)
  //    (à adapter à ton endpoint quand il sera prêt)
  // =============================
  async function fetchCommissions() {
    if (!airtableId) return;

    try {
      console.log(
        "Appel API commissions commercial avec airtableId =",
        airtableId
      );

      const res = await fetch(
        `/api/commissions-commercial?airtableId=${airtableId}`
      );
      const data = await res.json();

      console.log("Réponse API commissions:", data);

      if (!res.ok) {
        setCommissionsError(data.error || "Erreur Airtable");
        setCommissions([]);
        return;
      }

      setCommissionsError("");
      setCommissions(data.commissions || []);
    } catch (err) {
      console.error("Erreur API commissions:", err);
      setCommissionsError("Erreur réseau lors de l'appel à l'API");
      setCommissions([]);
    }
  }

  // =============================
  // 4) Quand role + airtableId sont connus, on charge les données
  // =============================
  useEffect(() => {
    if (!airtableId || !role) return;

    if (role === "restaurant") {
      fetchFactures();
    } else if (role === "commercial") {
      fetchCommissions();
    }
  }, [airtableId, role]);

  // =============================
  // Rendu
  // =============================
  if (loadingUser) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Non connecté</p>;
  }

  return (
    <div style={{ padding: 40, background: "black", color: "white", minHeight: "100vh" }}>
      {/* En-tête avec navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ margin: 0, marginBottom: "10px" }}>Dashboard</h1>
          <p style={{ margin: 0, color: "#aaa", fontSize: "14px" }}>
            Email : {user.email} | Rôle : {role} | ID Airtable : {airtableId}
          </p>
        </div>
        <button
          onClick={() => signOut(auth)}
          style={{
            padding: "10px 20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#b91c1c";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#dc2626";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Se déconnecter
        </button>
      </div>

      {/* ================== VUE COMMERCIAL ================== */}
      {role === "commercial" && (
        <div style={{ marginTop: 40 }}>
          <h2>Vue commercial – Commissions mensuelles</h2>

          {commissionsError && (
            <p style={{ color: "red" }}>Erreur : {commissionsError}</p>
          )}

          {!commissionsError && commissions.length === 0 && (
            <p>Aucune commission trouvée pour ce commercial.</p>
          )}

          {commissions.length > 0 && (
            <table
              style={{
                marginTop: 20,
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: 600,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid white",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Mois
                  </th>
                  <th
                    style={{
                      border: "1px solid white",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Total du mois
                  </th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((c) => (
                  <tr key={c.id}>
                    <td
                      style={{
                        border: "1px solid white",
                        padding: "12px",
                      }}
                    >
                      {c.moisLisible || c.MoisLisible || c.Mois || "-"}
                    </td>
                    <td
                      style={{
                        border: "1px solid white",
                        padding: "12px",
                      }}
                    >
                      {c.totalMois !== null && c.totalMois !== undefined
                        ? `€${parseFloat(c.totalMois).toFixed(2)}`
                        : c["Total du mois"]
                        ? `€${parseFloat(c["Total du mois"]).toFixed(2)}`
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ================== VUE RESTAURANT ================== */}
      {role === "restaurant" && (
        <div style={{ marginTop: 40 }}>
          <h2>Vue restaurant</h2>

          {facturesError && (
            <p style={{ color: "red" }}>Erreur : {facturesError}</p>
          )}

          {!facturesError && factures.length === 0 && (
            <p>Aucune facture trouvée pour ce restaurant.</p>
          )}

          {factures.length > 0 && (
            <table
              style={{
                marginTop: 20,
                borderCollapse: "collapse",
                width: "100%",
                maxWidth: 800,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid white",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Date de génération
                  </th>
                  <th
                    style={{
                      border: "1px solid white",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Montant total
                  </th>
                  <th
                    style={{
                      border: "1px solid white",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    PDF
                  </th>
                </tr>
              </thead>
              <tbody>
                {factures.map((f) => (
                  <tr key={f.id}>
                    <td
                      style={{
                        border: "1px solid white",
                        padding: "12px",
                      }}
                    >
                      {f["Date de génération"] || f["Date de generation"] || "-"}
                    </td>
                    <td
                      style={{
                        border: "1px solid white",
                        padding: "12px",
                      }}
                    >
                      {f["Montant total"]
                        ? `€${parseFloat(f["Montant total"]).toFixed(2)}`
                        : "-"}
                    </td>
                    <td
                      style={{
                        border: "1px solid white",
                        padding: "12px",
                      }}
                    >
                      {f.PDF ? (
                        <a
                          href={f.PDF}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#4A9EFF",
                            textDecoration: "underline",
                          }}
                        >
                          Télécharger PDF
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

    </div>
  );
}