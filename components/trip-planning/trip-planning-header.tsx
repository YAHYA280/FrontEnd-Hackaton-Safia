"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function TripPlanningHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-4">
        <div className="flex items-center justify-between whitespace-nowrap">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="NEXTRIP Logo"
                width={28}
                height={28}
                className="transition-transform group-hover:scale-110 duration-500"
              />
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">
              NEXTRIP Travel Guide
            </h2>
          </Link>

        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/my-trips"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
            >
              My Trips
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
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/my-trips"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 px-4 py-2 rounded-lg hover:bg-amber-800/90 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Trips
              </Link>
            </nav>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
