'use client';

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
import { Check, X, Clock, ChevronDown, ChevronUp, Info, Train, Bus, Car, Plane, DollarSign, Timer, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { VoyageData, GraphConfig } from '@/types/voyage.types';

// Define nodeTypes outside component to prevent re-creation on every render
const nodeTypes = {
  villeParent: VilleParentNode,
  jourParent: JourParentNode,
  emplacement: EmplacementNode,
  transport: TransportNode,
};

interface TripGraphProps {
  voyageData: VoyageData;
  config?: GraphConfig;
}

const TripGraph = ({ voyageData, config }: TripGraphProps) => {
  const [selectedDay, setSelectedDay] = useState<any>(null);
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

    // Calculer la largeur maximale pour uniformité
    let globalMaxEmplacements = 0;
    voyageData.villes.forEach((ville) => {
      ville.jours.forEach((jour) => {
        globalMaxEmplacements = Math.max(globalMaxEmplacements, jour.emplacements.length);
      });
    });

    const uniformDayWidth = (globalMaxEmplacements * emplacementWidth) + ((globalMaxEmplacements - 1) * emplacementSpacing) + dayPadding;
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
        const couleurTheme = jourIndex % 2 === 0 ? "gray" : "teal";

        const numEmplacements = jour.emplacements.length;
        const contentWidth = (numEmplacements * emplacementWidth) + ((numEmplacements - 1) * emplacementSpacing);
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

        // Créer les nœuds Emplacements
        const startX = (uniformDayWidth - contentWidth) / 2;
        jour.emplacements.forEach((emplacement, empIndex) => {
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
              resources: [],
            },
          });

          // Créer les edges entre emplacements
          if (empIndex > 0) {
            const prevEmplacement = jour.emplacements[empIndex - 1];
            edges.push({
              id: `e${edgeId++}`,
              source: prevEmplacement.id_emplacement,
              target: emplacement.id_emplacement,
              style: { stroke: "rgb(120 53 15)", strokeWidth: 3 },
              type: "smoothstep",
              animated: true,
            });
          }
        });

        // Edge entre le dernier emplacement d'un jour et le premier du jour suivant
        if (jourIndex < ville.jours.length - 1) {
          const lastEmplacement = jour.emplacements[jour.emplacements.length - 1];
          const nextJour = ville.jours[jourIndex + 1];
          const firstEmplacement = nextJour.emplacements[0];

          edges.push({
            id: `e${edgeId++}`,
            source: lastEmplacement.id_emplacement,
            target: firstEmplacement.id_emplacement,
            style: { stroke: "rgb(251 191 36)", strokeWidth: 2 },
            type: "smoothstep",
            animated: false,
          });
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
    return node;
  });

  return (
    <div
      className="h-full w-full relative"
      style={{
        backgroundImage: "url('/background1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/75 dark:bg-slate-900/80 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative h-full w-full">
      {/* Info Legend - Collapsible */}
      <Collapsible
        open={isLegendOpen}
        onOpenChange={setIsLegendOpen}
        className="absolute top-6 left-6 z-10 clean-card shadow-xl max-w-xs hover-lift"
      >
        <CollapsibleTrigger className="w-full p-4 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 rounded-t-2xl flex items-center justify-between gap-2 transition-all group">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
              <Info className="w-4 h-4 text-amber-900 dark:text-amber-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Journey Guide
            </h3>
          </div>
          {isLegendOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-amber-900 dark:group-hover:text-amber-600 transition-colors" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-amber-900 dark:group-hover:text-amber-600 transition-colors" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 pt-3">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="w-7 h-7 bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-700 dark:to-amber-600 rounded-lg border-2 border-amber-950 dark:border-amber-800 shadow-sm flex-shrink-0"></span>
                <span className="font-medium text-slate-900 dark:text-slate-100">City Container</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="w-7 h-7 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0"></span>
                <span className="font-medium text-slate-900 dark:text-slate-100">Day Schedule</span>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2.5">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="w-7 h-1 bg-amber-900 dark:bg-amber-600 rounded-full shadow-sm flex-shrink-0"></span>
                <span className="font-medium text-slate-900 dark:text-slate-100">Activity Route</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="w-7 h-1 bg-amber-100 dark:bg-amber-400 rounded-full border border-amber-200 dark:border-amber-500 flex-shrink-0"></span>
                <span className="font-medium text-slate-900 dark:text-slate-100">Day Connector</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="w-5 h-5 bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-700 dark:to-amber-600 rounded-full border-2 border-white dark:border-slate-900 shadow-md flex-shrink-0"></span>
                <span className="font-medium text-slate-900 dark:text-slate-100">Transport Node</span>
              </div>
            </div>
            <div className="mt-3 text-[11px] border-t border-slate-200 dark:border-slate-700 pt-3 px-2">
              <p className="text-amber-900 dark:text-amber-600 font-semibold">💡 Interactive Tip</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Click any location or transport node for detailed information</p>
            </div>
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
        className="bg-transparent"
        elevateNodesOnSelect={true}
      >
        <Background
          gap={24}
          color="rgb(226 232 240)"
          size={1.5}
          className="opacity-30 dark:opacity-20"
        />
        <Controls
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 rounded-xl shadow-xl m-4"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Drawer/Sheet pour les détails */}
      <Sheet open={Boolean(selectedDay)} onOpenChange={() => setSelectedDay(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {selectedDay && (
            <>
              {/* Image en plein */}
              <div className="relative -mx-6 -mt-6 mb-6">
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
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-900/90 dark:bg-amber-700/90 backdrop-blur-sm rounded-full shadow-lg">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{selectedDay.type}</span>
                  </div>
                )}
              </div>

              <SheetHeader className="space-y-3">
                <SheetTitle className="text-3xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {selectedDay.titre}
                </SheetTitle>
                {selectedDay.heure && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-amber-50/50 dark:bg-amber-900/30 rounded-lg w-fit">
                    <Clock className="w-4 h-4 text-amber-900 dark:text-amber-600" />
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selectedDay.heure}</span>
                  </div>
                )}
              </SheetHeader>

              {/* Description */}
              {selectedDay.description && (
                <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <p className="text-base text-slate-900 dark:text-slate-100 leading-relaxed">
                    {selectedDay.description}
                  </p>
                </div>
              )}

              {/* Moyens de Transport Disponibles */}
              {selectedDay.transportOptions && selectedDay.transportOptions.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-amber-900 dark:bg-amber-600"></div>
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
                              ? 'border-amber-900 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/10 shadow-md'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-900/50 dark:hover:border-amber-700/50'
                          }`}
                        >
                          {/* Header avec icône et nom */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                transport.recommended ? 'bg-amber-900 dark:bg-amber-700' : 'bg-amber-50 dark:bg-amber-900/20'
                              }`}>
                                <div className={transport.recommended ? 'text-white' : 'text-slate-900 dark:text-slate-100'}>
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
                              <Badge className="bg-amber-900 dark:bg-amber-700 hover:bg-amber-800 dark:hover:bg-amber-600 text-white text-xs">
                                Recommandé
                              </Badge>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            {transport.description}
                          </p>

                          {/* Détails en grille */}
                          <div className="grid grid-cols-3 gap-3">
                            {/* Durée */}
                            <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg border border-slate-200 dark:border-slate-600">
                              <Timer className="w-4 h-4 text-amber-900 dark:text-amber-600" />
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Durée</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  {transport.duration}
                                </p>
                              </div>
                            </div>

                            {/* Prix */}
                            <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg border border-slate-200 dark:border-slate-600">
                              <DollarSign className="w-4 h-4 text-amber-900 dark:text-amber-600" />
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Prix</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                  {transport.price}
                                </p>
                              </div>
                            </div>

                            {/* Confort */}
                            <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-700/80 rounded-lg border border-slate-200 dark:border-slate-600">
                              <Star className="w-4 h-4 text-amber-900 dark:text-amber-600" />
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Confort</p>
                                <div className="flex gap-0.5">
                                  {Array.from({ length: getComfortStars(transport.comfort) }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-100 dark:fill-amber-400 text-amber-100 dark:text-amber-400" />
                                  ))}
                                  {Array.from({ length: 3 - getComfortStars(transport.comfort) }).map((_, i) => (
                                    <Star key={i + getComfortStars(transport.comfort)} className="w-3 h-3 text-slate-200 dark:text-slate-700" />
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
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-amber-900 dark:bg-amber-600"></div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      À découvrir en route
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedDay.activites.map((activite: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-900 dark:hover:border-amber-700 transition-colors">
                        <div className="p-1 bg-amber-900 dark:bg-amber-700 rounded-lg mt-0.5">
                          <Check className="w-3.5 h-3.5 text-white" />
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
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-1 rounded-full bg-amber-900 dark:bg-amber-600"></div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Resources
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedDay.resources.map((resource: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-colors cursor-pointer"
                      >
                        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-900 dark:bg-amber-700 text-white">
                          {resource.type}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {resource.title}
                          </p>
                          {resource.url && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                              {resource.url}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
      </div>
    </div>
  );
};

export default TripGraph;
