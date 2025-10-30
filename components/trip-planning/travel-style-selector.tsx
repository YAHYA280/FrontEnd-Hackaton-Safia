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
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
        Travel Style
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {TRAVEL_STYLES.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onStyleChange(name)}
            className={`
              flex flex-col items-center p-4 rounded-xl transition-all cursor-pointer hover:scale-105 shadow-sm
              ${
                isSelected(name)
                  ? "border-2 border-primary bg-primary/10 shadow-lg"
                  : "bg-white/80 dark:bg-slate-800/80 border-2 border-slate-300/60 dark:border-slate-600/60 hover:border-primary/70 hover:bg-white/90 dark:hover:bg-slate-800/90"
              }
            `}
          >
            <Icon
              className={`w-10 h-10 mb-2 ${
                isSelected(name)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            />
            <span
              className={`font-medium ${
                isSelected(name)
                  ? "text-primary font-semibold"
                  : "text-foreground"
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
