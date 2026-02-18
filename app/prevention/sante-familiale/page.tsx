"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import data from "@/app/data/sante-familiale.json";

export default function SanteFamilialePage() {
  const [page, setPage] = useState(1);

  const perPage = data.articlesPerPage;
  const total = data.articles.length;
  const totalPages = Math.ceil(total / perPage);

  const start = (page - 1) * perPage;
  const articles = data.articles.slice(start, start + perPage);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section - Full screen height */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50/50 via-background to-pink-50/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl mx-auto">
            {/* Texte */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <div className="w-12 lg:w-16 h-1 bg-primary rounded-full" />
                <span className="text-xs lg:text-sm font-semibold text-primary uppercase tracking-widest">
                  Prévention
                </span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                {data.hero.title}
              </h1>
              <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                {data.hero.subtitle}
              </p>
            </div>

            {/* Illustration */}
            <div className="flex-1 relative w-full max-w-sm lg:max-w-xl h-[280px] lg:h-[500px]">
              <Image
                src="/prevention/sante-famille/sante-famille-hero.svg"
                alt="Santé familiale illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 lg:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 max-w-5xl mx-auto">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={article.href ?? `#${article.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
                  />
                </div>

                {/* Title */}
                <h2 className="text-sm font-black uppercase tracking-wide text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                  {article.title}
                </h2>

                {/* Separator */}
                <div className="w-8 h-0.5 bg-primary mb-3" />

                {/* Date */}
                <div className="flex items-center gap-1.5 text-primary text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.dateLabel}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Page précédente"
                className="w-9 h-9 flex items-center justify-center border border-border rounded text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-label={`Page ${n}`}
                  className={`w-9 h-9 flex items-center justify-center border rounded text-sm font-medium transition-colors ${
                    n === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Page suivante"
                className="w-9 h-9 flex items-center justify-center border border-border rounded text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
