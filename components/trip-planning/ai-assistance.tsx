"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AIAssistanceProps {
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
}

const SERVICES = [
  "All",
  "Accommodation",
  "Restaurants",
  "Activities",
  "Flights",
  "Transport",
];

export default function AIAssistance({
  selectedServices,
  onServicesChange,
}: AIAssistanceProps) {
  const handleServiceToggle = (service: string) => {
    if (service === "All") {
      if (selectedServices.includes("All")) {
        onServicesChange([]);
      } else {
        onServicesChange(SERVICES);
      }
      return;
    }

    if (selectedServices.includes(service)) {
      const newServices = selectedServices.filter(
        (s) => s !== service && s !== "All"
      );
      onServicesChange(newServices);
    } else {
      const newServices = [...selectedServices, service].filter(
        (s) => s !== "All"
      );
      // Check if all individual services are selected
      if (newServices.length === SERVICES.length - 1) {
        onServicesChange([...newServices, "All"]);
      } else {
        onServicesChange(newServices);
      }
    }
  };

  const isChecked = (service: string) => {
    return selectedServices.includes(service);
  };

  return (
    <div className="clean-card p-6 hover-lift">
      <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight pb-1">
        AI Assistance
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Let our AI handle the bookings for you
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {SERVICES.map((service) => (
          <Label
            key={service}
            htmlFor={service}
            className="flex items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-900/40 hover:bg-white dark:hover:bg-slate-750 cursor-pointer transition-all has-[:checked]:border-amber-900 has-[:checked]:bg-amber-50 dark:has-[:checked]:bg-amber-900/20 has-[:checked]:shadow-sm"
          >
            <Checkbox
              id={service}
              checked={isChecked(service)}
              onCheckedChange={() => handleServiceToggle(service)}
              className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 data-[state=checked]:bg-amber-900 data-[state=checked]:border-amber-900"
            />
            <span className="ml-3 font-medium text-slate-900 dark:text-slate-100">
              {service}
            </span>
          </Label>
        ))}
      </div>
    </div>
  );
}
