const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.warn("⚠️ Airtable env vars manquantes");
}

export async function fetchAirtableRecords(tableName, filterFormula) {
  const url = new URL(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      tableName
    )}`
  );

  if (filterFormula) {
    url.searchParams.set("filterByFormula", filterFormula);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
    // on force côté serveur
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Erreur Airtable:", await res.text());
    throw new Error("Erreur lors de l'appel à Airtable");
  }

  const data = await res.json();
  return data.records || [];
}