"use client";

import { useState } from "react";
import TripPlanningHeader from "@/components/trip-planning/trip-planning-header";
import CitySelector from "@/components/trip-planning/city-selector";
import BudgetSelector from "@/components/trip-planning/budget-selector";
import DateSelector from "@/components/trip-planning/date-selector";
import AIAssistance from "@/components/trip-planning/ai-assistance";
import InterestsSelector from "@/components/trip-planning/interests-selector";
import TravelStyleSelector from "@/components/trip-planning/travel-style-selector";
import { Button } from "@/components/ui/button";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { MoroccanDecorations } from "@/components/ui/moroccan-decorations";

export default function PlanTripPage() {
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "Casablanca",
    "Marrakech",
  ]);
  const [budgetRange, setBudgetRange] = useState({ min: 1000, max: 30000 });
  const [dates, setDates] = useState({ start: "", end: "" });
  const [aiServices, setAiServices] = useState<string[]>([
    "Accommodation",
    "Restaurants",
  ]);
  const [interests, setInterests] = useState<string[]>([
    "Music",
    "Art",
    "Family",
  ]);
  const [travelStyle, setTravelStyle] = useState<string>("Adventure");

  const handleGenerateItinerary = () => {
    const tripData = {
      cities: selectedCities,
      budget: budgetRange,
      dates,
      aiServices,
      interests,
      travelStyle,
    };
    console.log("Generate itinerary with:", tripData);
    // Add your API call here
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200/80 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Effects */}
      <FloatingOrbs />
      <MoroccanDecorations />
      <div className="moroccan-pattern fixed inset-0 opacity-30" />

      <div className="relative layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-4xl flex-1 px-4 md:px-0">
            <TripPlanningHeader />

            <main className="flex-1 space-y-8 py-10">
              <div className="text-center px-4 animate-fade-in-up">
                <h1 className="text-foreground tracking-tight text-4xl md:text-5xl font-bold leading-tight pb-3 pt-6">
                  Craft Your Perfect{" "}
                  <span className="text-gradient-primary">Moroccan Adventure</span>
                </h1>
                <p className="text-muted-foreground text-lg font-normal leading-normal pb-3 pt-1 max-w-2xl mx-auto">
                  Tell us your preferences, and our AI will build a personalized
                  itinerary just for you.
                </p>
              </div>

              <div className="space-y-6 animate-fade-in-up delay-100">
                <CitySelector
                  selectedCities={selectedCities}
                  onCitiesChange={setSelectedCities}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BudgetSelector
                    budgetRange={budgetRange}
                    onBudgetChange={setBudgetRange}
                  />
                  <DateSelector dates={dates} onDatesChange={setDates} />
                </div>

                <AIAssistance
                  selectedServices={aiServices}
                  onServicesChange={setAiServices}
                />

                <InterestsSelector
                  selectedInterests={interests}
                  onInterestsChange={setInterests}
                />

                <TravelStyleSelector
                  selectedStyle={travelStyle}
                  onStyleChange={setTravelStyle}
                />
              </div>

              <div className="pt-8 pb-4 text-center animate-fade-in-up delay-200">
                <Button
                  onClick={handleGenerateItinerary}
                  className="w-full max-w-sm mx-auto bg-primary hover:bg-primary/90 text-white font-bold py-6 px-8 rounded-xl text-lg transition-all hover:scale-105"
                >
                  Generate My Itinerary
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
