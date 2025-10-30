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
    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
        Travel Style
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {TRAVEL_STYLES.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onStyleChange(name)}
            className={`
              flex flex-col items-center p-4 rounded-lg transition-all cursor-pointer
              ${
                isSelected(name)
                  ? "border-2 border-primary bg-primary/10 dark:bg-primary/20"
                  : "border border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10"
              }
            `}
          >
            <Icon
              className={`w-10 h-10 mb-2 ${
                isSelected(name)
                  ? "text-primary"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
            <span
              className={`font-medium ${
                isSelected(name)
                  ? "text-primary dark:text-orange-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
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
