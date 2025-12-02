// app/api/commissions-commercial/route.js
import { NextResponse } from "next/server";

// Headers CORS pour autoriser les requêtes depuis le front React
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:8080",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const airtableId = searchParams.get("airtableId");

  if (!airtableId) {
    return NextResponse.json(
      { error: "airtableId manquant" },
      { status: 400, headers: corsHeaders }
    );
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  // 👉 table qui contient les totaux mensuels (type "Commissions mensuelles")
  const tableName =
    process.env.AIRTABLE_TABLE_COMMISSIONS_MENSUELLES || "Commissions mensuelles";

  if (!apiKey || !baseId || !tableName) {
    console.error("ENV COMMISSIONS", {
      apiKey: !!apiKey,
      baseId: !!baseId,
      tableName,
    });
    return NextResponse.json(
      {
        error: "Configuration Airtable incomplète",
        details: "Vérifie tes variables d'environnement (.env.local)",
      },
      { status: 500, headers: corsHeaders }
    );
  }

  // Le Base ID doit commencer par "app" pour l'API Airtable
  let actualBaseId = baseId;
  if (!actualBaseId.startsWith("app")) {
    actualBaseId = `app${actualBaseId}`;
  }

  try {
    // Récupération d'un échantillon pour voir la structure
    const sampleUrl = `https://api.airtable.com/v0/${actualBaseId}/${encodeURIComponent(
      tableName
    )}?maxRecords=5`;

    console.log("🔍 Appel Airtable commissions:", {
      baseId: actualBaseId,
      tableName,
      airtableId,
    });

    const sampleRes = await fetch(sampleUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (sampleRes.ok) {
      const sampleData = await sampleRes.json();
      const firstRecord = sampleData.records?.[0];
      console.log("📋 Échantillon de commissions (structure):", {
        count: sampleData.records?.length || 0,
        firstRecordFields: firstRecord?.fields || null,
        fieldNames: firstRecord?.fields ? Object.keys(firstRecord.fields) : [],
      });
    }

    // Récupération paginée de toutes les commissions (comme pour les factures)
    let allCommissions = [];
    let offset = null;
    const pageSize = 100;

    do {
      let url = `https://api.airtable.com/v0/${actualBaseId}/${encodeURIComponent(
        tableName
      )}?pageSize=${pageSize}`;
      if (offset) {
        url += `&offset=${offset}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Erreur lors de la récupération des commissions:", res.status, text);
        return NextResponse.json(
          { error: "Erreur Airtable", details: text },
          { status: 500, headers: corsHeaders }
        );
      }

      const data = await res.json();
      allCommissions = allCommissions.concat(data.records || []);
      offset = data.offset || null;
    } while (offset);

    console.log(`📦 ${allCommissions.length} commission(s) totale(s) récupérée(s) depuis Airtable`);

    // ✅ FILTRAGE SÉCURISÉ : Filtrer côté serveur par l'ID du commercial
    // Le champ peut être :
    // 1. Un champ de lien "Commercial" contenant l'ID du commercial
    // 2. Un champ texte "Identifiant espace commercial" ou "Identifiant espace"
    const commissions = allCommissions
      .filter((record) => {
        const fields = record.fields || {};
        
        // 1) Vérifier si c'est un champ de lien "Commercial"
        const commercialField = fields["Commercial"] || fields["commercial"];
        if (Array.isArray(commercialField)) {
          // Si c'est un tableau de liens, vérifier si l'ID est dedans
          return commercialField.includes(airtableId);
        }
        if (commercialField === airtableId) {
          return true;
        }

        // 2) Vérifier les champs texte d'identifiant
        const identifiantFields = [
          fields["Identifiant espace commercial"],
          fields["Identifiant espace"],
          fields["Identifiant espace commercial (from Commercial)"],
        ].filter(Boolean); // Enlever les valeurs null/undefined

        for (const identifiant of identifiantFields) {
          if (identifiant === airtableId || String(identifiant).includes(airtableId)) {
            return true;
          }
        }

        return false;
      })
      .map((record) => {
        const f = record.fields || {};
        return {
          id: record.id,
          moisLisible: f["Mois lisible"] || f["Mois"] || "",
          totalMois:
            f["Total du mois"] ??
            f["Total"] ??
            f["total_commission"] ??
            null,
        };
      })
      .sort((a, b) => {
        // Trier par mois (plus récent en premier)
        const moisA = a.moisLisible || "";
        const moisB = b.moisLisible || "";
        return moisB.localeCompare(moisA);
      });

    console.log(`✅ ${commissions.length} commission(s) trouvée(s) pour le commercial ${airtableId} sur ${allCommissions.length} commission(s) totale(s)`);

    return NextResponse.json({ commissions }, { headers: corsHeaders });
  } catch (err) {
    console.error("Erreur serveur COMMISSIONS:", err);
    return NextResponse.json(
      { error: "Erreur serveur", details: String(err) },
      { status: 500, headers: corsHeaders }
    );
  }
}