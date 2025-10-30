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
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-1">
        Your Budget (in MAD)
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Drag the sliders to set your range.
      </p>

      <div className="flex justify-between items-center text-foreground font-semibold text-lg mb-4">
        <span>{formatCurrency(budgetRange.min)}</span>
        <span>{formatCurrency(budgetRange.max)}</span>
      </div>

      <div className="relative h-2 rounded-full bg-slate-300/70 dark:bg-slate-700/70 border border-slate-400/40 dark:border-slate-600/40 mb-8 shadow-inner">
        {/* Active Range */}
        <div
          className="absolute h-2 rounded-full bg-primary shadow-sm"
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
          className="absolute w-full h-2 -top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer"
        />

        {/* Max Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={maxPercent}
          onChange={handleMaxChange}
          className="absolute w-full h-2 -top-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
