import { Handle, Position } from '@xyflow/react';
import { Hotel } from 'lucide-react';

interface HebergementNodeProps {
  data: {
    nom: string;
    type: string;
    categorie: string;
    imageUrl?: string;
    adresse?: string;
    description: string;
    equipements: string[];
    prix_nuit: string;
    check_in: string;
    check_out: string;
    contact?: {
      telephone?: string;
      email?: string;
      website?: string;
    };
    notes?: string;
    onClick?: (e?: React.MouseEvent) => void;
  };
}

export function HebergementNode({ data }: HebergementNodeProps) {
  return (
    <div className="relative" style={{ zIndex: 1000 }}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-amber-700 dark:!bg-amber-500 border-2 border-white dark:border-slate-900 shadow-sm" 
      />
      
      {/* Icône simple comme le transport */}
      <div 
        className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-600 dark:from-amber-500 dark:to-amber-400 border-4 border-white dark:border-slate-900 shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (data.onClick) {
            data.onClick(e);
          }
        }}
        onMouseDown={(e) => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        <Hotel className="w-8 h-8 text-white dark:text-slate-900 animate-pulse" />
        
        {/* Tooltip on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div className="bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-slate-700 dark:border-slate-600">
            🏨 Hébergement
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
          </div>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-amber-700 dark:!bg-amber-500 border-2 border-white dark:border-slate-900 shadow-sm" 
      />
    </div>
  );
}

