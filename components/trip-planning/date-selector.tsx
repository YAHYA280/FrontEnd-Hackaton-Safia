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
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-5">
        Trip Dates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="start-date"
            className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
          >
            Start Date
          </Label>
          <div className="relative">
            <Input
              id="start-date"
              type="date"
              value={dates.start}
              onChange={handleStartDateChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900 transition-all text-slate-900 dark:text-slate-100"
              placeholder="Select date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none z-10" />
          </div>
        </div>

        <div>
          <Label
            htmlFor="end-date"
            className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
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
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900 transition-all text-slate-900 dark:text-slate-100"
              placeholder="Select date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
