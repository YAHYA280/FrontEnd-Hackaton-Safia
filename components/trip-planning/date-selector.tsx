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
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-5">
        Trip Dates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="start-date"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Start Date
          </Label>
          <div className="relative">
            <Input
              id="start-date"
              type="date"
              value={dates.start}
              onChange={handleStartDateChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 dark:bg-slate-800/90 border-2 border-slate-300/60 dark:border-slate-600/60 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground shadow-sm"
              placeholder="Select date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none z-10" />
          </div>
        </div>

        <div>
          <Label
            htmlFor="end-date"
            className="block text-sm font-medium text-muted-foreground mb-1"
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
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 dark:bg-slate-800/90 border-2 border-slate-300/60 dark:border-slate-600/60 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground shadow-sm"
              placeholder="Select date"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
