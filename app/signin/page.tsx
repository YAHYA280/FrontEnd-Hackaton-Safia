"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeOff, Eye, Compass } from "lucide-react";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { MoroccanDecorations } from "@/components/ui/moroccan-decorations";

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
    <div className="relative flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-900">
      {/* Background Effects */}
      <FloatingOrbs />
      <MoroccanDecorations />
      <div className="moroccan-pattern fixed inset-0 opacity-40" />

      {/* Left side - Image */}
      <div className="relative w-[40%] h-full overflow-hidden">
        <img
          src="/side-image-login.png"
          alt="Morocco"
          className="w-full h-full object-cover"
        />
        {/* Fade effect on the right side of the image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 1) 100%)',
          }}
        />
        {/* Dark mode fade effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(15, 23, 42, 0.4) 75%, rgb(15, 23, 42) 100%)',
          }}
        />
      </div>

      {/* Right side - Form */}
      <div className="relative flex w-[60%] h-full items-center justify-center px-8 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md rounded-3xl p-8 sm:p-10 md:p-12 animate-fade-in-scale shadow-2xl bg-white dark:bg-slate-800">
          <div className="flex w-full flex-col items-center">
            {/* Logo and Branding */}
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-10 w-10 transition-transform group-hover:scale-110 duration-500"
              />
              <span className="text-2xl font-bold text-gradient-primary">
                NEXTRIP
              </span>
            </Link>

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
                  Welcome Back
                </h1>
                <p className="text-base font-normal leading-normal text-muted-foreground">
                  Sign in to continue your Moroccan adventure
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
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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

                <button
                  type="submit"
                  className="mt-2 rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal transition-all hover:scale-105"
                >
                  <span>Sign In</span>
                </button>
              </form>

              <div className="flex px-4 py-2">
                <p className="text-sm font-normal text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-bold text-primary hover:text-primary/80 transition-colors"
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
