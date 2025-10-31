'use client';

import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { Car, Clock } from 'lucide-react';

const TransportNode = ({ data }: NodeProps) => {
  const handleClick = () => {
    if (data.onClick) {
      data.onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 dark:from-amber-700 dark:via-amber-600 dark:to-amber-700 border-4 border-white dark:border-slate-900 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center"
      title={data.titre}
    >
      <Car className="w-8 h-8 text-white" />
    </div>
  );
};

export default memo(TransportNode);
