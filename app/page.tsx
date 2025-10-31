import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassNavbar } from "@/components/ui/glass-navbar";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { MoroccanDecorations } from "@/components/ui/moroccan-decorations";
import {
  Sparkles,
  MapPin,
  Calendar,
  Lightbulb,
  ArrowRight,
  Map,
  Palette,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-100 dark:from-slate-950 dark:via-orange-950/20 dark:to-slate-900"
      style={{
        backgroundImage: "url('/background1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Effects */}
      <FloatingOrbs />
      <MoroccanDecorations />
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-white/70 dark:bg-black/70" />

      {/* Navigation */}
      <GlassNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-foreground/80">
                AI-Powered Travel Planning
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-foreground">
                Discover the Magic of
              </span>
              <span className="block text-gradient-primary mt-2">
                Morocco with AI
              </span>
            </h1>

            {/* Subheading */}
            <p className="animate-fade-in-up delay-200 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Plan your perfect Moroccan adventure with intelligent
              recommendations, personalized itineraries, and authentic local
              experiences.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/plan-trip">
                <Button
                  size="lg"
                  className="glow-primary-hover group text-base px-8 py-6"
                >
                  Start Planning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-strong hover-glow text-base px-8 py-6"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-400 pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "10+", label: "Moroccan Cities" },
                { value: "500+", label: "Destinations" },
                { value: "1000+", label: "Happy Travelers" },
                { value: "24/7", label: "AI Support" },
              ].map((stat, index) => (
                <div key={index} className="clean-card p-6 hover-lift">
                  <div className="text-3xl md:text-4xl font-bold text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Why Choose </span>
              <span className="text-gradient-primary">MarocAI?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience Morocco like never before with intelligent travel
              planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "AI-Powered Insights",
                description:
                  "Get personalized recommendations based on your interests, budget, and travel style.",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Map,
                title: "Custom Itineraries",
                description:
                  "Generate detailed day-by-day plans optimized for your preferences and time.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: MapPin,
                title: "Local Experiences",
                description:
                  "Discover hidden gems and authentic Moroccan culture beyond tourist spots.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description:
                  "Optimize your time with intelligent routing and activity recommendations.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Palette,
                title: "Cultural Immersion",
                description:
                  "Connect with Moroccan traditions, art, gastronomy, and local communities.",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "Safe & Verified",
                description:
                  "All recommendations are verified and updated for your safety and comfort.",
                color: "from-teal-500 to-teal-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group clean-card p-8 hover-lift animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} opacity-90`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-br from-primary to-transparent rounded-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="clean-card p-12 md:p-16 text-center relative overflow-hidden hover-lift">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-amber-900/5 opacity-50" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-900/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-900/10 rounded-full blur-3xl animate-pulse-glow" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Ready to Explore </span>
                <span className="text-gradient-primary">Morocco?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who have discovered the magic of
                Morocco with personalized AI-powered itineraries.
              </p>
              <Link href="/plan-trip">
                <Button
                  size="lg"
                  className="glow-primary-hover group text-lg px-10 py-7"
                >
                  Plan Your Trip Now
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-8 border-t border-border/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © 2025 MarocAI. Powered by AI, Inspired by Morocco.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
