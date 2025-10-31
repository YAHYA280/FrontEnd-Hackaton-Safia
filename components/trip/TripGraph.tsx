import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import VilleParentNode from './nodes/VilleParentNode';
import JourParentNode from './nodes/JourParentNode';
import EmplacementNode from './nodes/EmplacementNode';
import TransportNode from './nodes/TransportNode';
import { HebergementNode } from './nodes/HebergementNode';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Check, X, Clock, ChevronDown, ChevronUp, Info, Train, Bus, Car, Plane, DollarSign, Timer, Star, Hotel, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define nodeTypes outside component to prevent re-creation on every render
const nodeTypes = {
  villeParent: VilleParentNode,
  jourParent: JourParentNode,
  emplacement: EmplacementNode,
  transport: TransportNode,
  hebergement: HebergementNode,
};

// Importer les types depuis le fichier dédié
import type { VoyageData, GraphConfig, TransportData } from '@/types/voyage.types';

interface TripGraphProps {
  voyageData: VoyageData;
  config?: GraphConfig;
  isLoading?: boolean;
}

const TripGraph = ({ voyageData, config, isLoading = false }: TripGraphProps) => {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [selectedHebergement, setSelectedHebergement] = useState<any>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  
  // Configuration par défaut
  const defaultConfig: GraphConfig = {
    emplacementWidth: 220,
    emplacementSpacing: 40,
    dayPadding: 80,
    villeSpacing: 150,
    showTransportNodes: true,
    uniformDayWidth: true,
    animateEdges: true,
  };
  
  const graphConfig = { ...defaultConfig, ...config };

  const onInit = useCallback(() => {
    // React Flow initialized
  }, []);

  // Convertir les données JSON en nœuds et edges React Flow
  const { nodes, edges } = useCallback(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let edgeId = 1;
    let currentY = 100;

    // Utiliser la configuration passée en props
    const emplacementWidth = graphConfig.emplacementWidth!;
    const emplacementSpacing = graphConfig.emplacementSpacing!;
    const dayPadding = graphConfig.dayPadding!;
    
    // Vérifier que voyageData.villes existe et est un tableau
    if (!voyageData.villes || !Array.isArray(voyageData.villes) || voyageData.villes.length === 0) {
      return { nodes: [], edges: [] };
    }

    // Calculer la largeur maximale pour uniformité
    let globalMaxEmplacements = 0;
    voyageData.villes.forEach((ville) => {
      if (ville?.jours && Array.isArray(ville.jours)) {
        ville.jours.forEach((jour) => {
          if (jour?.emplacements && Array.isArray(jour.emplacements)) {
            globalMaxEmplacements = Math.max(globalMaxEmplacements, jour.emplacements.length);
          }
        });
      }
    });
    
    // Minimum 1 emplacement pour la largeur de calcul (même si vide)
    const effectiveMaxEmplacements = Math.max(globalMaxEmplacements, 1);
    const uniformDayWidth = (effectiveMaxEmplacements * emplacementWidth) + ((effectiveMaxEmplacements - 1) * emplacementSpacing) + dayPadding;
    const uniformVilleWidth = uniformDayWidth + 100;

    // Parcourir les villes
    voyageData.villes.forEach((ville, villeIndex) => {
      const villeHeight = ville.jours.length * 300 + 140;

      // Créer le nœud Ville (Parent)
      nodes.push({
        id: ville.id_ville,
        type: "villeParent",
        position: { x: 400, y: currentY },
        data: { ville: ville.nom_ville },
        style: { width: uniformVilleWidth, height: villeHeight },
      });

      let currentJourY = 120;

      // Parcourir les jours
      ville.jours.forEach((jour, jourIndex) => {
        const jourId = jour.id_jour;
        const couleurTheme = jourIndex % 2 === 0 ? "gray" : "amber";
        
        // Vérifier que jour.emplacements existe et est un tableau
        const emplacements = jour?.emplacements && Array.isArray(jour.emplacements) ? jour.emplacements : [];
        const numEmplacements = emplacements.length;
        // Calculer la largeur du contenu (minimum une largeur par défaut si pas d'emplacements)
        const contentWidth = numEmplacements > 0 
          ? (numEmplacements * emplacementWidth) + ((numEmplacements - 1) * emplacementSpacing)
          : emplacementWidth; // Largeur par défaut si pas d'emplacements
        const dayX = (uniformVilleWidth - uniformDayWidth) / 2;

        // Créer le nœud Jour (Parent)
        nodes.push({
          id: jourId,
          type: "jourParent",
          position: { x: dayX, y: currentJourY },
          parentId: ville.id_ville,
          extent: "parent" as const,
          data: { jourLabel: `JOUR ${jour.numero_jour}` },
          style: { width: uniformDayWidth, height: 270 },
        });

        // Créer le nœud Hébergement lié au jour (icône simple)
        if (jour.hebergement) {
          const hebergementId = `${jourId}-hebergement`;
          // Centrer verticalement l'icône (hauteur du jour: 270, icône: 64)
          const jourCenterY = currentJourY + 270 / 2 - 32; // 32 = demi-hauteur de l'icône
          nodes.push({
            id: hebergementId,
            type: "hebergement",
            position: { x: uniformDayWidth + 50, y: jourCenterY },
            parentId: ville.id_ville,
            extent: "parent" as const,
            data: jour.hebergement as any,
          });

          // Edge Jour → Hébergement
          edges.push({
            id: `e${edgeId++}`,
            source: jourId,
            target: hebergementId,
            type: "smoothstep",
            style: {
              stroke: "rgb(180 83 9)",
              strokeWidth: 3,
              strokeDasharray: "5,5",
            },
            label: "🏨 Nuitée",
            labelStyle: {
              fill: "rgb(180 83 9)",
              fontWeight: 600,
            },
            animated: false,
          });
        }

        // Créer les nœuds Emplacements
        const startX = (uniformDayWidth - contentWidth) / 2;
        emplacements.forEach((emplacement, empIndex) => {
          const empX = startX + empIndex * (emplacementWidth + emplacementSpacing);

          nodes.push({
            id: emplacement.id_emplacement,
            type: "emplacement",
            position: { x: empX, y: 70 },
            parentId: jourId,
            extent: "parent" as const,
            data: {
              titre: emplacement.nom,
              imageUrl: emplacement.imageUrl,
              heure: emplacement.heure,
              description: emplacement.description,
              activites: emplacement.activites || [],
              couleurTheme: couleurTheme,
              jourLabel: `JOUR ${jour.numero_jour}`,
              type: emplacement.type,
              resources: emplacement.resources || [],
              // Nouveaux champs pour restaurants
              categorie_repas: emplacement.categorie_repas,
              lieu_hebergement: emplacement.lieu_hebergement,
              menu: emplacement.menu,
              specialites: emplacement.specialites,
              prix: emplacement.prix,
              ambiance: emplacement.ambiance,
              reservation: emplacement.reservation,
            },
          });

          // Créer les edges entre emplacements
          if (empIndex > 0) {
            const prevEmplacement = jour.emplacements[empIndex - 1];
            edges.push({
              id: `e${edgeId++}`,
              source: prevEmplacement.id_emplacement,
              target: emplacement.id_emplacement,
              style: { stroke: "rgb(180 83 9)", strokeWidth: 3 },
              type: "smoothstep",
              animated: true,
            });
          }
        });

        // Edge entre le dernier emplacement d'un jour et le premier du jour suivant
        // (uniquement si les deux jours ont des emplacements)
        if (jourIndex < ville.jours.length - 1 && 
            jour.emplacements.length > 0) {
          const nextJour = ville.jours[jourIndex + 1];
          if (nextJour.emplacements.length > 0) {
            const lastEmplacement = jour.emplacements[jour.emplacements.length - 1];
            const firstEmplacement = nextJour.emplacements[0];
            
            edges.push({
              id: `e${edgeId++}`,
              source: lastEmplacement.id_emplacement,
              target: firstEmplacement.id_emplacement,
              style: { stroke: "rgb(217 119 6)", strokeWidth: 2 },
              type: "smoothstep",
              animated: false,
            });
          }
        }

        currentJourY += 300;
      });

      // Ajouter le nœud de transport entre villes uniquement si les données backend existent (pas de valeurs mock)
      if (villeIndex < voyageData.villes.length - 1 && graphConfig.showTransportNodes) {
        const nextVille = voyageData.villes[villeIndex + 1];
        const transportData = voyageData.transports?.find(
          t => t.ville_depart === ville.id_ville && t.ville_arrivee === nextVille.id_ville
        );

        if (transportData) {
          const transportNodeId = `transport-${ville.id_ville}-${nextVille.id_ville}`;
          const transportY = currentY + villeHeight + 75;
          const transportX = 400 + uniformVilleWidth / 2 - 32;

          nodes.push({
            id: transportNodeId,
            type: "transport",
            position: { x: transportX, y: transportY },
            data: {
              titre: transportData.titre,
              imageUrl: transportData.imageUrl,
              heure: transportData.duree_moyenne,
              description: transportData.description,
              activites: transportData.activites,
              couleurTheme: "teal",
              jourLabel: "TRANSPORT",
              type: "🚗 Transport Inter-Villes",
              resources: transportData.resources,
              transportOptions: transportData.transportOptions
            },
            zIndex: 1000,
          });

          // Edges vers/depuis le transport
          const lastJour = ville.jours[ville.jours.length - 1];
          const lastEmplacement = lastJour.emplacements[lastJour.emplacements.length - 1];

          edges.push({
            id: `e${edgeId++}`,
            source: lastEmplacement.id_emplacement,
            target: transportNodeId,
            style: { stroke: "rgb(120 53 15)", strokeWidth: 4, strokeDasharray: "12 8" },
            type: "smoothstep",
            animated: true,
            label: "🚗 Transport",
          });

          const firstJour = nextVille.jours[0];
          const firstEmplacement = firstJour.emplacements[0];

          edges.push({
            id: `e${edgeId++}`,
            source: transportNodeId,
            target: firstEmplacement.id_emplacement,
            style: { stroke: "rgb(120 53 15)", strokeWidth: 4, strokeDasharray: "12 8" },
            type: "smoothstep",
            animated: true,
            label: "🚗 Transport",
          });

          currentY = transportY + 150;
        } else {
          currentY += villeHeight + 150;
        }
      } else {
        currentY += villeHeight + 150;
      }
    });

    return { nodes, edges };
  }, [voyageData, graphConfig])();

  // Enrichir les nœuds avec la fonction onClick
  const enrichedNodes = nodes.map(node => {
    if (node.type === 'emplacement' || node.type === 'transport') {
      return {
        ...node,
        data: {
          ...node.data,
          onClick: () => setSelectedDay(node.data)
        },
        zIndex: node.type === 'transport' ? 1000 : undefined,
      };
    }
    if (node.type === 'hebergement') {
      return {
        ...node,
        data: {
          ...node.data,
          onClick: (e?: React.MouseEvent) => {
            e?.stopPropagation();
            e?.preventDefault();
            setSelectedHebergement(node.data);
          }
        },
      };
    }
    return node;
  });

  // Si en cours de chargement, afficher le loading dans la zone du graphique
  if (isLoading) {
    return (
      <div className="h-full w-full relative bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6 max-w-md px-8 py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
          {/* Logo */}
          <div className="h-24 w-24 rounded-full border-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center p-4">
            <img src="/logo.png" alt="Morocco Chrono Grid" className="w-full h-full object-contain" />
          </div>

          {/* Title with animation */}
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight animate-pulse">
            Designing your trip...
          </h2>

          {/* Suggestions */}
          <div className="space-y-3 text-center text-sm">
            <p className="text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              Modify anything to make it more you
            </p>
            <p className="text-slate-900 dark:text-slate-100 font-medium animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              Add hidden gems, not tourist traps
            </p>
            <p className="text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
              Download itinerary pdf
            </p>
            <p className="text-slate-400 dark:text-slate-500 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
              Share with your companions
            </p>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2 pt-4">
            <div className="w-2 h-2 bg-amber-900 dark:bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-amber-900 dark:bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 bg-amber-900 dark:bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {/* Info Legend - Collapsible */}
      <Collapsible
        open={isLegendOpen}
        onOpenChange={setIsLegendOpen}
        className="absolute top-6 left-6 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl max-w-xs"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-4 hover:bg-amber-100/20 dark:hover:bg-amber-900/20 rounded-t-2xl flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-900 dark:text-amber-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Your Journey Map
              </h3>
            </div>
            {isLegendOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-900 dark:text-slate-100" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="px-4 pb-4">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-2">
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 bg-gradient-to-br from-amber-900 to-amber-800 rounded border-2 border-amber-950"></span>
                City 
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded border-2 border-slate-200 dark:border-slate-700"></span>
                Day (uniform width)
              </p>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-2 space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-900 dark:bg-amber-400 rounded-full"></span>
                Main route
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-amber-600 dark:bg-amber-500 rounded-full border border-amber-600 dark:border-amber-500"></span>
                Alt route
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-500 rounded-full border-2 border-white dark:border-slate-900 shadow-md"></span>
                🚗 Transport (click)
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gradient-to-br from-amber-700 to-amber-600 dark:from-amber-500 dark:to-amber-400 rounded-full border-2 border-white dark:border-slate-900 shadow-md"></span>
                🏨 Hébergement (click)
              </p>
            </div>
            <p className="mt-3 text-[10px] border-t border-slate-200 dark:border-slate-700 pt-2 text-slate-600 dark:text-slate-400">💡 Click locations • Transport • Hébergement</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <ReactFlow
        nodes={enrichedNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        fitView
        fitViewOptions={{ padding: 0.12, maxZoom: 0.75, minZoom: 0.2, includeHiddenNodes: false }}
        className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        elevateNodesOnSelect={true}
      >
        <Background 
          gap={24} 
          color="rgb(226 232 240)" 
          size={1.5}
          className="opacity-50 dark:opacity-30" 
        />
        <Controls 
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-xl m-4"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Drawer/Sheet pour les détails des emplacements */}
      <Sheet open={Boolean(selectedDay)} onOpenChange={() => setSelectedDay(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
          {selectedDay && (
            <div className="animate-fade-in">
              {/* Image en plein */}
              <div className="relative -mx-6 -mt-6 mb-6 animate-fade-in-up">
                <img 
                  src={selectedDay.imageUrl} 
                  alt={selectedDay.titre}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Bouton fermer */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/95 hover:bg-white rounded-full shadow-lg"
                  onClick={() => setSelectedDay(null)}
                >
                  <X className="w-4 h-4" />
                </Button>

                {/* Type badge */}
                {selectedDay.type && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-900/90 dark:bg-amber-400/90 backdrop-blur-sm rounded-full shadow-lg">
                    <span className="text-xs font-bold text-white dark:text-slate-900 uppercase tracking-wider">{selectedDay.type}</span>
                  </div>
                )}
              </div>

              <SheetHeader className="space-y-3 animate-fade-in-up delay-100">
                <SheetTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {selectedDay.titre}
                </SheetTitle>
                {selectedDay.heure && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-100/30 dark:bg-amber-900/30 rounded-lg w-fit">
                    <Clock className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selectedDay.heure}</span>
                  </div>
                )}
              </SheetHeader>

              {/* Description */}
              {selectedDay.description && (
                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in-up delay-200">
                  <p className="text-base text-slate-900 dark:text-slate-100 leading-relaxed">
                    {selectedDay.description}
                  </p>
                </div>
              )}

              {/* Moyens de Transport Disponibles */}
              {selectedDay.transportOptions && selectedDay.transportOptions.length > 0 && (
                <div className="mt-8 animate-fade-in-up delay-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-amber-900 dark:bg-amber-400"></div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Moyens de Transport Disponibles
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {selectedDay.transportOptions.map((transport: any, index: number) => {
                      const getTransportIcon = (icon: string) => {
                        switch (icon) {
                          case 'train': return <Train className="w-5 h-5" />;
                          case 'bus': return <Bus className="w-5 h-5" />;
                          case 'car': return <Car className="w-5 h-5" />;
                          case 'plane': return <Plane className="w-5 h-5" />;
                          default: return <Car className="w-5 h-5" />;
                        }
                      };

                      const getComfortStars = (comfort: string) => {
                        switch (comfort) {
                          case 'high': return 3;
                          case 'medium': return 2;
                          case 'low': return 1;
                          default: return 2;
                        }
                      };

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            transport.recommended
                              ? 'border-amber-900 dark:border-amber-400 bg-amber-900/5 dark:bg-amber-400/5 shadow-md'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-900/50 dark:hover:border-amber-400/50'
                          }`}
                        >
                          {/* Header avec icône et nom */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                transport.recommended ? 'bg-amber-900 dark:bg-amber-400' : 'bg-amber-100 dark:bg-amber-900/30'
                              }`}>
                                <div className={transport.recommended ? 'text-white dark:text-slate-900' : 'text-slate-900 dark:text-slate-100'}>
                                  {getTransportIcon(transport.icon)}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                                  {transport.name}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  {transport.frequency}
                                </p>
                              </div>
                            </div>
                            {transport.recommended && (
                              <Badge className="bg-amber-900 dark:bg-amber-400 hover:bg-amber-800 dark:hover:bg-amber-500 text-white dark:text-slate-900 text-xs">
                                Recommandé
                              </Badge>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                            {transport.description}
                          </p>

                          {/* Détails en grille */}
                          <div className="grid grid-cols-3 gap-3">
                            {/* Durée */}
                            <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                              <Timer className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Durée</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  {transport.duration}
                                </p>
                              </div>
                            </div>

                            {/* Prix */}
                            <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                              <DollarSign className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Prix</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  {transport.price}
                                </p>
                              </div>
                            </div>

                            {/* Confort */}
                            <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                              <Star className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Confort</p>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: getComfortStars(transport.comfort) }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-400 dark:fill-amber-500 text-amber-400 dark:text-amber-500" />
                                  ))}
                                  {Array.from({ length: 3 - getComfortStars(transport.comfort) }).map((_, i) => (
                                    <Star key={i + getComfortStars(transport.comfort)} className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Liste d'activités */}
              {selectedDay.activites && selectedDay.activites.length > 0 && (
                <div className="mt-8 animate-fade-in-up delay-400">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-amber-900 dark:bg-amber-400"></div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      À découvrir en route
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedDay.activites.map((activite: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-900 dark:hover:border-amber-400 transition-colors">
                        <div className="p-1 bg-amber-900 dark:bg-amber-400 rounded-lg mt-0.5">
                          <Check className="w-3.5 h-3.5 text-white dark:text-slate-900" />
                        </div>
                        <span className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed flex-1">
                          {activite}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ressources */}
              {selectedDay.resources && selectedDay.resources.length > 0 && (
                <div className="mt-8 animate-fade-in-up delay-500">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-amber-900 dark:bg-amber-400"></div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Resources
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedDay.resources.map((resource: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-100/10 dark:hover:bg-amber-900/10 transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-900 dark:bg-amber-400 text-white dark:text-slate-900">
                          {resource.type}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {resource.title}
                          </p>
                          {resource.url && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
                              {resource.url}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Drawer/Sheet pour les détails des hébergements */}
      <Sheet open={Boolean(selectedHebergement)} onOpenChange={() => setSelectedHebergement(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
          {selectedHebergement && (
            <div className="animate-fade-in">
              {/* Image en plein */}
              {selectedHebergement.imageUrl && (
                <div className="relative -mx-6 -mt-6 mb-6 animate-fade-in-up">
                  <img 
                    src={selectedHebergement.imageUrl} 
                    alt={selectedHebergement.nom}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Bouton fermer */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/95 hover:bg-white rounded-full shadow-lg"
                    onClick={() => setSelectedHebergement(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  {/* Type badge */}
                  {selectedHebergement.type && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-900/90 dark:bg-amber-400/90 backdrop-blur-sm rounded-full shadow-lg">
                      <span className="text-xs font-bold text-white dark:text-slate-900 uppercase tracking-wider">{selectedHebergement.type}</span>
                    </div>
                  )}
                </div>
              )}

              <SheetHeader className="space-y-3 animate-fade-in-up delay-100">
                <SheetTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight flex items-center gap-2">
                  <Hotel className="w-6 h-6 text-amber-900 dark:text-amber-400" />
                  {selectedHebergement.nom}
                </SheetTitle>
              </SheetHeader>

              {/* Étoiles et Prix */}
              <div className="flex items-center justify-between mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 animate-fade-in-up delay-200">
                <div className="flex items-center gap-1">
                  {Array.from({ length: Number(selectedHebergement.categorie?.match(/\d+/)?.[0] || 3) }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 dark:fill-amber-500 text-amber-400 dark:text-amber-500" />
                  ))}
                  <span className="ml-2 text-slate-600 dark:text-slate-400">{selectedHebergement.categorie}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-900 dark:text-amber-400">{selectedHebergement.prix_nuit}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">par nuit</div>
                </div>
              </div>

              {/* Description */}
              {selectedHebergement.description && (
                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in-up delay-300">
                  <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Description</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{selectedHebergement.description}</p>
                </div>
              )}

              {/* Adresse */}
              {selectedHebergement.adresse && (
                <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 animate-fade-in-up delay-400">
                  <h3 className="font-semibold text-sm mb-1 text-slate-900 dark:text-slate-100">📍 Adresse</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{selectedHebergement.adresse}</p>
                </div>
              )}

              {/* Horaires */}
              <div className="grid grid-cols-2 gap-3 mt-6 animate-fade-in-up delay-500">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Check-in</h3>
                  </div>
                  <p className="text-amber-900 dark:text-amber-400 font-bold">{selectedHebergement.check_in}</p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-amber-900 dark:text-amber-400" />
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Check-out</h3>
                  </div>
                  <p className="text-amber-900 dark:text-amber-400 font-bold">{selectedHebergement.check_out}</p>
                </div>
              </div>

              {/* Équipements */}
              {selectedHebergement.equipements && selectedHebergement.equipements.length > 0 && (
                <div className="mt-6 animate-fade-in-up delay-600">
                  <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">✨ Équipements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHebergement.equipements.map((eq: string, i: number) => (
                      <span 
                        key={i} 
                        className="px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-sm"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              {selectedHebergement.contact && (
                <div className="mt-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 animate-fade-in-up delay-700">
                  <h3 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">📞 Contact</h3>
                  <div className="space-y-2 text-sm">
                    {selectedHebergement.contact.telephone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <a href={`tel:${selectedHebergement.contact.telephone}`} className="text-amber-900 dark:text-amber-400 hover:underline">
                          {selectedHebergement.contact.telephone}
                        </a>
                      </div>
                    )}
                    {selectedHebergement.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <a href={`mailto:${selectedHebergement.contact.email}`} className="text-amber-900 dark:text-amber-400 hover:underline">
                          {selectedHebergement.contact.email}
                        </a>
                      </div>
                    )}
                    {selectedHebergement.contact.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <a 
                          href={selectedHebergement.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-900 dark:text-amber-400 hover:underline"
                        >
                          Site web
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedHebergement.notes && (
                <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 animate-fade-in-up delay-800">
                  <h3 className="font-semibold text-sm mb-2 text-slate-900 dark:text-slate-100">💡 Notes</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{selectedHebergement.notes}</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TripGraph;
