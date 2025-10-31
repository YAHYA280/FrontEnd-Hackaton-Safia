"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function GlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 animate-fade-in-up">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`mt-6 rounded-2xl shadow-lg transition-all duration-300 ${
          isScrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md" : "glass-strong"
        }`}>
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="NEXTRIP Logo"
                  width={32}
                  height={32}
                  className="transition-transform group-hover:scale-110 duration-500"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NEXTRIP
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
              >
                Accueil
              </Link>
              <Link
                href="/plan-trip"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
              >
                Planifier
              </Link>
              <Link
                href="/my-trips"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
              >
                Mes Voyages
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="hover-glow">
                  Connexion
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="glow-primary-hover">
                  Commencer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
