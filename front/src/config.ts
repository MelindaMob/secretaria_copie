// Configuration de l'application
const getApiBaseUrl = () => {
  // Si une variable d'environnement est définie, l'utiliser (priorité)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // En production (sur secretar-ia.fr), utiliser api.secretar-ia.fr
  if (import.meta.env.PROD) {
    return 'https://api.secretar-ia.fr';
  }
  
  // En développement local, utiliser localhost
  return 'http://localhost:3001';
};

export const API_BASE_URL = getApiBaseUrl();
export const DASHBOARD_URL = `${API_BASE_URL}`;

// Log pour débogage (uniquement en développement)
if (import.meta.env.DEV) {
  console.log('🔧 Configuration API:', {
    mode: import.meta.env.MODE,
    apiBaseUrl: API_BASE_URL,
    envVar: import.meta.env.VITE_API_BASE_URL || 'non définie',
  });
}

