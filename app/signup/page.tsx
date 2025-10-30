"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeOff, Eye, Compass } from "lucide-react";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { MoroccanDecorations } from "@/components/ui/moroccan-decorations";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Add your sign-up logic here
    console.log("Sign up with:", { email, password });
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-900">
      {/* Background Effects */}
      <FloatingOrbs />
      <MoroccanDecorations />
      <div className="moroccan-pattern fixed inset-0 opacity-40" />

      <div className="relative layout-container flex h-full w-full grow flex-col items-center justify-center px-4 py-8">
        <div className="glass-strong w-full max-w-md rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl animate-fade-in-scale">
          <div className="flex w-full flex-col items-center">
            {/* Logo and Branding */}
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative">
                <Compass className="h-10 w-10 text-primary transition-transform group-hover:rotate-180 duration-500" />
                <div className="absolute inset-0 blur-md bg-primary/30 group-hover:bg-primary/50 transition-all rounded-full" />
              </div>
              <span className="text-2xl font-bold text-gradient-primary">
                MarocAI
              </span>
            </Link>

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
                  Start Your Journey
                </h1>
                <p className="text-base font-normal leading-normal text-muted-foreground">
                  Create your account to explore Morocco with AI
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col items-stretch gap-4"
              >
                <label className="flex flex-col">
                  <p className="text-sm font-medium leading-normal text-foreground/90 pb-2">
                    Email Address
                  </p>
                  <input
                    className="glass w-full rounded-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/50 border-white/20 h-12 placeholder:text-muted-foreground p-3 text-base font-normal leading-normal transition-all"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <p className="text-sm font-medium leading-normal text-foreground/90 pb-2">
                    Password
                  </p>
                  <div className="flex w-full items-stretch rounded-lg glass">
                    <input
                      className="flex w-full flex-1 bg-transparent rounded-l-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/50 h-12 placeholder:text-muted-foreground p-3 pr-2 text-base font-normal leading-normal transition-all border-0"
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground flex items-center justify-center pr-3 pl-2 rounded-r-lg hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </label>

                <label className="flex flex-col">
                  <p className="text-sm font-medium leading-normal text-foreground/90 pb-2">
                    Confirm Password
                  </p>
                  <div className="flex w-full items-stretch rounded-lg glass">
                    <input
                      className="flex w-full flex-1 bg-transparent rounded-l-lg text-foreground focus:outline-0 focus:ring-2 focus:ring-primary/50 h-12 placeholder:text-muted-foreground p-3 pr-2 text-base font-normal leading-normal transition-all border-0"
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-muted-foreground flex items-center justify-center pr-3 pl-2 rounded-r-lg hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  className="mt-2 rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal transition-all hover:scale-105"
                >
                  <span>Sign Up</span>
                </button>
              </form>

              <div className="flex px-4 py-2">
                <p className="text-sm font-normal text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/signin"
                    className="font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Sign in
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
