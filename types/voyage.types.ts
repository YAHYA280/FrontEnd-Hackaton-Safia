/**
 * Types pour les données de voyage - Format JSON pur
 * Le composant TripGraph calculera automatiquement les styles et positions
 */

// Option de transport entre villes
export interface TransportOption {
  type: 'train' | 'bus' | 'car' | 'private' | 'plane';
  name: string;
  duration: string;
  price: string;
  comfort: 'high' | 'medium' | 'low';
  frequency: string;
  description: string;
  icon: 'train' | 'bus' | 'car' | 'plane';
  recommended: boolean;
}

// Ressource (PDF, vidéo, lien)
export interface Resource {
  type: string;
  title: string;
  url?: string;
}

// Hébergement (format orchestrateur)
export interface HebergementData {
  id_hebergement: string;
  nom: string;
  type: string;  // Ex: "🏡 Riad"
  categorie: string;  // Ex: "4 étoiles", "3 étoiles"
  imageUrl?: string;  // URL d'image (optionnel)
  adresse?: string;  // Ex: "Derb el Farrane, Marrakech, Maroc"
  description: string;
  equipements: string[];  // Ex: ["WiFi gratuit", "Petit-déjeuner inclus", "Terrasse"]
  prix_nuit: string;  // Ex: "80 EUR", "60 EUR"
  check_in: string;  // Format: "HH:MM" (ex: "14:00")
  check_out: string;  // Format: "HH:MM" (ex: "12:00")
  contact?: {  // Optionnel (peut être absent dans le JSON)
    telephone?: string;
    email?: string;
    website?: string;
  };
  notes?: string;  // Ex: "Patio agréable, Proche des souks, Service exceptionnel"
}

// Emplacement (lieu à visiter + restaurants)
export interface EmplacementData {
  id_emplacement: string;
  nom: string;
  type: string;  // Ex: "Restaurant", "🌆 Place publique", "🏰 Palais", "🌿 Jardin", "🍽️ Gastronomie"
  imageUrl: string;  // URL de l'image
  heure: string;  // Format: "HH:MM" (ex: "08:30", "13:00")
  duree?: string;  // Ex: "1h", "2h", "1h30", "3h" (optionnel)
  description: string;  // Description longue du lieu
  activites: string[];  // Ex: ["Petit déjeuner"], ["Visite", "Photographie"]
  resources?: Resource[];  // Liens, PDFs, vidéos (optionnel)
  
  // Champs spécifiques pour restaurants (tous optionnels, présents uniquement si type="Restaurant" ou si categorie_repas est défini)
  categorie_repas?: 'petit_dejeuner' | 'dejeuner' | 'diner';  // Défini uniquement pour les restaurants
  lieu_hebergement?: boolean;  // True si restaurant dans l'hébergement (optionnel, peut être absent)
  menu?: string[];  // Ex: ["Msemen", "Pain marocain", "Confiture", "Thé à la menthe"]
  specialites?: string[];  // Ex: ["Petit déjeuner traditionnel"]
  prix?: string;  // Ex: "40-60 MAD (4-5 EUR)", "100-120 MAD (10-12 EUR)"
  ambiance?: string;  // Ex: "Authentique, médina", "Chic, convivial"
  reservation?: string;  // Ex: "Non nécessaire", "Recommandée", "Obligatoire"
}

// Jour de voyage (avec hébergement)
export interface JourData {
  id_jour: string;
  numero_jour: number;
  titre_jour: string;
  theme: string;
  hebergement: HebergementData;  // Nouveau: hébergement obligatoire par jour
  emplacements: EmplacementData[];
}

// Ville
export interface VilleData {
  id_ville: string;
  nom_ville: string;
  duree_sejour?: number;
  jours: JourData[];
}

// Transport entre deux villes
export interface TransportData {
  id_transport: string;
  ville_depart: string;
  ville_arrivee: string;
  titre?: string;
  imageUrl?: string;
  duree_moyenne: string;
  description: string;
  transportOptions: TransportOption[];
  activites?: string[];
  resources?: Resource[];
}

// Métadonnées du voyage (générées par l'orchestrateur)
export interface VoyageMetadata {
  temps_reponse_ms: number;
  temps_reponse_secondes: number;
  timestamp_generation: string; // ISO 8601 format
  profil_utilisateur: {
    duree_jours: number;
    villes: string[];
    budget_range: string;
    rythme: string;
    nombre_personnes: number;
    centres_interet: string[];
    restrictions_alimentaires: string[];
    preferences_hebergement: string[];
  };
}

// Voyage complet
export interface VoyageData {
  id_voyage: string;
  titre_voyage: string;
  duree_totale?: number;
  villes: VilleData[];
  transports?: TransportData[];
  metadata?: VoyageMetadata;  // Nouveau: métadonnées de génération
}

// Configuration du graphe (optionnelle)
export interface GraphConfig {
  // Dimensions
  emplacementWidth?: number;
  emplacementSpacing?: number;
  dayPadding?: number;
  villeSpacing?: number;
  
  // Couleurs (si personnalisation souhaitée)
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    border?: string;
  };
  
  // Options d'affichage
  showTransportNodes?: boolean;
  uniformDayWidth?: boolean;
  animateEdges?: boolean;
}

// Props du composant TripGraph
export interface TripGraphProps {
  voyageData: VoyageData;
  config?: GraphConfig;
}
