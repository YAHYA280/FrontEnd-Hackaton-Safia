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
                Votre Prochain Voyage, Propulsé par l'IA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-foreground">
                Planifiez Moins,
              </span>
              <span className="block text-gradient-primary mt-2">
                Vivez Plus
              </span>
            </h1>

            {/* Subheading */}
            <p className="animate-fade-in-up delay-200 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              NEXTRIP est votre compagnon de voyage intelligent pour le Maroc. Optimisation budgétaire intelligente, itinéraires personnalisés et assistance 24h/24 pour rentabiliser chaque dirham.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/plan-trip">
                <Button
                  size="lg"
                  className="glow-primary-hover group text-base px-8 py-6"
                >
                  Commencer à Planifier
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-strong hover-glow text-base px-8 py-6"
                >
                  Se Connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Voyager Ne Devrait Pas Être </span>
              <span className="text-gradient-primary">Si Compliqué</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Des voyages stressants, mal planifiés, où le voyageur passe plus de temps à organiser qu'à profiter.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Planification Budgétaire Complexe",
                description: "Difficulté à estimer les coûts réels (transport, hébergement, nourriture, activités) et à répartir intelligemment un budget limité entre différentes villes marocaines."
              },
              {
                title: "Manque de Transparence Tarifaire",
                description: "Les prix varient énormément selon les saisons, les villes et le type d'expérience (luxe vs authentique), rendant difficile l'estimation précise des dépenses."
              },
              {
                title: "Surcharge Informationnelle",
                description: "Trop de sources disparates (blogs, forums, guides touristiques) sans vision unifiée ni personnalisation selon le profil et le budget du voyageur."
              },
              {
                title: "Optimisation Sous-Optimale",
                description: "Les voyageurs dépensent souvent mal leur budget (trop sur l'hébergement, pas assez sur les expériences) ou manquent des opportunités locales."
              },
              {
                title: "Barrière Linguistique",
                description: "Difficulté à comprendre les codes locaux, les périodes idéales, les spécificités régionales du Maroc sans assistance."
              },
              {
                title: "Manque d'Accompagnement",
                description: "Absence de support continu pendant le voyage pour réajuster les plans, gérer les imprévus et optimiser l'expérience en temps réel."
              }
            ].map((problem, index) => (
              <div key={index} className="clean-card p-6 hover-lift">
                <h3 className="text-lg font-bold text-foreground mb-3">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SafIA Introduction */}
      <section className="relative py-16 px-6 lg:px-8 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10">
        <div className="mx-auto max-w-5xl">
          <div className="clean-card p-10 md:p-16 text-center">
            <div className="mb-6">
              <span className="text-6xl md:text-7xl font-bold text-gradient-primary">SafIA</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Votre Assistante Voyage IA
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              <strong className="text-primary">Saf</strong> (سفر - Safar = Voyage en arabe) + <strong className="text-primary">IA</strong> (Intelligence Artificielle)
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              SafIA incarne parfaitement notre mission : combiner la richesse culturelle du voyage avec la puissance de l'intelligence artificielle. Elle communique naturellement avec vous, recommande les meilleurs endroits, s'améliore à chaque utilisation et vous accompagne du début à la fin de votre voyage.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Découvrez </span>
              <span className="text-gradient-primary">NEXTRIP</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une application de voyage intelligent propulsée par l'IA, spécialisée dans la planification budgétaire de voyages au Maroc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Optimisation Budgétaire IA",
                description:
                  "Allocation intelligente de chaque dirham selon vos priorités : aventure, confort, culture ou gastronomie.",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Map,
                title: "Personnalisation Profonde",
                description:
                  "L'IA apprend de vos préférences et adapte les recommandations (routard vs luxe, nature vs ville, solo vs famille).",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: MapPin,
                title: "Transparence Totale",
                description:
                  "Visualisation claire de chaque poste de dépense avec justification, alternatives et prix locaux réels.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Calendar,
                title: "Gain de Temps Massif",
                description:
                  "Ce qui prendrait des jours de recherche se fait en quelques minutes avec une précision supérieure.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Palette,
                title: "Contextualisation Locale",
                description:
                  "Intégration de données marocaines spécifiques : météo, événements culturels, prix locaux, conseils pratiques.",
                color: "from-pink-500 to-pink-600",
              },
              {
                icon: Shield,
                title: "Assistance Continue 24/7",
                description:
                  "SafIA disponible en permanence pour réajuster le plan, répondre aux questions, suggérer des alternatives.",
                color: "from-teal-500 to-teal-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group clean-card p-8 animate-fade-in-scale transition-all duration-300 hover:shadow-[0_8px_30px_rgb(146,64,14,0.12)] hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} opacity-90`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
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

      {/* Vision Section */}
      <section className="relative py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Notre </span>
              <span className="text-gradient-primary">Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="clean-card p-8 hover-lift">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Sparkles className="h-7 w-7 text-primary" />
                Vision à Long Terme
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Devenir l'application de référence pour tout voyage au Maroc, où l'intelligence artificielle démocratise l'accès au tourisme marocain en rendant chaque budget viable et chaque expérience mémorable. NEXTRIP aspire à être l'interface entre le voyageur moderne et la richesse culturelle marocaine.
              </p>
            </div>

            <div className="clean-card p-8 hover-lift">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Shield className="h-7 w-7 text-primary" />
                Valeur Ajoutée Unique
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Optimisation IA de chaque dirham selon vos priorités</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Personnalisation profonde avec apprentissage continu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Transparence financière totale et contextualisation locale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Gain de temps massif avec précision supérieure</span>
                </li>
              </ul>
            </div>
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
                <span className="text-foreground">Votre Prochain Voyage au </span>
                <span className="text-gradient-primary">Maroc Vous Attend</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Laissez NEXTRIP et SafIA gérer la planification pendant que vous vous concentrez sur la création de souvenirs inoubliables. Chaque budget, chaque style, chaque rêve—optimisé.
              </p>
              <Link href="/plan-trip">
                <Button
                  size="lg"
                  className="glow-primary-hover group text-lg px-10 py-7"
                >
                  Commencer avec SafIA
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
              © 2025 NEXTRIP. Planifiez Moins, Vivez Plus.
            </p>
            <p className="text-xs mt-2 opacity-75">
              Propulsé par SafIA - Votre Compagnon de Voyage IA
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
