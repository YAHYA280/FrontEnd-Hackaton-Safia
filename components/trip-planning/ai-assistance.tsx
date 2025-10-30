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
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-foreground text-2xl font-bold leading-tight tracking-[-0.015em] pb-1">
        AI Assistance
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Let MarocAI handle the bookings for you. Select what you need assistance
        with.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {SERVICES.map((service) => (
          <Label
            key={service}
            htmlFor={service}
            className="flex items-center p-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border-2 border-slate-300/60 dark:border-slate-600/60 hover:border-primary/70 hover:bg-white/90 dark:hover:bg-slate-800/90 cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:ring-2 has-[:checked]:ring-primary/50 shadow-sm"
          >
            <Checkbox
              id={service}
              checked={isChecked(service)}
              onCheckedChange={() => handleServiceToggle(service)}
              className="h-5 w-5 rounded border-2 border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-700 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className="ml-3 font-medium text-foreground">
              {service}
            </span>
          </Label>
        ))}
      </div>
    </div>
  );
}
