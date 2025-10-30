"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CitySelectorProps {
  selectedCities: string[];
  onCitiesChange: (cities: string[]) => void;
}

const MOROCCAN_CITIES = [
  "Casablanca",
  "Marrakech",
  "Fes",
  "Tangier",
  "Agadir",
  "Rabat",
  "Meknes",
  "Chefchaouen",
  "Essaouira",
  "Ouarzazate",
];

export default function CitySelector({
  selectedCities,
  onCitiesChange,
}: CitySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCities = MOROCCAN_CITIES.filter(
    (city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedCities.includes(city)
  );

  const handleAddCity = (city: string) => {
    if (!selectedCities.includes(city)) {
      onCitiesChange([...selectedCities, city]);
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleRemoveCity = (cityToRemove: string) => {
    onCitiesChange(selectedCities.filter((city) => city !== cityToRemove));
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
        Where to?
      </h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
        <Input
          className="w-full pl-10 pr-4 py-2.5 bg-white/90 dark:bg-slate-800/90 border-2 border-slate-300/60 dark:border-slate-600/60 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground shadow-sm"
          placeholder="Select cities..."
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && searchTerm && filteredCities.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border-2 border-slate-300/60 dark:border-slate-600/60 rounded-lg shadow-xl max-h-48 overflow-y-auto">
            {filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => handleAddCity(city)}
                className="w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors border-b border-slate-200 dark:border-slate-700 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Cities */}
      {selectedCities.length > 0 && (
        <div className="flex gap-3 p-3 flex-wrap -ml-3">
          {selectedCities.map((city) => (
            <button
              key={city}
              onClick={() => handleRemoveCity(city)}
              className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/10 border-2 border-primary/50 pl-4 pr-3 text-primary hover:bg-primary/20 hover:border-primary transition-all hover:scale-105 shadow-sm"
            >
              <p className="text-sm font-medium leading-normal">{city}</p>
              <X className="w-4 h-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
