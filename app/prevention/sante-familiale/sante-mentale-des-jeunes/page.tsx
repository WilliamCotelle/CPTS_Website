import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Phone,
  BookOpen,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/sante-mentale-des-jeunes.json";

export default function SanteMentaleJeunesPage() {
  const { troublesPsy, pourquoi, reconnaitre, queFaire, dispositifs, livres } =
    data;

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href={data.backLink.href}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{data.backLink.label}</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>{data.date}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
              {data.title}
            </h1>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pt-4 pb-20 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* INTRO */}
            <Card className="border-l-4 border-l-primary border-t-0 border-r-0 border-b-0 rounded-l-none">
              <CardContent className="p-6 lg:p-8 space-y-3">
                <p className="text-lg font-semibold text-foreground leading-relaxed">
                  {data.intro.text}
                </p>
                {data.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* TROUBLES PSYCHIQUES */}
            <div className="space-y-5">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {troublesPsy.title}
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Image */}
                <div className="md:w-100 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={troublesPsy.image}
                    alt={troublesPsy.imageAlt}
                    width={320}
                    height={420}
                    className="w-full h-auto"
                    sizes="320px"
                  />
                </div>

                {/* Liste des troubles */}
                <div className="flex-1 space-y-2">
                  {troublesPsy.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
                    >
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        <span className="font-bold">{item.label}</span>
                        {item.text ? ` : ${item.text}` : ""}
                      </p>
                    </div>
                  ))}
                  <p className="text-sm text-muted-foreground leading-relaxed italic pt-2 border-t border-border">
                    {troublesPsy.conclusion}
                  </p>
                </div>
              </div>
            </div>

            {/* POURQUOI */}
            <Card className="border-orange-200 bg-orange-50/30 relative">
              <div className="absolute -top-6 left-6 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-orange-200 flex items-center justify-center shadow-sm">
                <HelpCircle className="w-5 h-5 lg:w-7 lg:h-7 text-orange-600" />
              </div>
              <CardContent className="p-6 lg:p-8 space-y-4 pt-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {pourquoi.title}
                </h2>
                <p className="font-semibold text-foreground">
                  {pourquoi.intro}
                </p>
                <ul className="space-y-2">
                  {pourquoi.causes.map((c, i) => {
                    const parts = c.split(" : ");
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground text-sm"
                      >
                        <ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <span className="font-bold text-foreground">
                            {parts[0]}
                          </span>
                          {parts.length > 1
                            ? ` : ${parts.slice(1).join(" : ")}`
                            : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {pourquoi.environnement}
                </p>
                {pourquoi.extras.map((e, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground leading-relaxed text-sm"
                  >
                    {e}
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* RECONNAITRE */}
            <Card className="border-purple-200 bg-purple-50/20">
              <CardContent className="p-6 lg:p-8 space-y-5">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {reconnaitre.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {reconnaitre.intro}
                </p>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">
                    {reconnaitre.signesTitle}
                  </p>
                  {reconnaitre.signes.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border border-purple-100"
                    >
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        <span className="font-bold">{s.label}</span>
                        {s.text ? ` : ${s.text}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* QUE FAIRE */}
            <Card className="border-yellow-200 bg-yellow-50/30">
              <CardContent className="p-6 lg:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {queFaire.title}
                  </h2>
                </div>
                <p className="font-bold text-foreground bg-yellow-100 rounded-xl p-4 border border-yellow-200">
                  {queFaire.alert}
                </p>
                <div className="space-y-3">
                  {queFaire.actions.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border border-yellow-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-yellow-700">
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">
                        <span className="font-bold">{a.label}</span>
                        {" — "}
                        {a.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* DISPOSITIFS — LIGNES D'ECOUTE */}
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                {dispositifs.title}
              </h2>

              <Card className="border-blue-200 bg-blue-50/30">
                <CardContent className="p-6 lg:p-8 space-y-6">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {dispositifs.lignesEcoute.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {dispositifs.lignesEcoute.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 3114 et Question Psy — avec images */}
                  <div className="space-y-4">
                    {dispositifs.lignesEcoute.items
                      .filter((item) => item.image)
                      .map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row gap-4 items-start p-4 rounded-xl bg-white border border-blue-100"
                        >
                          <div className="sm:w-56 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                            <Image
                              src={item.image!}
                              alt={item.imageAlt!}
                              width={224}
                              height={140}
                              className="w-full h-auto"
                              sizes="224px"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-foreground mb-1">
                              {item.label}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Autres lignes — sans image */}
                  <div className="space-y-2">
                    {dispositifs.lignesEcoute.items
                      .filter((item) => !item.image)
                      .map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100"
                        >
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground">
                            <span className="font-bold">{item.label}</span>
                            {" : "}
                            {item.text}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* PROFESSIONNELS */}
              <Card className="border-green-200 bg-green-50/30">
                <CardContent className="p-6 lg:p-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {dispositifs.professionnels.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {dispositifs.professionnels.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {dispositifs.professionnels.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white border border-green-100"
                      >
                        <ChevronRight className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 text-sm">
                          <span className="font-bold text-foreground">
                            {item.label}
                          </span>
                          {item.text ? (
                            <span className="text-muted-foreground">
                              {" "}
                              : {item.text}
                            </span>
                          ) : null}
                          {"url" in item && item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 ml-2 text-primary hover:underline"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {item.url}
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* LIVRES */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {livres.title}
                  </h2>
                </div>
                <div className="space-y-3">
                  {livres.items.map((livre, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border border-primary/10"
                    >
                      <BookOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        <span className="font-bold italic">
                          « {livre.title} »
                        </span>
                        {" — "}
                        {livre.authors} ({livre.date})
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
