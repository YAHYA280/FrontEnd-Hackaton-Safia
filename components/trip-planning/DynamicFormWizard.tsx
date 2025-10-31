"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DynamicFormQuestion {
  key: string;
  label: string;
  type: string;
  options?: string[];
  required: boolean;
  maxSelect?: number;
}

interface DynamicFormWizardProps {
  form: {
    title: string;
    description: string;
    questions: DynamicFormQuestion[];
  };
  dynamicResponses: Record<string, any>;
  onResponseChange: (key: string, value: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

export default function DynamicFormWizard({
  form,
  dynamicResponses,
  onResponseChange,
  onSubmit,
  onBack,
  loading = false,
}: DynamicFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const currentQuestion = form.questions[currentStep];
  const isLastQuestion = currentStep === form.questions.length - 1;
  const isFirstQuestion = currentStep === 0;
  const totalQuestions = form.questions.length;

  const getCurrentValue = () => {
    return dynamicResponses[currentQuestion.key];
  };

  const isCurrentQuestionAnswered = () => {
    const value = getCurrentValue();
    if (!currentQuestion.required) return true;

    if (currentQuestion.type === "multi") {
      return Array.isArray(value) && value.length > 0;
    }
    if (currentQuestion.type === "number") {
      return value !== undefined && value !== "" && value !== null;
    }
    return value !== undefined && value !== "" && value !== null;
  };

  const handleNext = () => {
    if (isCurrentQuestionAnswered()) {
      if (isLastQuestion) {
        onSubmit();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleMultiSelect = (option: string) => {
    const current = Array.isArray(getCurrentValue()) ? getCurrentValue() : [];
    if (current.includes(option)) {
      onResponseChange(
        currentQuestion.key,
        current.filter((v: string) => v !== option)
      );
    } else {
      if (!currentQuestion.maxSelect || current.length < currentQuestion.maxSelect) {
        onResponseChange(currentQuestion.key, [...current, option]);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          {form.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          {form.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Question {currentStep + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-amber-900 dark:text-amber-400">
            {Math.round(((currentStep + 1) / totalQuestions) * 100)}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-900 to-amber-700 dark:from-amber-700 dark:to-amber-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="clean-card p-8 mb-6 animate-fade-in-up">
        <Label className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 block">
          {currentQuestion.label}
          {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
        </Label>

        <div className="space-y-4">
          {/* Single Select */}
          {currentQuestion.type === "single" && currentQuestion.options && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = getCurrentValue() === option;
                return (
                  <button
                    key={option}
                    onClick={() => onResponseChange(currentQuestion.key, option)}
                    className={`
                      p-4 rounded-xl text-left transition-all hover:scale-[1.02] font-medium
                      ${
                        isSelected
                          ? "bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-900 dark:border-amber-400 shadow-md"
                          : "bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-900/40"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-amber-900 dark:border-amber-400 bg-amber-900 dark:bg-amber-400"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={
                          isSelected
                            ? "text-amber-900 dark:text-amber-400"
                            : "text-slate-900 dark:text-slate-100"
                        }
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Multi Select */}
          {currentQuestion.type === "multi" && currentQuestion.options && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => {
                  const selected =
                    Array.isArray(getCurrentValue()) &&
                    getCurrentValue().includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleMultiSelect(option)}
                      className={`
                        p-4 rounded-xl text-left transition-all hover:scale-[1.02] font-medium
                        ${
                          selected
                            ? "bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-900 dark:border-amber-400 shadow-md"
                            : "bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-900/40"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selected
                              ? "border-amber-900 dark:border-amber-400 bg-amber-900 dark:bg-amber-400"
                              : "border-slate-300 dark:border-slate-600"
                          }`}
                        >
                          {selected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <span
                          className={
                            selected
                              ? "text-amber-900 dark:text-amber-400"
                              : "text-slate-900 dark:text-slate-100"
                          }
                        >
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              {currentQuestion.maxSelect && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Maximum {currentQuestion.maxSelect} selections
                  {Array.isArray(getCurrentValue()) &&
                    ` (${getCurrentValue().length}/${currentQuestion.maxSelect} selected)`}
                </p>
              )}
            </div>
          )}

          {/* Number Input */}
          {currentQuestion.type === "number" && (
            <Input
              type="number"
              value={getCurrentValue() || ""}
              onChange={(e) =>
                onResponseChange(currentQuestion.key, parseInt(e.target.value))
              }
              className="w-full text-lg p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900"
              placeholder="Enter a number"
              min="0"
            />
          )}

          {/* Text Input */}
          {currentQuestion.type === "text" && (
            <Input
              type="text"
              value={getCurrentValue() || ""}
              onChange={(e) => onResponseChange(currentQuestion.key, e.target.value)}
              className="w-full text-lg p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900"
              placeholder="Enter your answer"
            />
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          className="flex-1 h-14 text-lg font-semibold border-2"
          disabled={loading}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {isFirstQuestion ? "Back to Form" : "Previous"}
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isCurrentQuestionAnswered() || loading}
          className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-amber-900 to-amber-800 hover:from-amber-800 hover:to-amber-700"
        >
          {loading ? (
            "Processing..."
          ) : isLastQuestion ? (
            "Complete"
          ) : (
            <>
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
