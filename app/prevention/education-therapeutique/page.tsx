import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
// import { BackgroundGradient0 } from "@/components/background-gradient";
import { Card, CardContent } from "@/components/ui/card";

import educationData from "@/app/data/education-therapeutique.json";

export default function EducationTherapeutiquePage() {
  return (
    <main className="min-h-screen relative">
      {/* <BackgroundGradient0 /> */}
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-16 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left: copy */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                  Éducation thérapeutique
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Des contenus simples et concrets pour mieux vivre avec une
                  maladie chronique, gagner en autonomie et trouver les bons
                  accompagnements près de chez vous.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#articles"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
                  >
                    Voir les articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right: visual */}
              <div className="relative scale-110">
                <div className="relative aspect-[16/11]">
                  <Image
                    src="/éducation-thérap/education-thérap.svg"
                    alt="Illustration éducation thérapeutique"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-12 h-px w-full bg-border/60" />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="py-10 lg:py-16 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-2">
              <h2 className="text-2xl lg:text-4xl font-bold text-foreground">
                Articles & ressources
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Parcourez nos contenus. Chaque ressource est pensée pour être
                claire et utile.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {educationData.articles.map((article) => (
                <Link key={article.id} href={article.link} className="group">
                  <Card className="h-full overflow-hidden border bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <CardContent className="p-0">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-transparent opacity-90" />
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{article.date}</span>
                          </div>
                          <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition">
                            Lire
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
