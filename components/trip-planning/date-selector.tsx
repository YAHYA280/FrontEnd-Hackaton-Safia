"use client";

import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateSelectorProps {
  dates: { start: string; end: string };
  onDatesChange: (dates: { start: string; end: string }) => void;
}

export default function DateSelector({
  dates,
  onDatesChange,
}: DateSelectorProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDatesChange({ ...dates, start: e.target.value });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDatesChange({ ...dates, end: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-5">
        Trip Dates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
          >
            Start Date
          </Label>
          <div className="relative">
            <Input
              id="start-date"
              type="date"
              value={dates.start}
              onChange={handleStartDateChange}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary transition-colors text-gray-800 dark:text-gray-200"
              placeholder="Select date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div>
          <Label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
          >
            End Date
          </Label>
          <div className="relative">
            <Input
              id="end-date"
              type="date"
              value={dates.end}
              onChange={handleEndDateChange}
              min={dates.start}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary transition-colors text-gray-800 dark:text-gray-200"
              placeholder="Select date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
