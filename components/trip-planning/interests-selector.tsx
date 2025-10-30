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
    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
        Your Interests
      </h2>

      <div className="flex flex-wrap gap-3">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => handleInterestToggle(interest)}
            className={`
              flex h-10 items-center justify-center gap-x-2 rounded-full px-5 transition-all
              ${
                isSelected(interest)
                  ? "border-2 border-primary bg-primary text-white"
                  : "border border-gray-300 dark:border-gray-600 bg-transparent hover:border-primary hover:bg-primary/10"
              }
            `}
          >
            <p
              className={`text-sm font-medium ${
                isSelected(interest)
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
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
