import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { API_BASE_URL } from "@/config";

const Dashboard = () => {
  const navigate = useNavigate();
  // --- état "auth / user" ---
  const [user, setUser] = useState<any>(null);
  const [airtableId, setAirtableId] = useState("");
  const [role, setRole] = useState(""); // "restaurant" ou "commercial"
  const [loadingUser, setLoadingUser] = useState(true);

  // --- état "données restaurant" ---
  const [factures, setFactures] = useState<any[]>([]);
  const [facturesError, setFacturesError] = useState("");

  // --- état "données commercial" ---
  const [commissions, setCommissions] = useState<any[]>([]);
  const [commissionsError, setCommissionsError] = useState("");

  // =============================
  // 1) écoute Firebase Auth + Firestore /users
  // =============================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
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
              console.warn(
                "Aucun document Firestore trouvé pour cet utilisateur dans users, restaurants ou commerciaux"
              );
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
  }, [navigate]);

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
        `${API_BASE_URL}/api/factures-restaurant?airtableId=${airtableId}`
      );
      const data = await res.json();

      console.log("Réponse API factures:", data);

      if (!res.ok) {
        setFacturesError(data.error || "Erreur Airtable");
        setFactures([]);
        return;
      }

      setFacturesError("");
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
  // =============================
  async function fetchCommissions() {
    if (!airtableId) return;

    try {
      console.log(
        "Appel API commissions commercial avec airtableId =",
        airtableId
      );

      const res = await fetch(
        `${API_BASE_URL}/api/commissions-commercial?airtableId=${airtableId}`
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-primary-foreground text-lg font-medium">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
          color: "white",
        }}
      >
        <p>Non connecté</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* En-tête avec navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
            <div className="flex flex-wrap gap-2 text-sm text-primary-foreground/70">
              <span className="bg-primary-foreground/10 px-3 py-1 rounded-full">
                📧 {user.email}
              </span>
              <span className="bg-primary-foreground/10 px-3 py-1 rounded-full">
                👤 {role === "restaurant" ? "Restaurant" : "Commercial"}
              </span>
              <span className="bg-primary-foreground/10 px-3 py-1 rounded-full">
                🆔 {airtableId}
              </span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Se déconnecter
          </button>
        </div>

      {/* ================== VUE COMMERCIAL ================== */}
      {role === "commercial" && (
        <div className="mt-8">
          <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary-foreground/10 shadow-elegant">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-accent">💼</span>
              Commissions mensuelles
            </h2>

            {commissionsError && (
              <div className="bg-destructive/20 border border-destructive text-destructive-foreground px-4 py-3 rounded-lg mb-4">
                ⚠️ Erreur : {commissionsError}
              </div>
            )}

            {!commissionsError && commissions.length === 0 && (
              <div className="text-center py-12 text-primary-foreground/60">
                <p className="text-lg">Aucune commission trouvée pour ce commercial.</p>
              </div>
            )}

            {commissions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-primary-foreground/20">
                      <th className="text-left py-4 px-4 font-semibold text-primary-foreground">
                        Mois
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-primary-foreground">
                        Total du mois
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((c, index) => (
                      <tr 
                        key={c.id}
                        className={`border-b border-primary-foreground/10 hover:bg-primary-foreground/5 transition-colors ${
                          index % 2 === 0 ? 'bg-primary-foreground/5' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          {c.moisLisible || c.MoisLisible || c.Mois || "-"}
                        </td>
                        <td className="py-4 px-4 font-semibold text-accent">
                          {c.totalMois !== null && c.totalMois !== undefined
                            ? `€${parseFloat(c.totalMois.toString()).toFixed(2)}`
                            : c["Total du mois"]
                            ? `€${parseFloat(c["Total du mois"].toString()).toFixed(2)}`
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================== VUE RESTAURANT ================== */}
      {role === "restaurant" && (
        <div className="mt-8">
          <div className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary-foreground/10 shadow-elegant">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-accent">🏪</span>
              Factures
            </h2>

            {facturesError && (
              <div className="bg-destructive/20 border border-destructive text-destructive-foreground px-4 py-3 rounded-lg mb-4">
                ⚠️ Erreur : {facturesError}
              </div>
            )}

            {!facturesError && factures.length === 0 && (
              <div className="text-center py-12 text-primary-foreground/60">
                <p className="text-lg">Aucune facture trouvée pour ce restaurant.</p>
              </div>
            )}

            {factures.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-primary-foreground/20">
                      <th className="text-left py-4 px-4 font-semibold text-primary-foreground">
                        Date de génération
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-primary-foreground">
                        Montant total
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-primary-foreground">
                        PDF
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {factures.map((f, index) => (
                      <tr 
                        key={f.id}
                        className={`border-b border-primary-foreground/10 hover:bg-primary-foreground/5 transition-colors ${
                          index % 2 === 0 ? 'bg-primary-foreground/5' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          {f["Date de génération"] ||
                            f["Date de generation"] ||
                            "-"}
                        </td>
                        <td className="py-4 px-4 font-semibold text-accent">
                          {f["Montant total"]
                            ? `€${parseFloat(f["Montant total"].toString()).toFixed(2)}`
                            : "-"}
                        </td>
                        <td className="py-4 px-4">
                          {f.PDF ? (
                            <a
                              href={f.PDF}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent/80 underline transition-colors font-medium"
                            >
                              📄 Télécharger PDF
                            </a>
                          ) : (
                            <span className="text-primary-foreground/40">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Dashboard;

