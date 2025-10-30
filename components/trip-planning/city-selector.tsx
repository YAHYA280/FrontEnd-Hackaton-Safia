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
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-4">
        Where to?
      </h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
        <Input
          className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          placeholder="Search cities..."
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
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => handleAddCity(city)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Cities */}
      {selectedCities.length > 0 && (
        <div className="flex gap-3 flex-wrap mt-4">
          {selectedCities.map((city) => (
            <button
              key={city}
              onClick={() => handleRemoveCity(city)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-900/20 dark:border-amber-400/20 text-amber-900 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all hover:scale-105"
            >
              <span className="text-sm font-medium">{city}</span>
              <X className="w-4 h-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
