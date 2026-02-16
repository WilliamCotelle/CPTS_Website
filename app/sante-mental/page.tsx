"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Brain, Video } from "lucide-react";
import Image from "next/image";
import { BreathingExercise } from "@/components/breathing-exercise";
import { ColimaconNavigation } from "@/components/sante-mental";

export default function SanteMentalPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-32 min-h-[50vh] lg:min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background">
        {/* Background Gradient uniquement pour le hero */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(
                ellipse 1400px 1000px at 90% 5%,
                rgba(78, 196, 90, 0.45) 0%,
                rgba(16, 185, 129, 0.30) 30%,
                rgba(16, 185, 129, 0.15) 50%,
                transparent 70%
              ),
              radial-gradient(
                ellipse 1200px 900px at 10% 95%,
                rgba(78, 196, 90, 0.40) 0%,
                rgba(20, 184, 166, 0.25) 30%,
                rgba(20, 184, 166, 0.12) 50%,
                transparent 70%
              ),
              linear-gradient(
                180deg,
                rgba(240, 253, 244, 0.50) 0%,
                rgba(255, 255, 255, 0.70) 25%,
                rgba(255, 255, 255, 0.70) 75%,
                rgba(236, 253, 245, 0.40) 100%
              )
            `,
          }}
        />

        {/* Illustration - positionnée en absolu sur desktop */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-10">
          <Image
            src="/santé-mental/Mental health-cuate.svg"
            alt=""
            fill
            className="object-contain"
            priority
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
            {/* Texte */}
            <div className="flex-1 text-center lg:text-left space-y-6 lg:max-w-2xl">
              <h1 className="text-5xl lg:text-8xl font-bold text-foreground text-balance leading-tight">
                Santé mentale
              </h1>
              <p className="text-lg lg:text-2xl text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0 font-light">
                Prendre soin de sa santé mentale, c'est prendre soin de soi
              </p>
              <div className="pt-2">
                <p className="text-sm lg:text-base text-muted-foreground/80">
                  Découvrez nos ressources et professionnels dédiés
                </p>
              </div>
            </div>
            {/* Illustration mobile uniquement */}
            <div className="lg:hidden relative w-64 h-64 mt-8">
              <Image
                src="/santé-mental/Mental health-cuate.svg"
                alt="Illustration santé mentale"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Navigation Colimaçon */}
      <section className="py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ColimaconNavigation />
        </div>
      </section>

      {/* Section Ressources Bento Grid */}
      <section className="py-12 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ressources et outils
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des outils pratiques pour prendre soin de vous
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Exercice de Respiration */}
              <div className="lg:col-span-5 rounded-[2rem] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border p-6 lg:p-8 shadow-sm relative overflow-hidden">
                {/* Background illustration */}
                <div className="absolute inset-0 z-0 opacity-40">
                  <Image
                    src="/santé-mental/respiaration.svg"
                    alt=""
                    fill
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative z-10">
                  <BreathingExercise />
                </div>
              </div>

              {/* Vidéo */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="lg:col-span-7 group relative overflow-hidden rounded-[2rem] aspect-video lg:aspect-auto bg-gradient-to-br from-primary via-primary to-primary/80 cursor-pointer hover:shadow-2xl transition-all duration-500"
              >
                {/* Miniature YouTube */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://img.youtube.com/vi/LD1hk0OVt8Y/maxresdefault.jpg"
                    alt="Miniature vidéo santé mentale"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center z-15">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary-foreground/40 group-hover:scale-110 group-hover:bg-primary-foreground/30 transition-all duration-300">
                    <Video
                      size={28}
                      className="text-primary-foreground ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-20 text-primary-foreground p-6 lg:p-8 flex flex-col justify-between h-full min-h-[300px]">
                  <div className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground rounded-xl flex items-center justify-center border border-primary-foreground/20">
                    <Video size={20} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight">
                      Vidéos pédagogiques
                    </h3>
                    <p className="text-primary-foreground/70 text-sm font-light leading-relaxed ">
                      Un clip Psycom pour comprendre la santé mentale et ce qui
                      l'influence
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest pt-2 group-hover:gap-4 transition-all">
                      Visionner <Video size={14} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </button>

              {/* Lien ARS */}
              <a
                href="https://www.santementale-info-service.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-6 group relative overflow-hidden rounded-[2rem] bg-secondary border border-border p-6 lg:p-8 hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-between gap-4"
              >
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight leading-tight mb-2">
                      Santé Mentale Info Service
                    </h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      Le portail national propose des outils validés par l'ARS
                      et des lignes d'écoute anonymes
                    </p>
                  </div>
                </div>

                {/* Logo ARS */}
                <div className="relative w-28 h-28 lg:w-32 lg:h-32 bg-background border border-border rounded-2xl p-4 shadow-sm flex-shrink-0">
                  <Image
                    src="/ARS-logo.jpg"
                    alt="Logo ARS"
                    fill
                    className="object-contain p-2"
                    sizes="128px"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Accéder au portail
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Lien CPAM - Mon soutien psy */}
              <a
                href="https://www.ameli.fr/assure/actualites/sante-mentale-mon-soutien-psy-pour-un-accompagnement-psychologique-accessible-tous"
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-6 group relative overflow-hidden rounded-[2rem] bg-secondary border border-border p-6 lg:p-8 hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-between gap-4"
              >
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight leading-tight mb-2">
                      Mon soutien psy
                    </h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      Un accompagnement psychologique accessible à tous, proposé
                      par l'Assurance Maladie
                    </p>
                  </div>
                </div>

                {/* Logo CPAM */}
                <div className="relative w-28 h-28 lg:w-32 lg:h-32 bg-background border border-border rounded-2xl p-4 shadow-sm flex-shrink-0">
                  <Image
                    src="/AM-logo.png"
                    alt="Logo Assurance Maladie"
                    fill
                    className="object-contain p-2"
                    sizes="128px"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    En savoir plus
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Dialog - Video */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">
              Comprendre la santé mentale
            </DialogTitle>
            <DialogDescription>
              Un clip Psycom pour comprendre la santé mentale et ce qui
              l'influence
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            {isVideoModalOpen && (
              <iframe
                src="https://www.youtube.com/embed/LD1hk0OVt8Y?autoplay=1"
                title="Vidéo santé mentale"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
