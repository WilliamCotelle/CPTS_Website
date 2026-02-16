"use client";

import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[45%_55%] gap-16 items-center max-w-[1400px] mx-auto">
          {/* Left side - Content */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary tracking-wide">
                CPTS OUEST GIRONDE
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              Des acteurs de santé{" "}
              <span className="text-primary">à votre service</span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light max-w-xl">
              La Communauté Professionnelle Territoriale de Santé accompagne
              patients et professionnels pour une santé de proximité et de
              qualité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                size="lg"
                className="rounded-full font-bold text-lg px-10 h-16 shadow-xl hover:shadow-2xl transition-all"
              >
                Nos services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full font-bold text-lg px-10 h-16 border-2 hover:bg-primary/5"
              >
                Professionnels de santé
              </Button>
            </div>
          </div>

          {/* Right side - Organic grid with varied sizes */}
          <div className="relative hidden lg:block h-[650px]">
            {/* Large circle - Top left (Doctor) */}
            <div className="absolute top-0 left-0 w-[280px] h-[280px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=600&fit=crop"
                alt="Médecin"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>

            {/* Medium circle - Top right (Nurse with yellow bg) */}
            <div className="absolute top-8 right-12 w-[220px] h-[220px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white bg-yellow-100">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop"
                alt="Infirmière"
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>

            {/* Large circle - Middle left (Illustration stéthoscope + téléphone - rose magenta) */}
            <div className="absolute top-[220px] left-4 w-[260px] h-[260px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center p-8">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white">
                <path
                  d="M60 80 Q60 40 90 40 Q120 40 120 80 L120 100 Q120 120 100 120 Q80 120 80 100 Z"
                  fill="currentColor"
                  opacity="0.9"
                />
                <circle cx="90" cy="130" r="15" fill="currentColor" />
                <path
                  d="M90 145 L90 165"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <rect
                  x="70"
                  y="50"
                  width="35"
                  height="60"
                  rx="8"
                  fill="currentColor"
                  opacity="0.8"
                />
                <circle
                  cx="140"
                  cy="90"
                  r="25"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M130 85 Q140 75 150 85"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>

            {/* Extra Large circle - Center (Doctor with blue scrubs) */}
            <div className="absolute top-[180px] left-[240px] w-[320px] h-[320px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&h=700&fit=crop"
                alt="Professionnel de santé"
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>

            {/* Medium circle - Bottom left (Doctor portrait) */}
            <div className="absolute bottom-8 left-16 w-[240px] h-[240px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white bg-gray-50">
              <Image
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&h=500&fit=crop"
                alt="Médecin"
                fill
                className="object-cover"
                sizes="240px"
              />
            </div>

            {/* Medium circle - Bottom center (Illustration ambulance - jaune) */}
            <div className="absolute bottom-16 left-[280px] w-[200px] h-[200px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center p-6">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white">
                <rect
                  x="40"
                  y="80"
                  width="100"
                  height="60"
                  rx="8"
                  fill="currentColor"
                />
                <rect
                  x="120"
                  y="95"
                  width="30"
                  height="30"
                  rx="4"
                  fill="currentColor"
                  opacity="0.9"
                />
                <circle cx="65" cy="145" r="12" fill="white" />
                <circle cx="115" cy="145" r="12" fill="white" />
                <path d="M90 60 L110 60 L110 80 L90 80 Z" fill="#FF4444" />
                <path
                  d="M100 50 L100 90 M80 70 L120 70"
                  stroke="#FF4444"
                  strokeWidth="6"
                />
                <rect
                  x="50"
                  y="65"
                  width="15"
                  height="8"
                  fill="white"
                  opacity="0.7"
                />
              </svg>
            </div>

            {/* Small circle - Bottom right (Illustration mains communauté - violet) */}
            <div className="absolute bottom-24 right-20 w-[180px] h-[180px] rounded-full overflow-hidden shadow-2xl border-[6px] border-white bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-6">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white">
                <path
                  d="M60 100 L60 130 Q60 140 70 140 L90 140 L90 120 L80 120 L80 100 Z"
                  fill="currentColor"
                />
                <path
                  d="M140 100 L140 130 Q140 140 130 140 L110 140 L110 120 L120 120 L120 100 Z"
                  fill="currentColor"
                />
                <ellipse
                  cx="100"
                  cy="85"
                  rx="35"
                  ry="25"
                  fill="currentColor"
                  opacity="0.8"
                />
                <path
                  d="M75 95 Q100 110 125 95"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Mobile version */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mt-12">
            <div className="rounded-full overflow-hidden shadow-xl border-4 border-white aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
                alt="Médecin"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-full overflow-hidden shadow-xl border-4 border-white aspect-square bg-yellow-100">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"
                alt="Infirmière"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-full overflow-hidden shadow-xl border-4 border-white aspect-square bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center p-6">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <div className="rounded-full overflow-hidden shadow-xl border-4 border-white aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
                alt="Professionnel"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
