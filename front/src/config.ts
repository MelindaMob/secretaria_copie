// Configuration de l'application
const normalizeUrl = (url: string): string => {
  // Si l'URL commence déjà par http:// ou https://, la retourner telle quelle
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Si l'URL ne commence pas par un protocole, ajouter https://
  // (sauf pour localhost qui utilise http://)
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    return `http://${url}`;
  }
  
  return `https://${url}`;
};

const getApiBaseUrl = () => {
  let baseUrl: string;
  
  // Si une variable d'environnement est définie, l'utiliser (priorité)
  if (import.meta.env.VITE_API_BASE_URL) {
    baseUrl = import.meta.env.VITE_API_BASE_URL;
  } else if (import.meta.env.PROD) {
    // En production (sur secretar-ia.fr), utiliser api.secretar-ia.fr
    baseUrl = 'https://api.secretar-ia.fr';
  } else {
    // En développement local, utiliser localhost
    baseUrl = 'http://localhost:3001';
  }
  
  // Normaliser l'URL pour s'assurer qu'elle a un protocole
  return normalizeUrl(baseUrl);
};

export const API_BASE_URL = getApiBaseUrl();
export const DASHBOARD_URL = `${API_BASE_URL}`;

// Log pour débogage (toujours actif pour vérifier en production aussi)
console.log('🔧 Configuration API:', {
  mode: import.meta.env.MODE,
  apiBaseUrl: API_BASE_URL,
  envVar: import.meta.env.VITE_API_BASE_URL || 'non définie',
  isProd: import.meta.env.PROD,
});

