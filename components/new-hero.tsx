import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function NewHero() {
  return (
    <section className="relative pt-32 pb-8 lg:pt-22 lg:pb-32 overflow-hidden bg-transparent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
          <div className="flex-1 text-left z-10 relative">
            <h1 className="text-4xl lg:text-7xl font-black text-foreground mb-4 lg:mb-8 leading-[1.1] tracking-tight">
              Des acteurs
              <br />
              de <span className="text-primary">santé</span>
              <br />à votre <span className="text-primary">service</span>.
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground max-w-xl mb-6 lg:mb-12 leading-relaxed">
              La Communauté Professionnelle Territoriale de Santé <br />
              accompagne les patients et professionnels <br /> pour une santé de
              proximité et de qualité.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#actualites">
                <Button
                  size="lg"
                  className="gap-2 px-10 lg:px-14 lg:h-16 lg:text-lg shadow-xl shadow-primary/20"
                >
                  Nos actualités <Newspaper className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
              </Link>
              <Link href="/presentation">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 lg:px-14 lg:h-16 lg:text-lg"
                >
                  Découvrir la CPTS{" "}
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Illustration principale */}
          {/*
            AJUSTER LA TAILLE DESKTOP:
            - lg:max-w-3xl = largeur max (options: lg:max-w-2xl, lg:max-w-3xl, lg:max-w-4xl, lg:max-w-5xl)
            - lg:h-[800px] = hauteur (change le nombre: 700px, 800px, 900px, etc.)
          */}
          <div className="flex-1 relative w-full lg:w-auto mt-4 lg:mt-0">
            <div className="relative mx-auto lg:ml-auto max-w-sm lg:max-w-5xl h-[320px] lg:h-[700px]">
              <Image
                src="/hero/hero-illustration-team.png"
                alt="Illustration professionnels de santé"
                fill
                className="
    object-contain
    lg:scale-140
    lg:origin-center
  "
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
