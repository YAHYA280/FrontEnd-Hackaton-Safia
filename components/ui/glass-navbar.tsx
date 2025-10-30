"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export function GlassNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in-up">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-6 glass-strong rounded-2xl shadow-lg">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Compass className="h-8 w-8 text-primary transition-transform group-hover:rotate-180 duration-500" />
                <div className="absolute inset-0 blur-md bg-primary/30 group-hover:bg-primary/50 transition-all rounded-full" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                MarocAI
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link
                href="/plan-trip"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                Plan Trip
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
              <Link
                href="/my-trips"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                My Trips
                <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="hover-glow">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="glow-primary-hover">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
