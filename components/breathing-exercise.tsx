"use client";

import { useState, useEffect } from "react";
import { Wind } from "lucide-react";

export function BreathingExercise() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inspire" | "expire">("inspire");
  const [countdown, setCountdown] = useState(5);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [guidanceIndex, setGuidanceIndex] = useState(0);

  const breathingData = {
    title: "Respirer pour s'apaiser",
    subtitle: "Laissez-vous guider par un exercice simple pour apaiser le corps et le mental.",
    clickToStart: "Cliquez sur le cercle pour commencer",
    instructions: {
      inspire: "Inspirez par le nez",
      expire: "Expirez par la bouche"
    },
    guidance: {
      intro: "Installez-vous confortablement. 5 minutes, 30 respirations.",
      during: [
        "Concentrez-vous sur votre respiration",
        "Laissez votre rythme cardiaque se stabiliser",
        "Vous réglez progressivement votre système nerveux",
        "Continuez à respirer calmement",
        "Chaque respiration apaise votre corps",
        "Maintenez ce rythme régulier"
      ],
      outro: "Exercice terminé. Prenez quelques instants pour ressentir les effets."
    }
  };

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
      const nextPhase = breathPhase === "inspire" ? "expire" : "inspire";
      setBreathPhase(nextPhase);
      setCountdown(5);

      if (breathPhase === "expire") {
        const newTotal = totalBreaths + 1;
        setTotalBreaths(newTotal);

        if (newTotal % 5 === 0 && newTotal < 30) {
          setGuidanceIndex((g) => (g + 1) % breathingData.guidance.during.length);
        }

        if (newTotal >= 30) {
          setIsBreathing(false);
        }
      }
    }
  }, [countdown, isBreathing, breathPhase, totalBreaths, breathingData.guidance.during.length]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      if (totalBreaths === 0) {
        setShowIntro(true);
        setTimeout(() => {
          setShowIntro(false);
          setCountdown(5);
          setBreathPhase("inspire");
          setTotalBreaths(0);
          setGuidanceIndex(0);
          setIsBreathing(true);
        }, 3000);
      } else {
        setCountdown(5);
        setBreathPhase("inspire");
        setIsBreathing(true);
      }
    } else {
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

  const remainingBreaths = 30 - totalBreaths;
  const remainingSeconds = remainingBreaths * 10;
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsDisplay = remainingSeconds % 60;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Wind className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
          {breathingData.title}
        </h3>
        <p className="text-base text-muted-foreground">
          {breathingData.subtitle}
        </p>
      </div>

      {/* Breathing Circle */}
      <div className="relative flex flex-col items-center justify-center py-8">
        <button
          onClick={toggleBreathing}
          className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          aria-label={isBreathing ? "Pause l'exercice" : "Démarrer l'exercice"}
        >
          <div
            className={`w-56 h-56 lg:w-72 lg:h-72 rounded-full border-4 transition-all duration-1000 ease-in-out ${
              isBreathing || showIntro
                ? breathPhase === "inspire"
                  ? "border-primary shadow-lg shadow-primary/50"
                  : "border-secondary shadow-lg shadow-secondary/50"
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
            <div className="w-52 h-52 lg:w-68 lg:h-68 rounded-full bg-card border-2 border-border flex flex-col items-center justify-center p-6">
              {showIntro ? (
                <div className="text-center space-y-3">
                  <Wind size={40} className="text-primary mx-auto mb-3 animate-pulse" />
                  <p className="text-sm text-muted-foreground leading-snug">
                    {breathingData.guidance.intro}
                  </p>
                </div>
              ) : totalBreaths >= 30 ? (
                <div className="text-center space-y-3">
                  <div className="text-5xl">✓</div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {breathingData.guidance.outro}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetExercise();
                    }}
                    className="mt-4 text-xs text-primary hover:underline font-medium"
                  >
                    Recommencer
                  </button>
                </div>
              ) : isBreathing ? (
                <>
                  <span className="text-6xl lg:text-7xl font-bold text-primary mb-4">
                    {countdown}
                  </span>
                  <span className="text-base lg:text-lg font-semibold text-center">
                    {breathPhase === "inspire"
                      ? breathingData.instructions.inspire
                      : breathingData.instructions.expire}
                  </span>
                  <span className="text-xs text-muted-foreground mt-3">
                    {totalBreaths + 1}/30
                  </span>
                </>
              ) : (
                <div className="text-center space-y-3">
                  <Wind
                    size={48}
                    className="text-primary mx-auto group-hover:scale-110 transition-transform"
                  />
                  <p className="text-sm text-muted-foreground font-medium">
                    {totalBreaths === 0
                      ? breathingData.clickToStart
                      : "Cliquez pour reprendre"}
                  </p>
                  {totalBreaths > 0 && totalBreaths < 30 && (
                    <span className="text-xs text-muted-foreground">{totalBreaths}/30</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </button>

        {/* Progress & Guidance */}
        {(isBreathing || totalBreaths > 0) && totalBreaths < 30 && !showIntro && (
          <div className="mt-6 text-center space-y-3">
            {isBreathing && (
              <p className="text-sm text-primary/70 italic min-h-[2rem] flex items-center justify-center">
                {breathingData.guidance.during[guidanceIndex]}
              </p>
            )}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>
                Temps restant : {remainingMinutes}:
                {remainingSecondsDisplay.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
