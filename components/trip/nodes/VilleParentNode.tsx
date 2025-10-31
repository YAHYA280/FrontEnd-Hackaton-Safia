import { Handle, Position } from '@xyflow/react';
import { MapPin } from 'lucide-react';

interface VilleParentNodeProps {
  data: {
    ville: string;
  };
}

const VilleParentNode = ({ data }: VilleParentNodeProps) => {
  return (
    <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 dark:from-amber-400 dark:via-amber-500 dark:to-amber-400 rounded-3xl border-3 border-amber-950 dark:border-amber-300 p-8 min-w-[1000px] shadow-2xl">
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-4 h-4 !bg-white dark:!bg-slate-900 border-2 border-amber-900 dark:border-amber-400 shadow-md" 
      />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
          <MapPin className="w-8 h-8 text-amber-900 dark:text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white dark:text-slate-900 uppercase tracking-widest bg-white/20 dark:bg-slate-900/20 px-3 py-1 rounded-full">City</span>
          </div>
          <h2 className="text-4xl font-bold text-white dark:text-slate-900 tracking-tight mt-1 drop-shadow-md">{data.ville}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-300 dark:from-amber-600 to-transparent rounded-full mt-2"></div>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-4 h-4 !bg-white dark:!bg-slate-900 border-2 border-amber-900 dark:border-amber-400 shadow-md" 
      />
    </div>
  );
};

export default VilleParentNode;
