"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function TripPlanningHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700/50 px-6 md:px-10 py-4">
      <Link href="/" className="flex items-center gap-4 text-primary">
        <div className="size-6">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect fill="white" height="48" width="48" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          MarocAI Travel Guide
        </h2>
      </Link>

      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
          >
            Home
          </Link>
          <Link
            href="/my-trips"
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
          >
            My Trips
          </Link>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:hidden z-50">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/my-trips"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Trips
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
