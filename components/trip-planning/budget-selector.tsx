"use client";

import { useState, useEffect } from "react";

interface BudgetSelectorProps {
  budgetRange: { min: number; max: number };
  onBudgetChange: (range: { min: number; max: number }) => void;
}

const MIN_BUDGET = 1000;
const MAX_BUDGET = 50000;

export default function BudgetSelector({
  budgetRange,
  onBudgetChange,
}: BudgetSelectorProps) {
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(60);

  useEffect(() => {
    const newMin = (minPercent / 100) * (MAX_BUDGET - MIN_BUDGET) + MIN_BUDGET;
    const newMax = (maxPercent / 100) * (MAX_BUDGET - MIN_BUDGET) + MIN_BUDGET;
    onBudgetChange({
      min: Math.round(newMin),
      max: Math.round(newMax),
    });
  }, [minPercent, maxPercent]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < maxPercent - 5) {
      setMinPercent(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > minPercent + 5) {
      setMaxPercent(value);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount >= MAX_BUDGET
      ? `${MAX_BUDGET.toLocaleString()}+`
      : amount.toLocaleString();
  };

  return (
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-1">
        Your Budget
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Set your budget range in MAD
      </p>

      <div className="flex justify-between items-center text-slate-900 dark:text-slate-100 font-semibold text-lg mb-4">
        <span className="text-amber-900 dark:text-amber-400">
          {formatCurrency(budgetRange.min)} MAD
        </span>
        <span className="text-amber-900 dark:text-amber-400">
          {formatCurrency(budgetRange.max)} MAD
        </span>
      </div>

      <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-8">
        {/* Active Range */}
        <div
          className="absolute h-2 rounded-full bg-amber-900 dark:bg-amber-600"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={minPercent}
          onChange={handleMinChange}
          className="absolute w-full h-2 -top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-900 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-amber-900 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer"
        />

        {/* Max Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={maxPercent}
          onChange={handleMaxChange}
          className="absolute w-full h-2 -top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-900 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-amber-900 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
