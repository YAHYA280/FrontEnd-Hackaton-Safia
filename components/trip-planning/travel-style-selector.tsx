"use client";

import { Footprints, Building2, Diamond, Users, User } from "lucide-react";

interface TravelStyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const TRAVEL_STYLES = [
  { name: "Adventure", icon: Footprints },
  { name: "Cultural", icon: Building2 },
  { name: "Luxury", icon: Diamond },
  { name: "Family", icon: Users },
  { name: "Solo", icon: User },
];

export default function TravelStyleSelector({
  selectedStyle,
  onStyleChange,
}: TravelStyleSelectorProps) {
  const isSelected = (style: string) => style === selectedStyle;

  return (
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-4">
        Travel Style
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {TRAVEL_STYLES.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onStyleChange(name)}
            className={`
              flex flex-col items-center p-5 rounded-xl transition-all cursor-pointer hover:scale-105
              ${
                isSelected(name)
                  ? "bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-900 dark:border-amber-400 shadow-md"
                  : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-900/40"
              }
            `}
          >
            <Icon
              className={`w-10 h-10 mb-2 ${
                isSelected(name)
                  ? "text-amber-900 dark:text-amber-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            />
            <span
              className={`font-medium text-sm ${
                isSelected(name)
                  ? "text-amber-900 dark:text-amber-400 font-semibold"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
