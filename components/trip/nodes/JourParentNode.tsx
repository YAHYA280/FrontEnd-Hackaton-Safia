import { Handle, Position } from '@xyflow/react';
import { Calendar } from 'lucide-react';

interface JourParentNodeProps {
  data: {
    jourLabel: string;
  };
}

const JourParentNode = ({ data }: JourParentNodeProps) => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg p-5 min-w-[300px]">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-amber-200 dark:!bg-amber-700 border-2 border-white dark:border-slate-900 shadow" 
      />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-700 rounded-lg shadow-md">
          <Calendar className="w-4 h-4 text-amber-900 dark:text-amber-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            {data.jourLabel}
          </h3>
          <div className="h-0.5 w-16 bg-gradient-to-r from-amber-900 dark:from-amber-400 to-transparent rounded-full mt-1"></div>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-amber-200 dark:!bg-amber-700 border-2 border-white dark:border-slate-900 shadow" 
      />
    </div>
  );
};

export default JourParentNode;
