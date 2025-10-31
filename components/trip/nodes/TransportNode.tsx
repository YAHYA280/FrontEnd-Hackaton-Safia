import { Handle, Position } from '@xyflow/react';
import { ArrowRight } from 'lucide-react';

interface TransportNodeProps {
  data: {
    titre: string;
    onClick?: () => void;
  };
}

const TransportNode = ({ data }: TransportNodeProps) => {
  return (
    <div className="relative" style={{ zIndex: 1000 }}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-amber-900 dark:!bg-amber-400 border-2 border-white dark:border-slate-900 shadow-sm" 
      />
      
      <div 
        className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-900 to-amber-800 dark:from-amber-400 dark:to-amber-500 border-4 border-white dark:border-slate-900 shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        onClick={data.onClick}
      >
        <ArrowRight className="w-8 h-8 text-white dark:text-slate-900 animate-pulse" />
        
        {/* Tooltip on hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-slate-700 dark:border-slate-600">
            🚗 Transport
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
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

export default TransportNode;

