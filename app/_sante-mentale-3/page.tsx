"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Brain,
  Moon,
  Heart,
  Users,
  Stethoscope,
  Activity,
  Video,
  Phone,
  Wind,
  ArrowUpRight,
  MessageCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import data from "@/app/data/sante-mentale-3.json";

// Types
type Topic = {
  id: number;
  title: string;
  tag: string;
  size: string;
  variant: "primary" | "secondary" | "card" | "outline";
  icon: LucideIcon;
  desc: string;
};

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Activity,
  Moon,
  Users,
  Brain,
  Heart,
  Stethoscope,
  Video,
  ShieldCheck,
};

// Transform JSON data to include icon components
const topics: Topic[] = data.topics.map((topic) => ({
  ...topic,
  icon: iconMap[topic.iconName],
  variant: topic.variant as "primary" | "secondary" | "card" | "outline",
}));

const resources = data.resources.map((resource) => ({
  ...resource,
  icon: iconMap[resource.iconName],
}));

// Bento Card Component
type BentoCardProps = {
  topic: Topic;
  onClick: () => void;
};

const BentoCard = ({ topic, onClick }: BentoCardProps) => {
  const variants = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground border border-border",
    card: "bg-card text-card-foreground border border-border shadow-sm",
    outline:
      "bg-transparent text-foreground border border-border hover:bg-accent",
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
        topic.size
      } ${variants[topic.variant]}`}
    >
      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 font-mono">
              {topic.tag}
            </span>
            <h3 className="text-3xl font-bold tracking-tight leading-none">
              {topic.title}
            </h3>
          </div>
          <div className="p-3 bg-foreground/10 backdrop-blur-md rounded-xl group-hover:scale-110 transition-transform">
            <topic.icon size={22} />
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <p className="text-sm opacity-70 leading-relaxed max-w-[320px]">
            {topic.desc}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
            Explorer <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default function SanteMentale3Page() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [tab, setTab] = useState<"adults" | "youth">("adults");
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inspire" | "expire">(
    "inspire"
  );
  const [countdown, setCountdown] = useState(5);
  const [totalBreaths, setTotalBreaths] = useState(0); // 30 respirations max
  const [showIntro, setShowIntro] = useState(false);
  const [guidanceIndex, setGuidanceIndex] = useState(0);

  const currentAnnuaire =
    tab === "adults" ? data.annuaire.adults : data.annuaire.youth;

  // 1. Timer pur - décompte chaque seconde
  useEffect(() => {
    if (!isBreathing) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathing]);

  // 2. Logique de changement de phase quand countdown atteint 0
  useEffect(() => {
    if (isBreathing && countdown <= 0) {
      // Bascule la phase
      const nextPhase = breathPhase === "inspire" ? "expire" : "inspire";
      setBreathPhase(nextPhase);

      // Réinitialise le décompte
      setCountdown(5);

      // Si on vient de finir d'expirer, on compte une respiration complète
      if (breathPhase === "expire") {
        const newTotal = totalBreaths + 1;
        setTotalBreaths(newTotal);

        // Changement de message tous les 5 cycles
        if (newTotal % 5 === 0 && newTotal < 30) {
          setGuidanceIndex((g) => (g + 1) % data.breathingTool.guidance.during.length);
        }

        // Arrêt automatique après 30 cycles
        if (newTotal >= 30) {
          setIsBreathing(false);
        }
      }
    }
  }, [countdown, isBreathing, breathPhase, totalBreaths]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      // Starting exercise
      if (totalBreaths === 0) {
        setShowIntro(true);
        setTimeout(() => {
          setShowIntro(false);
          setCountdown(5);
          setBreathPhase("inspire");
          setTotalBreaths(0);
          setGuidanceIndex(0);
          setIsBreathing(true);
        }, 3000); // Show intro for 3 seconds
      } else {
        // Resume
        setCountdown(5);
        setBreathPhase("inspire");
        setIsBreathing(true);
      }
    } else {
      // Pause
      setIsBreathing(false);
    }
  };

  const resetExercise = () => {
    setIsBreathing(false);
    setBreathPhase("inspire");
    setCountdown(5);
    setTotalBreaths(0);
    setShowIntro(false);
    setGuidanceIndex(0);
  };

  // Calculate remaining time
  const remainingBreaths = 30 - totalBreaths;
  const remainingSeconds = remainingBreaths * 10; // Each breath is 10s (5s inspire + 5s expire)
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsDisplay = remainingSeconds % 60;

  return (
    <main className="min-h-screen">
      <Header />

      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        {/* Global texture grain */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Titre principal */}
              <div className="lg:col-span-7 space-y-6 relative z-10">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    {data.hero.badge}
                  </span>
                </div>
                <h1 className="text-7xl md:text-9xl font-bold tracking-[-0.05em] leading-[0.85]">
                  {data.hero.title} <br />
                  <span className="text-muted-foreground/30">
                    {data.hero.titleMuted}
                  </span>
                </h1>
              </div>

              {/* Colonne droite: Illustration + Description */}
              <div className="lg:col-span-5 space-y-6 relative">
                {/* Illustration */}
                <div className="relative h-64 md:h-80 lg:h-96 z-0">
                  <Image
                    src="/santé-mental/Mental%20health-cuate.svg"
                    alt="Illustration santé mentale"
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />
                </div>

                {/* Description et Scroll */}
                <div className="space-y-6 relative z-10 mt-8">
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">
                    {data.hero.description}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
                    {data.hero.scrollText}{" "}
                    <ChevronRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* First Row: Breathing Tool + Le Stress */}
              {/* Breathing Tool Bento */}
              <div className="col-span-12 md:col-span-6 lg:col-span-4 rounded-[2rem] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border p-6 md:p-8 flex flex-col shadow-sm">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Wind size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight">
                        {data.breathingTool.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.breathingTool.subtitle}
                  </p>
                </div>

                {/* Clickable Breathing Circle - ENLARGED */}
                <div className="relative my-6 flex-1 flex flex-col items-center justify-center">
                  <button
                    onClick={toggleBreathing}
                    className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                    aria-label={
                      isBreathing ? "Pause l'exercice" : "Démarrer l'exercice"
                    }
                  >
                    <div
                      className={`w-48 h-48 md:w-56 md:h-56 rounded-full border-4 transition-all duration-1000 ease-in-out ${
                        isBreathing || showIntro
                          ? breathPhase === "inspire"
                            ? "border-primary shadow-lg shadow-primary/50"
                            : "border-accent shadow-lg shadow-accent/50"
                          : "border-border group-hover:border-primary/50 group-hover:shadow-md"
                      }`}
                      style={
                        isBreathing
                          ? {
                              transform: `scale(${
                                breathPhase === "inspire"
                                  ? 0.75 + (5 - countdown) * 0.1
                                  : 1.25 - (5 - countdown) * 0.1
                              })`,
                            }
                          : {}
                      }
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-card border-2 border-border flex flex-col items-center justify-center p-6">
                        {showIntro ? (
                          <div className="text-center space-y-2 px-6">
                            <Wind
                              size={32}
                              className="text-primary mx-auto mb-2 animate-pulse"
                            />
                            <p className="text-[11px] md:text-xs text-muted-foreground leading-snug">
                              {data.breathingTool.guidance.intro}
                            </p>
                          </div>
                        ) : totalBreaths >= 30 ? (
                          <div className="text-center space-y-2 px-6">
                            <div className="text-3xl">✓</div>
                            <p className="text-[11px] md:text-xs text-muted-foreground leading-snug">
                              {data.breathingTool.guidance.outro}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                resetExercise();
                              }}
                              className="mt-3 text-[10px] text-primary hover:underline"
                            >
                              Recommencer
                            </button>
                          </div>
                        ) : isBreathing ? (
                          <>
                            <span className="text-5xl md:text-6xl font-bold text-primary mb-2">
                              {countdown}
                            </span>
                            <span className="text-sm md:text-base font-semibold text-center px-6">
                              {breathPhase === "inspire"
                                ? data.breathingTool.instructions.inspire
                                : data.breathingTool.instructions.expire}
                            </span>
                            <span className="text-[10px] text-muted-foreground mt-2">
                              {totalBreaths + 1}/30
                            </span>
                          </>
                        ) : (
                          <div className="text-center space-y-2 px-6">
                            <Wind
                              size={40}
                              className="text-primary mx-auto group-hover:scale-110 transition-transform"
                            />
                            <p className="text-xs md:text-sm text-muted-foreground font-medium">
                              {totalBreaths === 0
                                ? data.breathingTool.clickToStart
                                : "Cliquez pour reprendre"}
                            </p>
                            {totalBreaths > 0 && totalBreaths < 30 && (
                              <span className="text-[10px] text-muted-foreground">
                                {totalBreaths}/30
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Progress & Guidance */}
                  {(isBreathing || totalBreaths > 0) &&
                    totalBreaths < 30 &&
                    !showIntro && (
                      <div className="mt-4 text-center space-y-2">
                        {isBreathing && (
                          <p className="text-xs text-primary/70 italic min-h-[2rem] flex items-center justify-center px-4">
                            {data.breathingTool.guidance.during[guidanceIndex]}
                          </p>
                        )}
                        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                          <span>
                            Temps restant : {remainingMinutes}:
                            {remainingSecondsDisplay
                              .toString()
                              .padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Le Stress - 8 cols avec illustration */}
              {(() => {
                const StressIcon = topics[0].icon;
                return (
                  <div
                    onClick={() => setSelectedTopic(topics[0])}
                    className="group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 col-span-12 md:col-span-8 bg-primary text-primary-foreground"
                  >
                    {/* Icône en haut à droite */}
                    <div className="absolute top-6 right-6 p-3 bg-foreground/10 backdrop-blur-md rounded-xl group-hover:scale-110 transition-transform z-20">
                      <StressIcon size={22} />
                    </div>

                    {/* Illustration centrée en arrière-plan */}
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className="relative w-84 h-84 md:w-80 md:h-80 md:ml-34">
                        <Image
                          src="/santé-mental/Anxiety-bro.svg"
                          alt="Illustration stress"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 256px, 320px"
                        />
                      </div>
                    </div>

                    {/* Contenu au premier plan */}
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 font-mono">
                          {topics[0].tag}
                        </span>
                        <h3 className="text-3xl font-bold tracking-tight leading-none">
                          {topics[0].title}
                        </h3>
                      </div>

                      <div className="space-y-4 mt-12">
                        <p className="text-sm opacity-70 leading-relaxed max-w-[320px]">
                          {topics[0].desc}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                          Explorer <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Subtle texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  </div>
                );
              })()}

              {/* Second Row: Custom grid with Sommeil + Liens Sociaux + L'Équilibre + 3114 */}
              <div
                className="col-span-12 hidden lg:grid gap-4"
                style={{
                  gridTemplateColumns: "1fr 1fr 1.2fr",
                  gridTemplateAreas: `
                  "sleep social help"
                  "balance balance help"
                `,
                }}
              >
                {/* Sommeil */}
                <div style={{ gridArea: "sleep" }}>
                  <BentoCard
                    topic={topics[1]}
                    onClick={() => setSelectedTopic(topics[1])}
                  />
                </div>

                {/* Liens Sociaux */}
                <div style={{ gridArea: "social" }}>
                  <BentoCard
                    topic={topics[2]}
                    onClick={() => setSelectedTopic(topics[2])}
                  />
                </div>

                {/* Emergency Card 3114 */}
                <div
                  style={{ gridArea: "help" }}
                  className="rounded-[2.5rem] bg-destructive/5 border border-destructive/20 p-8 md:p-10 flex flex-col items-center justify-center gap-6 group hover:bg-destructive/10 transition-all"
                >
                  <div className="w-16 h-16 bg-destructive text-destructive-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-destructive/20">
                    <Phone size={32} />
                  </div>
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter">
                      {data.emergencyCard.title}
                    </h3>
                    <p className="text-destructive font-medium text-sm md:text-base">
                      {data.emergencyCard.description}
                    </p>
                  </div>
                  <a
                    href={`tel:${data.emergencyCard.number}`}
                    className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-destructive hover:scale-105 transition-transform"
                  >
                    {data.emergencyCard.number}
                  </a>
                </div>

                {/* L'Équilibre */}
                <div style={{ gridArea: "balance" }}>
                  <BentoCard
                    topic={topics[3]}
                    onClick={() => setSelectedTopic(topics[3])}
                  />
                </div>
              </div>

              {/* Mobile/Tablet fallback */}
              <div className="col-span-12 lg:hidden grid grid-cols-12 gap-4 md:gap-6">
                <BentoCard
                  topic={topics[1]}
                  onClick={() => setSelectedTopic(topics[1])}
                />
                <BentoCard
                  topic={topics[2]}
                  onClick={() => setSelectedTopic(topics[2])}
                />
                <BentoCard
                  topic={topics[3]}
                  onClick={() => setSelectedTopic(topics[3])}
                />

                {/* 3114 mobile */}
                <div className="col-span-12 rounded-[2.5rem] bg-destructive/5 border border-destructive/20 p-10 flex flex-col md:flex-row items-center justify-between gap-8 group hover:bg-destructive/10 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-destructive text-destructive-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-destructive/20">
                      <Phone size={28} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-bold tracking-tighter">
                        {data.emergencyCard.title}
                      </h3>
                      <p className="text-destructive font-medium text-sm">
                        {data.emergencyCard.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`tel:${data.emergencyCard.number}`}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-destructive hover:scale-105 transition-transform"
                  >
                    {data.emergencyCard.number}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Annuaire Territorial */}
        <section className="py-24 px-6 mt-20 bg-card text-card-foreground rounded-t-[3rem] border-t border-border shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <h2 className="text-6xl font-bold tracking-tighter leading-none">
                {data.annuaire.title}
              </h2>
              <div className="flex bg-secondary p-1 rounded-xl border border-border">
                <button
                  onClick={() => setTab("adults")}
                  className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                    tab === "adults"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {data.annuaire.tabs.adults}
                </button>
                <button
                  onClick={() => setTab("youth")}
                  className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                    tab === "youth"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {data.annuaire.tabs.youth}
                </button>
              </div>
            </div>

            <div className="divide-y divide-border">
              {currentAnnuaire.map((item, i) => (
                <div
                  key={i}
                  className="py-10 flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:px-4 transition-all duration-300"
                >
                  <div className="flex items-center gap-12">
                    <span className="text-muted-foreground font-mono text-xs opacity-30">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-2xl font-bold tracking-tight">
                        {item.city}
                      </h4>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mt-1">
                        {item.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 flex items-center gap-6">
                    <a
                      href={`tel:${item.phone}`}
                      className="text-xl font-bold font-mono tracking-tight hover:text-primary transition-colors"
                    >
                      {item.phone}
                    </a>
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                      <Phone size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Gallery - Bento Dark */}
        <section className="py-32 px-6 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Video Resource */}
            <a
              href="https://youtu.be/IVrRQ72imnU"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-[2.5rem] aspect-square bg-gradient-to-br from-primary via-primary to-primary/80 cursor-pointer hover:shadow-2xl transition-all duration-500 block"
            >
              {/* Miniature YouTube en arrière-plan */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://img.youtube.com/vi/IVrRQ72imnU/maxresdefault.jpg"
                  alt="Miniature vidéo santé mentale"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

              {/* Icône play au centre */}
              <div className="absolute inset-0 flex items-center justify-center z-15">
                <div className="w-20 h-20 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary-foreground/40 group-hover:scale-110 group-hover:bg-primary-foreground/30 transition-all duration-300">
                  <Video
                    size={32}
                    className="text-primary-foreground ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Contenu */}
              <div className="relative z-20 text-primary-foreground p-8 flex flex-col justify-between h-full">
                <div className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground rounded-xl flex items-center justify-center border border-primary-foreground/20">
                  <Video size={20} />
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                    {resources[0].title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm font-light leading-relaxed max-w-sm">
                    {resources[0].description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest pt-2 group-hover:gap-4 transition-all">
                    {resources[0].buttonText}{" "}
                    <ArrowUpRight size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </a>

            {/* Official Resources */}
            <div className="bg-secondary rounded-[2.5rem] border border-border p-8 md:p-12 flex flex-col justify-between aspect-square">
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  {resources[1].title}
                </h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">
                  {resources[1].description}
                </p>

                {/* Logo ARS */}
                <div className="relative w-62 h-62 bg-background border border-border rounded-2xl p-4 shadow-sm">
                  <Image
                    src="/ARS-logo.jpg"
                    alt="Logo ARS"
                    fill
                    className="object-contain p-2"
                    sizes="128px"
                  />
                </div>
              </div>

              <a
                href={resources[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 bg-background border border-border rounded-2xl hover:bg-accent hover:border-primary/20 transition-all group"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {resources[1].buttonText}
                </span>
                <ExternalLink
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Modal - Editorial Overlay */}
        <Dialog
          open={!!selectedTopic}
          onOpenChange={() => setSelectedTopic(null)}
        >
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2.5rem] border border-border">
            <DialogHeader>
              <div className="flex justify-between items-start mb-8">
                <div className="px-4 py-1.5 bg-secondary border border-border rounded-full text-[10px] font-bold uppercase tracking-widest font-mono">
                  {data.modal.indexPrefix} 0{selectedTopic?.id}
                </div>
              </div>
              <DialogTitle className="text-6xl font-bold tracking-tighter mb-8 leading-none">
                {selectedTopic?.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground font-light leading-relaxed mb-12">
                {selectedTopic?.title &&
                  data.modal.modalDescription.replace(
                    "{{title}}",
                    selectedTopic.title.toLowerCase()
                  )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <button className="w-full py-5 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:opacity-90 transition-all">
                {data.modal.readMore} <ChevronRight size={16} />
              </button>
              <button className="w-full py-5 border border-border bg-background rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-accent transition-all">
                <MessageCircle size={16} /> {data.modal.contactPro}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Custom Animation */}
        <style>{`
          @keyframes ping {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
      </div>

      <Footer />
    </main>
  );
}
