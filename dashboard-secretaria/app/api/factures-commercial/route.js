// app/api/factures-commercial/route.js
import { NextResponse } from "next/server";

// Headers CORS pour autoriser les requêtes depuis le front React
const getCorsHeaders = (origin) => {
  const allowedOrigins = [
    "http://localhost:8080",
    "https://secretar-ia.fr",
    "https://www.secretar-ia.fr",
  ];
  
  const isAllowed = !origin || allowedOrigins.some(allowed => origin.includes(allowed.replace(/^https?:\/\//, '')));
  
  return {
    "Access-Control-Allow-Origin": isAllowed && origin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
};

export async function OPTIONS(request) {
  const origin = request.headers.get("origin");
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

export async function GET(request) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  const { searchParams } = new URL(request.url);
  const airtableId = searchParams.get("airtableId");

  if (!airtableId) {
    return NextResponse.json(
      { error: "airtableId manquant" },
      { status: 400, headers: corsHeaders }
    );
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  let baseId = process.env.AIRTABLE_BASE_ID;
  // Table "Factures Commerciaux" dans Airtable
  const tableName = process.env.AIRTABLE_TABLE_FACTURES_COMMERCIAL || "Factures Commerciaux";

  if (!apiKey || !baseId || !tableName) {
    return NextResponse.json(
      {
        error: "Configuration Airtable incomplète",
        details: "Vérifie AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_FACTURES_COMMERCIAL dans .env.local",
      },
      { status: 500, headers: corsHeaders }
    );
  }

  // Le Base ID doit commencer par "app" pour l'API Airtable
  if (!baseId.startsWith("app")) {
    baseId = `app${baseId}`;
  }

  console.log("🔍 Appel Airtable factures commercial:", {
    baseId,
    tableName,
    airtableId,
  });

  try {
    // Récupération paginée de toutes les factures
    let allFactures = [];
    let offset = null;
    const pageSize = 100;

    do {
      let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
        tableName
      )}?pageSize=${pageSize}`;
      if (offset) {
        url += `&offset=${offset}`;
      }

      console.log(`🔍 Récupération des factures commercial (page ${Math.floor(allFactures.length / pageSize) + 1})...`);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Erreur lors de la récupération des factures commercial:", res.status, text);
        return NextResponse.json(
          { error: "Erreur Airtable", details: text },
          { status: 500, headers: corsHeaders }
        );
      }

      const data = await res.json();
      allFactures = allFactures.concat(data.records || []);
      offset = data.offset || null;
    } while (offset);

    console.log(`📦 ${allFactures.length} facture(s) commercial totale(s) récupérée(s) depuis Airtable`);
    
    // ✅ FILTRAGE SÉCURISÉ : Filtrer par l'ID du commercial
    const factures = allFactures
      .filter((record) => {
        const fields = record.fields || {};
        
        // Vérifier le champ "Commercial" (peut être un lien ou un tableau de liens)
        const commercialField = fields["Commercial"] || fields["commercial"];
        if (Array.isArray(commercialField)) {
          return commercialField.includes(airtableId);
        }
        if (commercialField === airtableId) {
          return true;
        }

        // Vérifier les champs texte d'identifiant
        const identifiantFields = [
          fields["Identifiant espace commercial"],
          fields["Identifiant espace"],
          fields["Identifiant espace commercial (from Commercial)"],
        ].filter(Boolean);

        for (const identifiant of identifiantFields) {
          if (identifiant === airtableId || String(identifiant).includes(airtableId)) {
            return true;
          }
        }

        return false;
      })
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }));

    console.log(`✅ ${factures.length} facture(s) trouvée(s) pour le commercial ${airtableId} sur ${allFactures.length} facture(s) totale(s)`);
    
    if (factures.length > 0) {
      console.log("📋 Première facture commercial:", factures[0]);
    } else {
      console.warn("⚠️ Aucune facture commercial trouvée avec l'ID:", airtableId);
    }

    return NextResponse.json({ records: factures }, { headers: corsHeaders });
  } catch (error) {
    console.error("❌ Erreur API factures COMMERCIAL:", error);
    return NextResponse.json(
      {
        error: "Erreur serveur",
        details: error.message || String(error),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

