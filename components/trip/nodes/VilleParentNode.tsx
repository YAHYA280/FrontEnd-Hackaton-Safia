'use client';

import { memo } from 'react';
import { NodeProps } from '@xyflow/react';

interface VilleData {
  ville: string;
}

const VilleParentNode = ({ data }: NodeProps) => {
  const nodeData = data as unknown as VilleData;
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 dark:from-amber-700 dark:via-amber-600 dark:to-amber-700 border-4 border-amber-950 dark:border-amber-800 shadow-2xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full bg-amber-50 dark:bg-amber-100 animate-pulse"></div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
          {nodeData.ville}
        </h2>
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
        <span className="text-xs font-semibold text-white uppercase">City</span>
      </div>
    </div>
  );
};

export default memo(VilleParentNode);
