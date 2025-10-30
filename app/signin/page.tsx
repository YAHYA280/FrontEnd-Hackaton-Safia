"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import BackgroundCarousel from "@/components/ui/background-carousel";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log("Sign in with:", { email, password });
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundCarousel />

      <div className="layout-container flex h-full w-full grow flex-col items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center justify-center rounded-xl border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-lg sm:p-8 md:p-12">
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-col items-center gap-6 self-stretch">
              <div className="flex flex-col items-center gap-4 self-stretch">
                <h1 className="text-[32px] font-bold leading-tight tracking-tight text-white text-center">
                  Plan your personalized Moroccan adventure with MarocAI
                </h1>
                <p className="text-base font-normal leading-normal text-white/80 text-center">
                  Your AI-powered guide to the magic of Morocco.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-stretch gap-4"
              >
                <label className="flex flex-col">
                  <p className="text-sm font-medium leading-normal text-white/90 pb-2">
                    Email Address
                  </p>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#ec4913]/50 border border-white/20 bg-white/10 h-12 placeholder:text-white/60 p-3 text-base font-normal leading-normal transition-all"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-sm font-medium leading-normal text-white/90 pb-2">
                    Password
                  </p>
                  <div className="flex w-full flex-1 items-stretch rounded-lg">
                    <input
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-white focus:outline-0 focus:ring-2 focus:ring-[#ec4913]/50 border border-white/20 bg-white/10 h-12 placeholder:text-white/60 p-3 pr-2 border-r-0 text-base font-normal leading-normal transition-all"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/60 flex border border-white/20 bg-white/10 items-center justify-center pr-3 pl-2 rounded-r-lg border-l-0 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className="flex mt-2 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 flex-1 bg-[#ec4913] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#ec4913]/90 transition-colors duration-200"
                >
                  <span className="truncate">Sign In</span>
                </button>
              </form>

              <div className="flex px-4 py-3">
                <p className="text-sm font-normal text-white/60">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-bold text-[#ec4913]/90 hover:text-[#ec4913] transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
