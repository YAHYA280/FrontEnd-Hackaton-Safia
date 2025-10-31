"use client";

import { Zap, Coffee, CloudSun } from "lucide-react";

interface RythmeStyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const RYTHME_STYLES = [
  { name: "Intensif", icon: Zap, description: "Action-packed, fast-paced adventures" },
  { name: "Modéré", icon: Coffee, description: "Balanced mix of activities and rest" },
  { name: "Détendu", icon: CloudSun, description: "Relaxed, leisurely pace" },
];

export default function RythmeStyleSelector({
  selectedStyle,
  onStyleChange,
}: RythmeStyleSelectorProps) {
  const isSelected = (style: string) => style === selectedStyle;

  return (
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-4">
        Rythme Style
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {RYTHME_STYLES.map(({ name, icon: Icon, description }) => (
          <button
            key={name}
            onClick={() => onStyleChange(name)}
            className={`
              flex flex-col items-center p-6 rounded-xl transition-all cursor-pointer hover:scale-105
              ${
                isSelected(name)
                  ? "bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-900 dark:border-amber-400 shadow-md"
                  : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-900/40"
              }
            `}
          >
            <Icon
              className={`w-12 h-12 mb-3 ${
                isSelected(name)
                  ? "text-amber-900 dark:text-amber-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            />
            <span
              className={`font-bold text-base mb-1 ${
                isSelected(name)
                  ? "text-amber-900 dark:text-amber-400"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {name}
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400 text-center">
              {description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
