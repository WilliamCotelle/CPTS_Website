import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen, Users, Heart } from "lucide-react";


import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

import educationData from "@/app/data/education-therapeutique.json";

export default function EducationTherapeutiquePage() {
  return (
    <main className="min-h-screen relative">
      <Header />

      {/* Hero — min-h-screen mobile, h-screen desktop */}
      <section className="relative min-h-screen lg:h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-emerald-50/50 via-background to-teal-50/30 pt-32 lg:pt-0 pb-12 lg:pb-0">
        {/* Orbes */}
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20 max-w-6xl mx-auto">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight">
                {educationData.hero.title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Des contenus simples et concrets pour mieux vivre avec une
                maladie chronique, gagner en autonomie et trouver les bons
                accompagnements près de chez vous.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  { icon: Heart, label: "Diabète, HTA, insuffisance cardiaque…", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { icon: Users, label: "Conseils rédigés par des professionnels de santé", color: "bg-teal-50 text-teal-700 border-teal-200" },
                  { icon: BookOpen, label: "Articles clairs et accessibles à tous", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                ].map(({ icon: Icon, label, color }) => (
                  <span key={label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${color}`}>
                    <Icon className="w-3 h-3" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex justify-center lg:justify-start">
                <a
                  href="#articles"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90 transition"
                >
                  Voir les articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right: illustration + points clés */}
            <div className="flex-1 flex flex-col items-center gap-5 w-full">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-[220px] sm:h-[280px] lg:h-[380px]">
                <Image
                  src="/éducation-thérap/education-thérap.svg"
                  alt="Illustration éducation thérapeutique"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 80vw, 50vw"
                />
              </div>

              {/* Points clés */}
              <div className="flex flex-col gap-2 w-full max-w-sm lg:max-w-md">
                {[
                  { label: "Mieux comprendre sa maladie au quotidien", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
                  { label: "Identifier les bons réflexes et les bonnes questions à poser", color: "bg-teal-50 border-teal-100 text-teal-700" },
                  { label: "Trouver des ressources et des accompagnements près de chez vous", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
                ].map((item) => (
                  <div key={item.label} className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 ${item.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                    <p className="text-xs sm:text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator — desktop only */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground/40 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </div>
      </section>

      {/* Articles */}
      <section id="articles" className="py-16 lg:py-24 bg-gradient-to-b from-background to-emerald-50/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="mb-10 flex flex-col gap-2">
              <h2 className="text-lg lg:text-xl font-bold text-foreground uppercase tracking-wide">
                Articles & ressources
              </h2>
              <div className="w-14 h-1 bg-primary rounded-full mb-2" />
              <p className="text-muted-foreground max-w-2xl">
                Parcourez nos contenus. Chaque ressource est pensée pour être claire et utile.
              </p>
            </div>

            {/* Cards en format large horizontal */}
            <div className="flex flex-col gap-8">
              {educationData.articles.map((article, index) => (
                <Link key={article.id} href={article.link} className="group">
                  <Card className="overflow-hidden border hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-stretch`}>
                        {/* Image */}
                        <div className="relative w-full md:w-2/5 aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center space-y-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{article.date}</span>
                          </div>

                          <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>

                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                            Lire l'article
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
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
