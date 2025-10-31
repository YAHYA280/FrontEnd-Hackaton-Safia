'use client';

import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Clock, MapPin } from 'lucide-react';

interface EmplacementData {
  titre: string;
  imageUrl: string;
  heure?: string;
  type?: string;
  onClick?: () => void;
}

const EmplacementNode = ({ data }: NodeProps) => {
  const nodeData = data as unknown as EmplacementData;

  const handleClick = () => {
    if (nodeData.onClick && typeof nodeData.onClick === 'function') {
      nodeData.onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-[220px] rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={nodeData.imageUrl}
          alt={nodeData.titre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {nodeData.type && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-amber-900/90 dark:bg-amber-700/90 backdrop-blur-sm rounded-lg">
            <span className="text-[10px] font-bold text-white uppercase">{nodeData.type}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
          {nodeData.titre}
        </h4>

        {nodeData.heure && (
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{nodeData.heure}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(EmplacementNode);
