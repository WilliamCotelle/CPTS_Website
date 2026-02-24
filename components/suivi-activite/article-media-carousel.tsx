"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ArticleMediaCarouselProps {
  images: CarouselImage[];
  className?: string;
}

export function ArticleMediaCarousel({
  images,
  className = "",
}: ArticleMediaCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  if (!images.length) return null;

  return (
    <div className={className}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={image.src} className="pl-2 md:pl-4">
              <div className="rounded-none border-0 bg-transparent p-0 shadow-none md:rounded-2xl md:border md:border-border md:bg-card md:p-2 md:shadow-sm">
                <div className="relative aspect-[3/4] md:aspect-[16/10] rounded-xl overflow-hidden bg-transparent md:bg-muted/40">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={68}
                    className="object-contain p-0 md:p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1000px"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-3 bg-white/95 hover:bg-white shadow" />
        <CarouselNext className="hidden md:flex right-3 bg-white/95 hover:bg-white shadow" />
      </Carousel>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Aller à l'image ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === current
                  ? "w-6 bg-primary"
                  : "w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/55"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
