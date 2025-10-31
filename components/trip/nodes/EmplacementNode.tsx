import { Handle, Position } from '@xyflow/react';
import { MapPin, Clock, Coffee, UtensilsCrossed, Moon, Hotel } from 'lucide-react';

interface EmplacementNodeProps {
  data: {
    titre: string;
    imageUrl: string;
    heure?: string;
    onClick?: () => void;
    categorie_repas?: 'petit_dejeuner' | 'dejeuner' | 'diner';
    lieu_hebergement?: boolean;
  };
}

// Helper fonctions pour les restaurants
const getRepasIcon = (categorie?: string) => {
  switch (categorie) {
    case 'petit_dejeuner':
      return <Coffee className="w-3 h-3" />;
    case 'dejeuner':
      return <UtensilsCrossed className="w-3 h-3" />;
    case 'diner':
      return <Moon className="w-3 h-3" />;
    default:
      return null;
  }
};

const getRepasBadgeColor = (categorie?: string) => {
  switch (categorie) {
    case 'petit_dejeuner':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700';
    case 'dejeuner':
      return 'bg-amber-200 dark:bg-amber-800/30 text-amber-950 dark:text-amber-200 border-amber-400 dark:border-amber-600';
    case 'diner':
      return 'bg-amber-300 dark:bg-amber-700/30 text-amber-950 dark:text-amber-100 border-amber-500 dark:border-amber-500';
    default:
      return '';
  }
};

const getRepasLabel = (categorie?: string) => {
  switch (categorie) {
    case 'petit_dejeuner':
      return 'Petit-déj';
    case 'dejeuner':
      return 'Déjeuner';
    case 'diner':
      return 'Dîner';
    default:
      return '';
  }
};

const EmplacementNode = ({ data }: EmplacementNodeProps) => {
  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-amber-900 dark:!bg-amber-400 border-2 border-white dark:border-slate-900 shadow-sm" 
      />
      
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-amber-900 dark:hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden w-[220px]"
        onClick={data.onClick}
      >
        {/* Image with overlay gradient */}
        <div className="relative h-28 overflow-hidden">
          <img 
            src={data.imageUrl} 
            alt={data.titre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Time badge on image */}
          {data.heure && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full flex items-center gap-1 shadow-md">
              <Clock className="w-3 h-3 text-amber-900 dark:text-amber-400" />
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{data.heure}</span>
            </div>
          )}
          
          {/* Badge catégorie repas (en haut à gauche) */}
          {data.categorie_repas && (
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold border-2 shadow-md ${getRepasBadgeColor(data.categorie_repas)}`}>
              {getRepasIcon(data.categorie_repas)}
              <span>{getRepasLabel(data.categorie_repas)}</span>
            </div>
          )}
          
          {/* Badge si restaurant dans hébergement (en bas à droite) */}
          {data.lieu_hebergement && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-amber-700 dark:bg-amber-500 text-white dark:text-slate-900 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
              <Hotel className="w-3 h-3" />
              <span>Au riad</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-2">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-amber-900 dark:text-amber-400" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight flex-1">
              {data.titre}
            </p>
          </div>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-amber-900 dark:!bg-amber-400 border-2 border-white dark:border-slate-900 shadow-sm" 
      />
    </div>
  );
};

export default EmplacementNode;
