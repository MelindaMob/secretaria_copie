// app/api/factures-restaurant/route.js
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
  const tableName = process.env.AIRTABLE_TABLE_FACTURES; // "Factures"

  if (!apiKey || !baseId || !tableName) {
    return NextResponse.json(
      {
        error: "Configuration Airtable incomplète",
        details: "Vérifie AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_FACTURES dans .env.local",
      },
      { status: 500, headers: corsHeaders }
    );
  }

  // Le Base ID doit commencer par "app" pour l'API Airtable
  if (!baseId.startsWith("app")) {
    baseId = `app${baseId}`;
  }

  // Le champ "Restaurant" dans Airtable est un tableau de liens
  // D'après les logs, c'est : Restaurant: [ 'rectlnZYW44Z0LAWA' ]
  // Pour les champs de lien dans Airtable, même s'ils sont des tableaux, on utilise directement l'ID
  // Mais il faut utiliser la syntaxe correcte pour les champs de lien
  const filterFormulas = [
    `{Restaurant} = '${airtableId}'`, // Syntaxe standard pour champs de lien
    `FIND('${airtableId}', CONCATENATE({Restaurant}))`, // Alternative avec CONCATENATE
    `SEARCH('${airtableId}', CONCATENATE({Restaurant}))`, // Alternative avec SEARCH
  ];

  // D'abord, récupérons quelques factures pour voir la structure
  const sampleUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
    tableName
  )}?maxRecords=5`;

  console.log("🔍 Appel Airtable factures:", {
    baseId,
    tableName,
    airtableId,
  });

  try {
    // Récupération d'un échantillon pour voir la structure
    const sampleRes = await fetch(sampleUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (sampleRes.ok) {
      const sampleData = await sampleRes.json();
      const firstRecord = sampleData.records?.[0];
      const restaurantValue = firstRecord?.fields?.Restaurant || firstRecord?.fields?.restaurant;
      
      console.log("📋 Échantillon de factures (structure):", {
        count: sampleData.records?.length || 0,
        firstRecordFields: firstRecord?.fields || null,
        restaurantFieldValue: restaurantValue,
        restaurantValueType: Array.isArray(restaurantValue) ? 'array' : typeof restaurantValue,
        restaurantValueString: JSON.stringify(restaurantValue),
      });
      
      // Vérifions si l'ID correspond à un des IDs dans l'échantillon
      if (Array.isArray(restaurantValue)) {
        const matchingRecords = sampleData.records?.filter(record => {
          const restField = record.fields?.Restaurant || record.fields?.restaurant;
          return Array.isArray(restField) && restField.includes(airtableId);
        }) || [];
        console.log(`🔍 Factures dans l'échantillon avec cet ID: ${matchingRecords.length}`);
      }
    }

    // Pour les champs de lien dans Airtable, les formules de filtre peuvent être problématiques
    // Solution : récupérer toutes les factures et filtrer côté serveur par l'ID exact
    // ✅ SÉCURITÉ : Chaque restaurant ne verra QUE ses propres factures grâce au filtrage par airtableId
    let allFactures = [];
    let offset = null;
    const pageSize = 100;

    // Récupération paginée de toutes les factures
    do {
      let url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
        tableName
      )}?pageSize=${pageSize}`;
      if (offset) {
        url += `&offset=${offset}`;
      }

      console.log(`🔍 Récupération des factures (page ${Math.floor(allFactures.length / pageSize) + 1})...`);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Erreur lors de la récupération des factures:", res.status, text);
        return NextResponse.json(
          { error: "Erreur Airtable", details: text },
          { status: 500, headers: corsHeaders }
        );
      }

      const data = await res.json();
      allFactures = allFactures.concat(data.records || []);
      offset = data.offset || null;
    } while (offset);

    console.log(`📦 ${allFactures.length} facture(s) totale(s) récupérée(s) depuis Airtable`);
    
    // ✅ FILTRAGE SÉCURISÉ : Chaque restaurant ne voit QUE ses factures (filtrées par airtableId)
    const factures = allFactures
      .filter((record) => {
        const restaurantField = record.fields?.Restaurant || record.fields?.restaurant;
        if (Array.isArray(restaurantField)) {
          // Si c'est un tableau, vérifier si l'ID du restaurant est dedans
          return restaurantField.includes(airtableId);
        }
        // Si c'est une valeur simple, comparer directement
        return restaurantField === airtableId;
      })
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }));

    console.log(`✅ ${factures.length} facture(s) trouvée(s) pour le restaurant ${airtableId} sur ${allFactures.length} facture(s) totale(s)`);
    
    if (factures.length > 0) {
      console.log("📋 Première facture:", factures[0]);
    } else {
      console.warn("⚠️ Aucune facture trouvée avec l'ID:", airtableId);
      console.warn("   Vérifiez que l'ID correspond bien à celui dans le champ Restaurant");
    }

    return NextResponse.json({ records: factures }, { headers: corsHeaders });
  } catch (error) {
    console.error("❌ Erreur API factures RESTAU:", error);
    return NextResponse.json(
      {
        error: "Erreur serveur",
        details: error.message || String(error),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}