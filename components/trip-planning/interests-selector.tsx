"use client";

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const INTERESTS = [
  "Music",
  "Football",
  "Art",
  "Gastronomy",
  "Nature",
  "Culture",
  "Adventure",
  "Luxury",
  "Family",
];

export default function InterestsSelector({
  selectedInterests,
  onInterestsChange,
}: InterestsSelectorProps) {
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter((i) => i !== interest));
    } else {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  const isSelected = (interest: string) => {
    return selectedInterests.includes(interest);
  };

  return (
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-4">
        Your Interests
      </h2>

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
      </div>
    </div>
  );
}
