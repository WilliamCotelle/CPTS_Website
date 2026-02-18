import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Calendar, ExternalLink, TrendingDown,
  Heart, Wind, Users, Wallet, Phone, Smartphone, Globe,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/mois-sans-tabac-2025.json";

const IconMap: Record<string, LucideIcon> = { Heart, Wind, Users, Wallet };

export default function MoisSansTabac2025Page() {
  const s0 = data.sections[0];
  const s1 = data.sections[1];
  const s2 = data.sections[2];
  const s3 = data.sections[3];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href={data.backLink.href} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
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
                <Image src={data.image} alt={data.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 900px" />
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
              <CardContent className="p-6 lg:p-8 space-y-4">
                <p className="text-lg font-semibold text-foreground leading-relaxed">{data.intro.text}</p>
                {data.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
                <ul className="space-y-2 pt-2 border-t border-border">
                  {data.stats.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <TrendingDown className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* SECTION 1 — LES CHIFFRES (bento) */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{s0.number}</div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{s0.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Col gauche */}
                <div className="flex flex-col gap-3">
                  <div className="flex-1 rounded-2xl p-5 flex items-center justify-center text-center font-semibold text-white text-sm leading-snug min-h-[120px]" style={{ backgroundColor: "#7bc043" }}>
                    {s0.stats[0]}
                  </div>
                  <div className="flex-1 rounded-2xl p-5 flex items-center justify-center text-center font-semibold text-white text-sm leading-snug min-h-[120px]" style={{ backgroundColor: "#7b9db4" }}>
                    {s0.stats[1]}
                  </div>
                </div>

                {/* Image centrale */}
                <div className="relative rounded-2xl overflow-hidden min-h-[260px]">
                  <Image
                    src={s0.image}
                    alt={s0.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Col droite */}
                <div className="flex flex-col gap-3">
                  <div className="flex-1 rounded-2xl p-5 flex items-center justify-center text-center font-semibold text-white text-sm leading-snug min-h-[120px]" style={{ backgroundColor: "#d4848a" }}>
                    {s0.stats[2]}
                  </div>
                  <div className="flex-1 rounded-2xl p-5 flex items-center justify-center text-center font-semibold text-white text-sm leading-snug min-h-[120px]" style={{ backgroundColor: "#c0392b" }}>
                    {s0.stats[3]}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2 — POURQUOI ARRÊTER */}
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">{s1.number}</div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{s1.title}</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Image poney */}
                  <div className="md:w-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={s1.image}
                      alt={s1.imageAlt}
                      width={280}
                      height={380}
                      className="w-full h-auto"
                      sizes="280px"
                    />
                  </div>

                  {/* Raisons */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s1.reasons.map((r, i) => {
                      const Icon = IconMap[r.iconName];
                      return (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-green-100 shadow-sm">
                          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-green-700" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm mb-1">{r.label}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{r.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 3 — OUTILS */}
            <Card className="border-amber-200 bg-amber-50/30">
              <CardContent className="p-6 lg:p-8 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">{s2.number}</div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{s2.title}</h2>
                </div>

                {/* 3 outils */}
                <div className="space-y-3">
                  {s2.tools.map((t, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-amber-100">
                      <div className="bg-amber-100/70 px-4 py-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <p className="font-bold text-foreground text-sm">{t.title}</p>
                      </div>
                      <div className="px-4 py-3 bg-white">
                        <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kit d'arrêt — image gauche / texte droite */}
                <div className="flex flex-col sm:flex-row gap-5 items-center p-4 rounded-xl bg-white border border-amber-100">
                  <div className="sm:w-40 flex-shrink-0">
                    <Image
                      src={s2.kitImage}
                      alt={s2.kitImageAlt}
                      width={160}
                      height={130}
                      className="w-full h-auto rounded-lg"
                      sizes="160px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1 text-sm">Le kit d'aide à l'arrêt</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Les pharmaciens peuvent distribuer gratuitement des kits d'aide à l'arrêt du tabac durant le mois de novembre pour accompagner les fumeurs souhaitant relever le challenge.
                    </p>
                  </div>
                </div>

                {/* Tabac info service */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground">{s2.tabacInfoService.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s2.tabacInfoService.intro}</p>
                  <ul className="space-y-2">
                    {s2.tabacInfoService.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="font-bold text-foreground italic text-sm">{s2.tabacInfoService.subtitle}</p>

                  {/* 3 moyens avec icônes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {([
                      { Icon: Phone, text: s2.tabacInfoService.moyens[0] },
                      { Icon: Smartphone, text: s2.tabacInfoService.moyens[1] },
                      { Icon: Globe, text: s2.tabacInfoService.moyens[2] },
                    ] as { Icon: LucideIcon; text: string }[]).map(({ Icon, text }, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-100">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-amber-700" />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="max-w-sm mx-auto">
                    <Image src={s2.tabacInfoService.image} alt={s2.tabacInfoService.imageAlt} width={400} height={200} className="w-full h-auto rounded-xl" sizes="(max-width: 768px) 100vw, 400px" />
                  </div>
                </div>

                {/* Liens externes */}
                <div className="space-y-3">
                  {s2.links.map((link, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-white border border-amber-100">
                      <p className="text-sm text-muted-foreground flex-1">{link.description}</p>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex-shrink-0">
                        <ExternalLink className="w-4 h-4" />
                        {link.label}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Podcast */}
                <div className="flex flex-col md:flex-row gap-5 items-start p-4 rounded-xl bg-white border border-amber-100">
                  <div className="md:w-60 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                    <Image src={s2.podcast.image} alt={s2.podcast.imageAlt} width={240} height={240} className="w-full h-auto" sizes="240px" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-2">{s2.podcast.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s2.podcast.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 4 — ÊTES-VOUS DÉPENDANT ? */}
            <Card className="border-rose-200 bg-rose-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-700">{s3.number}</div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{s3.title}</h2>
                </div>

                {/* Test Fagerström — pleine largeur en haut */}
                {s3.image && (
                  <div className="rounded-xl overflow-hidden shadow-sm">
                    <Image src={s3.image} alt={s3.imageAlt ?? ""} width={800} height={600} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 800px" />
                  </div>
                )}

                {/* Texte + GIFs Glow Up en dessous */}
                {s3.glowUp && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{s3.glowUp.text}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {s3.glowUp.images.map((img, i) => (
                        <div key={i} className="flex-1 rounded-lg overflow-hidden shadow-sm">
                          <Image src={img} alt={`Glow Up challenge ${i + 1}`} width={400} height={300} className="w-full h-auto" sizes="(max-width: 640px) 100vw, 50vw" unoptimized />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
