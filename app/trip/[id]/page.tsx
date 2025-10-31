'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import ChatInterface from '@/components/trip/ChatInterface';
import TripGraph from '@/components/trip/TripGraph';
import LoadingView from '@/components/trip/LoadingView';
import type { VoyageData } from '@/types/voyage.types';

// Mock data for the trip
const mockVoyageData: VoyageData = {
  id_voyage: "voyage-maroc-7j",
  titre_voyage: "Aventure au Maroc : Marrakech & Fès",
  duree_totale: 7,
  villes: [
    {
      id_ville: "marrakech",
      nom_ville: "Marrakech",
      duree_sejour: 4,
      jours: [
        {
          id_jour: "jour1-m",
          numero_jour: 1,
          titre_jour: "Arrivée et Installation",
          theme: "Découverte",
          emplacements: [
            {
              id_emplacement: "loc-aeroport",
              nom: "Aéroport Marrakech-Menara",
              type: "Transport",
              imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop",
              heure: "14:00",
              description: "Arrivée à l'aéroport et transfert vers le riad",
              activites: ["Transfert vers le riad"],
            },
            {
              id_emplacement: "loc-riad",
              nom: "Riad dans la Médina",
              type: "Hébergement",
              imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=300&h=200&fit=crop",
              heure: "16:00",
              description: "Installation au riad traditionnel au cœur de la médina",
              activites: ["Check-in", "Repos et détente"],
            },
          ],
        },
        {
          id_jour: "jour2-m",
          numero_jour: 2,
          titre_jour: "Découverte de la Médina",
          theme: "Culturel",
          emplacements: [
            {
              id_emplacement: "loc-medina",
              nom: "Médina Historique",
              type: "Quartier historique",
              imageUrl: "https://images.unsplash.com/photo-1508181292264-b3c8f5f90e16?w=300&h=200&fit=crop",
              heure: "09:00",
              description: "Exploration des quartiers historiques de la médina",
              activites: ["Quartiers historiques", "Architecture NEXTRIPne"],
            },
            {
              id_emplacement: "loc-souks",
              nom: "Souks Traditionnels",
              type: "Shopping",
              imageUrl: "https://images.unsplash.com/photo-1555400082-5fcb5d0f51a2?w=300&h=200&fit=crop",
              heure: "12:00",
              description: "Immersion dans les souks animés de Marrakech",
              activites: ["Épices", "Textiles", "Artisans locaux"],
            },
          ],
        },
      ],
    },
  ],
  transports: [
    {
      id_transport: "transport-1",
      ville_depart: "marrakech",
      ville_arrivee: "fes",
      titre: "Transport: Marrakech → Fès",
      imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop",
      duree_moyenne: "7h",
      description: "Voyage en train à travers les paysages NEXTRIPns",
      activites: ["Paysages pittoresques", "Repos et découverte"],
      transportOptions: [
        {
          type: "train",
          name: "Train ONCF",
          duration: "7h00",
          price: "200-300 MAD",
          comfort: "high",
          frequency: "2 départs/jour",
          description: "Confortable avec climatisation",
          icon: "train",
          recommended: true
        },
      ],
    },
  ],
};

interface TripPageProps {
  params: {
    id: string;
  };
}

export default function TripPage({ params }: TripPageProps) {
  const [isLoading, setIsLoading] = useState(false);

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
                {mockVoyageData.titre_voyage}
              </h1>
              <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-900/20 dark:border-amber-400/20 text-amber-900 dark:text-amber-400 text-xs font-medium">
                {mockVoyageData.duree_totale} days
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
          {isLoading ? (
            <LoadingView />
          ) : (
            <TripGraph voyageData={mockVoyageData} />
          )}
        </div>
      </div>
    </div>
  );
}
