"use client";

import Link from "next/link";
import { Menu, Compass, X } from "lucide-react";
import { useState } from "react";

export default function TripPlanningHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="clean-card mb-6 px-6 md:px-10 py-4">
      <div className="flex items-center justify-between whitespace-nowrap">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Compass className="h-7 w-7 text-amber-900 dark:text-amber-400 transition-transform group-hover:rotate-180 duration-500" />
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
            MarocAI Travel Guide
          </h2>
        </Link>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 text-sm font-medium leading-normal transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 dark:bg-amber-400 transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/my-trips"
              className="text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 text-sm font-medium leading-normal transition-colors relative group"
            >
              My Trips
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 dark:bg-amber-400 transition-all group-hover:w-full" />
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 right-4 clean-card shadow-lg p-4 md:hidden z-50 min-w-[160px]">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 text-sm font-medium leading-normal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/my-trips"
                className="text-slate-600 dark:text-slate-400 hover:text-amber-900 dark:hover:text-amber-400 text-sm font-medium leading-normal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Trips
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
