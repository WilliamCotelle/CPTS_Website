"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Gestion du swipe sur mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-4">
        {/* Bouton précédent - à gauche (masqué sur mobile) */}
        <button
          onClick={goToPrevious}
          className="hidden md:flex flex-shrink-0 bg-white hover:bg-gray-50 text-primary rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        <div
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>

        {/* Bouton suivant - à droite (masqué sur mobile) */}
        <button
          onClick={goToNext}
          className="hidden md:flex flex-shrink-0 bg-white hover:bg-gray-50 text-primary rounded-full p-3 shadow-lg transition-all hover:scale-110"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
