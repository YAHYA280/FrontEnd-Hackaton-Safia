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
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#f5f1ed] dark:bg-slate-950"
      style={{
        backgroundImage: "url('/background1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-white/40 dark:bg-black/40" />

      <div className="relative z-10 flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-4xl flex-1 px-4 md:px-6">
            <TripPlanningHeader />

            <main className="flex-1 space-y-8 py-10">
              <div className="text-center px-4 animate-fade-in-up">
                <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-4xl md:text-5xl font-bold leading-tight pb-3 pt-6">
                  Craft Your Perfect{" "}
                  <span className="text-gradient-primary">
                    Moroccan Adventure
                  </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-normal pb-3 pt-1 max-w-2xl mx-auto">
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
                  className="btn-primary w-full max-w-sm mx-auto text-lg py-6 px-8"
                >
                  Generate My Itinerary →
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
