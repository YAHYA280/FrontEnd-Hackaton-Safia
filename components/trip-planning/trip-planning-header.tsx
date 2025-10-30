"use client";

import Link from "next/link";
import { Menu, Compass } from "lucide-react";
import { useState } from "react";

export default function TripPlanningHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-strong rounded-2xl mb-6 px-6 md:px-10 py-4">
      <div className="flex items-center justify-between whitespace-nowrap">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Compass className="h-7 w-7 text-primary transition-transform group-hover:rotate-180 duration-500" />
            <div className="absolute inset-0 blur-md bg-primary/30 group-hover:bg-primary/50 transition-all rounded-full" />
          </div>
          <h2 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em]">
            MarocAI Travel Guide
          </h2>
        </Link>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <Link
              href="/"
              className="text-foreground/70 hover:text-foreground text-sm font-medium leading-normal transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/my-trips"
              className="text-foreground/70 hover:text-foreground text-sm font-medium leading-normal transition-colors relative group"
            >
              My Trips
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 right-4 glass-strong rounded-xl shadow-lg p-4 md:hidden z-50">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground/70 hover:text-foreground text-sm font-medium leading-normal transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/my-trips"
                className="text-foreground/70 hover:text-foreground text-sm font-medium leading-normal transition-colors"
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
