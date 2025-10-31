"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TripPlanningHeader from "@/components/trip-planning/trip-planning-header";
import CitySelector from "@/components/trip-planning/city-selector";
import BudgetSelector from "@/components/trip-planning/budget-selector";
import DateSelector from "@/components/trip-planning/date-selector";
import AIAssistance from "@/components/trip-planning/ai-assistance";
import InterestsSelector from "@/components/trip-planning/interests-selector";
import RythmeStyleSelector from "@/components/trip-planning/rythme-style-selector";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { startOnboarding, continueOnboarding } from "@/lib/onboarding";
import DynamicFormWizard from "@/components/trip-planning/DynamicFormWizard";
import LoadingView from "@/components/trip/LoadingView";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

// Available options for questions
const ALL_CITIES = ["Casablanca", "Marrakech", "Fes", "Rabat", "Tangier", "Agadir", "Chefchaouen", "Essaouira"];
const ALL_SERVICES = ["Accommodation", "Restaurants", "Transportation", "Activities", "Shopping"];
const ALL_INTERESTS = ["Music", "Art", "Family", "Adventure", "Culture", "Food", "Nature", "History", "Photography", "Shopping", "Sports", "Wellness", "Architecture", "Beach", "Mountains", "Desert", "Nightlife", "Local Markets"];
const ALL_STYLES = ["Intensif", "Modéré", "Détendu"];

export default function PlanTripPage() {
  const router = useRouter();
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
  const [rythmeStyle, setRythmeStyle] = useState<string>("Modéré");

  // API integration states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptDynamicForm, setAcceptDynamicForm] = useState(false);
  const [showDynamicWizard, setShowDynamicWizard] = useState(false);
  const [dynamicForm, setDynamicForm] = useState<{
    title: string;
    description: string;
    questions: Array<{
      key: string;
      label: string;
      type: string;
      options?: string[];
      required: boolean;
      maxSelect?: number;
    }>;
  } | null>(null);
  const [dynamicResponses, setDynamicResponses] = useState<Record<string, any>>({});
  const [showLoading, setShowLoading] = useState(false);

  // Build initial questions based on available options
  const buildInitialQuestions = () => [
    { label: "Where to?", values: ALL_CITIES },
    { label: "Your Budget (in MAD)", values: [] },
    { label: "Trip Dates", values: [] },
    { label: "AI Assistance", values: ALL_SERVICES },
    { label: "Your Interests", values: ALL_INTERESTS },
    { label: "Rythme Style", values: ALL_STYLES },
  ];

  // Build responses from current form state
  const buildInitialResponses = () => ({
    "Where to?": selectedCities,
    "Your Budget (in MAD)": `${budgetRange.min}-${budgetRange.max}`,
    "Trip Dates": { start: dates.start, end: dates.end },
    "AI Assistance": aiServices,
    "Your Interests": interests,
    "Rythme Style": rythmeStyle,
  });

  const handleGenerateItinerary = async () => {
    setError(null);
    setLoading(true);
    setDynamicForm(null);

    try {
      const result = await startOnboarding({
        BACKEND_URL,
        INITIAL_QUESTIONS: buildInitialQuestions(),
        INITIAL_RESPONSES: buildInitialResponses(),
        ACCEPT_DYNAMIC_FORM: acceptDynamicForm,
      });

      if (result.nextAction === "show_dynamic_form") {
        setDynamicForm(result.dynamicForm);
        setShowDynamicWizard(true);
      } else if (result.nextAction === "done") {
        // Profile created successfully, redirect to trip page
        console.log("Profile created:", result.profile);
        console.log("Trip ID:", result.tripId);
        router.push(`/trip/${result.tripId}`);
      } else if (result.nextAction === "error") {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const submitDynamicForm = async () => {
    if (!dynamicForm) return;

    setError(null);
    setLoading(true);
    setShowLoading(true);
    setShowDynamicWizard(false);

    try {
      const result = await continueOnboarding({
        BACKEND_URL,
        INITIAL_QUESTIONS: buildInitialQuestions(),
        INITIAL_RESPONSES: buildInitialResponses(),
        ACCEPT_DYNAMIC_FORM: acceptDynamicForm,
        DYNAMIC_RESPONSES: dynamicResponses,
      });

      if (result.nextAction === "done") {
        // Profile created successfully, redirect to trip page
        console.log("Profile created:", result.profile);
        console.log("Trip ID:", result.tripId);
        setDynamicForm(null);
        setDynamicResponses({});
        router.push(`/trip/${result.tripId}`);
      } else if (result.nextAction === "error") {
        setShowLoading(false);
        setShowDynamicWizard(true);
        setError(result.message);
      }
    } catch (err) {
      setShowLoading(false);
      setShowDynamicWizard(true);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDynamicFieldChange = (key: string, value: any) => {
    setDynamicResponses(prev => ({ ...prev, [key]: value }));
  };

  // Show loading screen
  if (showLoading) {
    return <LoadingView />;
  }

  // Show dynamic wizard
  if (showDynamicWizard && dynamicForm) {
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
        <div className="fixed inset-0 bg-white/60 dark:bg-black/60" />

        <div className="relative z-10 flex h-full grow flex-col">
          <TripPlanningHeader />

          <div className="flex flex-1 justify-center py-5 pt-24">
            <div className="flex flex-col w-full max-w-4xl flex-1 px-4 md:px-6 py-10">
              <DynamicFormWizard
                form={dynamicForm}
                dynamicResponses={dynamicResponses}
                onResponseChange={handleDynamicFieldChange}
                onSubmit={submitDynamicForm}
                onBack={() => {
                  setShowDynamicWizard(false);
                  setDynamicForm(null);
                  setDynamicResponses({});
                }}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show main form
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
      <div className="fixed inset-0 bg-white/60 dark:bg-black/60" />

      <div className="relative z-10 flex h-full grow flex-col">
        <TripPlanningHeader />

        <div className="flex flex-1 justify-center py-5 pt-24">
          <div className="flex flex-col w-full max-w-4xl flex-1 px-4 md:px-6">
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

                <RythmeStyleSelector
                  selectedStyle={rythmeStyle}
                  onStyleChange={setRythmeStyle}
                />
              </div>

              {/* Error display */}
              {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-fade-in-up">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Accept dynamic form checkbox */}
              <div className="pt-8 pb-2 text-center animate-fade-in-up delay-200">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="accept-dynamic-form"
                      checked={acceptDynamicForm}
                      onCheckedChange={(v) => setAcceptDynamicForm(Boolean(v))}
                    />
                    <Label
                      htmlFor="accept-dynamic-form"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      Generate additional preference fields (AI-powered)
                    </Label>
                  </div>
                </div>

                <Button
                  onClick={handleGenerateItinerary}
                  disabled={loading}
                  className="btn-primary w-full max-w-sm mx-auto text-lg py-6 px-8"
                >
                  {loading
                    ? "Generating..."
                    : acceptDynamicForm
                    ? "Personalize More Your Trip →"
                    : "Generate My Itinerary →"}
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
