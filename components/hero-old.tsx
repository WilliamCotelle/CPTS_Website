"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const newsSlides = [
  {
    title: "Movember 2025",
    description: "Mobilisons-nous pour la santé masculine",
    image: "/movember.webp",
    tag: "Prévention",
    color: "bg-blue-100",
  },
  {
    title: "Vaccination",
    description: "Campagne de vaccination en cours",
    image: "/vaccination.jpg",
    tag: "Actualité",
    color: "bg-accent",
  },
  {
    title: "COVID-19",
    description: "Informations sur la vaccination COVID",
    image: "/covid.jpg",
    tag: "Prévention",
    color: "bg-primary/20",
  },
  {
    title: "Papillomavirus",
    description: "Vaccination contre le HPV",
    image: "/papillomavirus.png",
    tag: "Prévention",
    color: "bg-blue-100",
  },
  {
    title: "Mon Espace Santé",
    description: "Accédez à votre dossier médical en ligne",
    image: "/mon-espace-santé.png",
    tag: "Services",
    color: "bg-pink-50",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [resetTimer]); // Se réinitialise quand resetTimer change

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsSlides.length);
    setResetTimer((prev) => prev + 1); // Force le reset du timer
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + newsSlides.length) % newsSlides.length
    );
    setResetTimer((prev) => prev + 1); // Force le reset du timer
  };

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[30%_70%] gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
              Des acteurs de santé à votre service
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
              Bienvenue sur le site de la Communauté Professionnelle
              Territoriale de santé Ouest Gironde.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="rounded-full font-bold text-sm sm:text-base px-6 sm:px-8 h-12 sm:h-14 w-full lg:w-auto"
              >
                Découvrir nos services
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-bold text-sm sm:text-base px-6 sm:px-8 h-12 sm:h-14 bg-transparent w-full lg:w-auto"
              >
                Professionnels de santé
              </Button>
            </div>
          </div>

          <div className="relative lg:order-last order-first">
            <div className="aspect-[16/10] sm:aspect-[16/11] lg:aspect-[16/12] rounded-3xl overflow-hidden bg-muted relative shadow-2xl">
              {newsSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 60vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                      {slide.tag}
                    </span>
                    <p
                      className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2"
                      role="heading"
                      aria-level={2}
                    >
                      {slide.title}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-white/90">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
              aria-label="Actualité précédente"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
              aria-label="Actualité suivante"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </button>

            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
              role="group"
              aria-label="Navigation carousel"
            >
              {newsSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setResetTimer((prev) => prev + 1);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Aller à ${slide.title}`}
                  aria-current={index === currentSlide ? "true" : "false"}
                />
              ))}
            </div>

            <div className="hidden lg:block absolute -bottom-6 -left-6 w-32 h-32 lg:w-48 lg:h-48 bg-primary/15 rounded-3xl -z-10" />
            <div className="hidden lg:block absolute -top-6 -right-6 w-24 h-24 lg:w-32 lg:h-32 bg-primary/10 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
