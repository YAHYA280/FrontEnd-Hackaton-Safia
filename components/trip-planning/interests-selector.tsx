"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const INTERESTS = [
  "Music",
  "Art",
  "Family",
  "Adventure",
  "Culture",
  "Food",
  "Nature",
  "History",
  "Photography",
  "Shopping",
  "Sports",
  "Wellness",
  "Architecture",
  "Beach",
  "Mountains",
  "Desert",
  "Nightlife",
  "Local Markets",
];

export default function InterestsSelector({
  selectedInterests,
  onInterestsChange,
}: InterestsSelectorProps) {
  const [customInterest, setCustomInterest] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter((i) => i !== interest));
    } else {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      onInterestsChange([...selectedInterests, customInterest.trim()]);
      setCustomInterest("");
      setShowCustomInput(false);
    }
  };

  const handleRemoveCustomInterest = (interest: string) => {
    if (!INTERESTS.includes(interest)) {
      onInterestsChange(selectedInterests.filter((i) => i !== interest));
    }
  };

  const isSelected = (interest: string) => {
    return selectedInterests.includes(interest);
  };

  const isPredefined = (interest: string) => {
    return INTERESTS.includes(interest);
  };

  return (
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-4">
        Your Interests
      </h2>

      <div className="space-y-4">
        {/* Predefined Interests */}
        <div className="flex flex-wrap gap-3">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`
                flex items-center justify-center gap-x-2 rounded-full px-5 py-2.5 transition-all hover:scale-105 font-medium text-sm
                ${
                  isSelected(interest)
                    ? "bg-amber-900 dark:bg-amber-700 text-white shadow-md"
                    : "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-900/40 text-slate-900 dark:text-slate-100"
                }
              `}
            >
              {interest}
            </button>
          ))}

          {/* Other/Custom Button */}
          {!showCustomInput && (
            <button
              onClick={() => setShowCustomInput(true)}
              className="flex items-center justify-center gap-x-2 rounded-full px-5 py-2.5 transition-all hover:scale-105 font-medium text-sm bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-amber-900/40 text-slate-900 dark:text-slate-100"
            >
              <Plus className="w-4 h-4" />
              Other
            </button>
          )}
        </div>

        {/* Custom Interest Input */}
        {showCustomInput && (
          <div className="flex gap-2 animate-fade-in-up">
            <Input
              type="text"
              placeholder="Enter custom interest..."
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddCustomInterest();
                }
              }}
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900"
              autoFocus
            />
            <button
              onClick={handleAddCustomInterest}
              className="px-4 py-2 rounded-xl bg-amber-900 dark:bg-amber-700 text-white hover:bg-amber-800 dark:hover:bg-amber-600 transition-all"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomInterest("");
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Custom/Selected Interests with Remove Option */}
        {selectedInterests.filter(i => !isPredefined(i)).length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-medium">Custom Interests:</p>
            <div className="flex flex-wrap gap-2">
              {selectedInterests
                .filter(i => !isPredefined(i))
                .map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleRemoveCustomInterest(interest)}
                    className="flex items-center gap-2 rounded-full px-4 py-2 bg-amber-900 dark:bg-amber-700 text-white shadow-md hover:bg-amber-800 dark:hover:bg-amber-600 transition-all text-sm font-medium"
                  >
                    {interest}
                    <X className="w-3 h-3" />
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
