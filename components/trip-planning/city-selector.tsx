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
    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
        Where to?
      </h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary transition-colors text-gray-800 dark:text-gray-200"
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
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredCities.map((city) => (
              <button
                key={city}
                onClick={() => handleAddCity(city)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
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
              className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 dark:bg-primary/30 pl-4 pr-3 text-primary dark:text-orange-300 hover:bg-primary/30 transition-colors"
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
