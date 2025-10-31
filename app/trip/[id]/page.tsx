'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import ChatInterface from '@/components/trip/ChatInterface';
import TripGraph from '@/components/trip/TripGraph';
import type { VoyageData } from '@/types/voyage.types';
import exampleTripData from '@/trip-example/example-1.json';

// Use example trip data as fallback
const mockVoyageData: VoyageData = exampleTripData as VoyageData;

interface TripPageProps {
  params: {
    id: string;
  };
}

export default function TripPage({ params }: TripPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [tripData, setTripData] = useState<VoyageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Récupérer les préférences depuis localStorage
        const tripId = params.id;
        const storedTripData = localStorage.getItem(`trip_${tripId}`);
        
        if (!storedTripData) {
          throw new Error('Trip data not found in localStorage');
        }

        const parsedTripData = JSON.parse(storedTripData);
        const profile = parsedTripData.profile;

        // Calculer duree_jours depuis dates si disponibles
        let duree_jours = 7; // Valeur par défaut
        if (profile.trip.dates?.start && profile.trip.dates?.end) {
          const start = new Date(profile.trip.dates.start);
          const end = new Date(profile.trip.dates.end);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 0) {
            duree_jours = diffDays;
          }
        } else if (profile.trip.destinations?.length) {
          // Estimation: 3-4 jours par ville si pas de dates
          duree_jours = profile.trip.destinations.length * 3;
        }

        // Extraire villes
        const villes = profile.trip.destinations || [];

        // Extraire budget_range (convertir MAD en EUR si nécessaire)
        let budget_range = '800-1000 EUR'; // Valeur par défaut
        if (profile.budget.rangeMad) {
          // Convertir de MAD à EUR (1 EUR ≈ 11 MAD approximativement)
          const rangeMad = profile.budget.rangeMad;
          const match = rangeMad.match(/(\d+)-(\d+)\s*MAD/i);
          if (match) {
            const minMad = parseInt(match[1]);
            const maxMad = parseInt(match[2]);
            const minEur = Math.round(minMad / 11);
            const maxEur = Math.round(maxMad / 11);
            budget_range = `${minEur}-${maxEur} EUR`;
          } else {
            // Si format différent, utiliser directement avec conversion EUR
            budget_range = rangeMad.replace(/MAD/gi, 'EUR');
          }
        }

        // Extraire rythme (doit être 'Détendu', 'Modéré', ou 'Intense')
        let rythme: 'Détendu' | 'Modéré' | 'Intense' = 'Modéré'; // Valeur par défaut
        const rythmeStyle = profile.preferences.rythmeStyle;
        if (rythmeStyle === 'Détendu' || rythmeStyle === 'Modéré' || rythmeStyle === 'Intense') {
          rythme = rythmeStyle;
        } else if (rythmeStyle) {
          // Normaliser les valeurs possibles
          const rythmeLower = rythmeStyle.toLowerCase();
          if (rythmeLower.includes('détendu') || rythmeLower.includes('relaxed') || rythmeLower.includes('slow')) {
            rythme = 'Détendu';
          } else if (rythmeLower.includes('intense') || rythmeLower.includes('fast') || rythmeLower.includes('rapide')) {
            rythme = 'Intense';
          } else {
            // Par défaut, utiliser 'Modéré'
            rythme = 'Modéré';
          }
        }

        // Extraire nombre_personnes (peut être dans plusieurs endroits)
        const nombre_personnes = 
          profile.preferences.additionalAnswers?.nombre_personnes ||
          profile.preferences.formAnswers?.initial?.nombre_personnes ||
          profile.preferences.formAnswers?.dynamic?.nombre_personnes ||
          profile.preferences.additionalAnswers?.['How many people?'] ||
          profile.preferences.formAnswers?.initial?.['How many people?'] ||
          profile.preferences.formAnswers?.dynamic?.['How many people?'] ||
          1; // Valeur par défaut

        // Extraire centres_interet
        const centres_interet = profile.preferences.interests || [];

        // Extraire restrictions_alimentaires
        const restrictions_alimentaires = 
          profile.preferences.additionalAnswers?.restrictions_alimentaires ||
          profile.preferences.formAnswers?.initial?.restrictions_alimentaires ||
          profile.preferences.formAnswers?.dynamic?.restrictions_alimentaires ||
          profile.preferences.additionalAnswers?.['Dietary Restrictions'] ||
          profile.preferences.formAnswers?.initial?.['Dietary Restrictions'] ||
          profile.preferences.formAnswers?.dynamic?.['Dietary Restrictions'] ||
          [];

        // Extraire preferences_hebergement
        const preferences_hebergement = 
          profile.preferences.additionalAnswers?.preferences_hebergement ||
          profile.preferences.formAnswers?.initial?.preferences_hebergement ||
          profile.preferences.formAnswers?.dynamic?.preferences_hebergement ||
          profile.preferences.additionalAnswers?.['Accommodation Preferences'] ||
          profile.preferences.formAnswers?.initial?.['Accommodation Preferences'] ||
          profile.preferences.formAnswers?.dynamic?.['Accommodation Preferences'] ||
          [];

        // Construire le body de la requête selon le format ProfilUtilisateur
        interface ProfilUtilisateur {
          duree_jours: number;
          villes: string[];
          budget_range: string;
          rythme: 'Détendu' | 'Modéré' | 'Intense';
          nombre_personnes?: number;
          centres_interet?: string[];
          restrictions_alimentaires?: string[];
          preferences_hebergement?: string[];
        }

        const requestBody: ProfilUtilisateur = {
          duree_jours,
          villes,
          budget_range,
          rythme,
        };

        // Ajouter les champs optionnels seulement s'ils ont des valeurs
        if (nombre_personnes !== undefined && nombre_personnes !== null) {
          requestBody.nombre_personnes = nombre_personnes;
        }
        if (centres_interet && centres_interet.length > 0) {
          requestBody.centres_interet = centres_interet;
        }
        if (restrictions_alimentaires && restrictions_alimentaires.length > 0) {
          requestBody.restrictions_alimentaires = restrictions_alimentaires;
        }
        if (preferences_hebergement && preferences_hebergement.length > 0) {
          requestBody.preferences_hebergement = preferences_hebergement;
        }

        // Faire l'appel API
        const response = await fetch('http://localhost:4000/api/orchestrateur/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...requestBody, ...profile}),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const responseData = await response.json();
        
        // Gérer le format enveloppé { success: true, data: {...} }
        let voyageData: VoyageData;
        if (responseData.success && responseData.data) {
          voyageData = responseData.data as VoyageData;
        } else if (responseData.id_voyage) {
          // Format direct sans enveloppe
          voyageData = responseData as VoyageData;
        } else {
          throw new Error('Invalid response format from API');
        }
        
        // Valider que les données ont la structure attendue
        if (!voyageData.villes || !Array.isArray(voyageData.villes)) {
          throw new Error('Invalid voyage data: villes is missing or not an array');
        }
        
        // Normaliser les données pour s'assurer que toutes les propriétés nécessaires existent
        voyageData.villes = voyageData.villes.map((ville: any) => ({
          ...ville,
          jours: Array.isArray(ville.jours) ? ville.jours.map((jour: any) => ({
            ...jour,
            emplacements: Array.isArray(jour.emplacements) ? jour.emplacements : [],
          })) : [],
        }));
        
        setTripData(voyageData);
      } catch (err) {
        console.error('Error fetching trip data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load trip data');
        // En cas d'erreur, utiliser les données mock comme fallback
        setTripData(mockVoyageData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripData();
  }, [params.id]);

  // Utiliser les données du trip ou les données mock en fallback
  const displayData = tripData || mockVoyageData;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="clean-card border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Compass className="h-7 w-7 text-amber-900 dark:text-amber-400 transition-transform group-hover:rotate-180 duration-500" />
              </div>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
                NEXTRIP
              </h2>
            </Link>

            {/* Trip Title */}
            <div className="hidden md:flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
              <h1 className="text-slate-900 dark:text-slate-100 text-base font-semibold">
                {displayData.titre_voyage}
              </h1>
              <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-900/20 dark:border-amber-400/20 text-amber-900 dark:text-amber-400 text-xs font-medium">
                {displayData.duree_totale} days
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href="/plan-trip"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Planning</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 text-sm font-medium transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Chat Interface */}
        <div className="w-1/2 h-full border-r border-slate-200 dark:border-slate-700">
          <ChatInterface
            initialMessage="Hey there! Ready to explore your personalized Morocco itinerary? Ask me anything about your trip, and I can help you customize it!"
          />
        </div>

        {/* Right Side - Trip Graph/Roadmap */}
        <div className="w-1/2 h-full">
          {error && (
            <div className="absolute top-20 right-4 z-50 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-4 py-3 rounded-lg shadow-lg max-w-md">
              <p className="text-sm text-red-600 dark:text-red-400">
                ⚠️ {error}
              </p>
            </div>
          )}
          <TripGraph voyageData={displayData} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
