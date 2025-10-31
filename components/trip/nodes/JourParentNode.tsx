'use client';

import { memo } from 'react';
import { NodeProps } from '@xyflow/react';

interface JourData {
  jourLabel: string;
}

const JourParentNode = ({ data }: NodeProps) => {
  const nodeData = data as unknown as JourData;
  return (
    <div className="w-full h-full rounded-xl bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-amber-900 dark:bg-amber-600"></div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          {nodeData.jourLabel}
        </h3>
      </div>
    </div>
  );
};

export default memo(JourParentNode);
