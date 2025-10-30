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
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
        Your Interests
      </h2>

      <div className="flex flex-wrap gap-3">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => handleInterestToggle(interest)}
            className={`
              flex h-10 items-center justify-center gap-x-2 rounded-full px-5 transition-all hover:scale-105 shadow-sm
              ${
                isSelected(interest)
                  ? "border-2 border-primary bg-primary text-white shadow-lg"
                  : "bg-white/80 dark:bg-slate-800/80 border-2 border-slate-300/60 dark:border-slate-600/60 hover:border-primary/70 hover:bg-white/90 dark:hover:bg-slate-800/90"
              }
            `}
          >
            <p
              className={`text-sm font-medium ${
                isSelected(interest)
                  ? "text-white"
                  : "text-foreground"
              }`}
            >
              {interest}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
