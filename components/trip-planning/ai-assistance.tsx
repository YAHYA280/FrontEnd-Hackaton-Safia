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
    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] pb-1">
        AI Assistance
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Let MarocAI handle the bookings for you. Select what you need assistance
        with.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {SERVICES.map((service) => (
          <Label
            key={service}
            htmlFor={service}
            className="flex items-center p-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:ring-2 has-[:checked]:ring-primary/50"
          >
            <Checkbox
              id={service}
              checked={isChecked(service)}
              onCheckedChange={() => handleServiceToggle(service)}
              className="h-5 w-5 rounded border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">
              {service}
            </span>
          </Label>
        ))}
      </div>
    </div>
  );
}
