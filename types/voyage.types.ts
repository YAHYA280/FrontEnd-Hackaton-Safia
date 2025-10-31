export interface Emplacement {
  id_emplacement: string;
  nom: string;
  type: string;
  imageUrl: string;
  heure: string;
  description: string;
  activites: string[];
  resources?: Resource[];
}

export interface Jour {
  id_jour: string;
  numero_jour: number;
  titre_jour: string;
  theme: string;
  emplacements: Emplacement[];
}

export interface Ville {
  id_ville: string;
  nom_ville: string;
  duree_sejour: number;
  jours: Jour[];
}

export interface TransportOption {
  type: string;
  name: string;
  duration: string;
  price: string;
  comfort: 'low' | 'medium' | 'high';
  frequency: string;
  description: string;
  icon: string;
  recommended: boolean;
}

export interface TransportData {
  id_transport: string;
  ville_depart: string;
  ville_arrivee: string;
  titre: string;
  imageUrl: string;
  duree_moyenne: string;
  description: string;
  activites: string[];
  resources?: Resource[];
  transportOptions?: TransportOption[];
}

export interface Resource {
  type: string;
  title: string;
  url?: string;
}

export interface VoyageData {
  id_voyage: string;
  titre_voyage: string;
  duree_totale: number;
  villes: Ville[];
  transports?: TransportData[];
}

export interface GraphConfig {
  emplacementWidth?: number;
  emplacementSpacing?: number;
  dayPadding?: number;
  villeSpacing?: number;
  showTransportNodes?: boolean;
  uniformDayWidth?: boolean;
  animateEdges?: boolean;
}
