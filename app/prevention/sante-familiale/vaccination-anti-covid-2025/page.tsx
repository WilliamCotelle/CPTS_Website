import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, AlertCircle, Phone, Shield, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/vaccination-anti-covid-2025.json";

export default function VaccinationAntiCovid2025Page() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50/40 to-background" />
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
            <Card className="border-l-4 border-l-blue-500 border-t-0 border-r-0 border-b-0 rounded-l-none">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <p className="text-lg font-semibold text-foreground leading-relaxed">{data.intro.text}</p>
                <p className="text-muted-foreground leading-relaxed bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <strong className="text-blue-700">À partir du 15 OCTOBRE 2024</strong>, {data.intro.highlight.replace("À partir du 15 OCTOBRE 2024, les patients sont invités à se faire vacciner contre la GRIPPE ET LA COVID en même temps.", "les patients sont invités à se faire vacciner contre la GRIPPE ET LA COVID en même temps.")}
                </p>
              </CardContent>
            </Card>

            {/* SECTION 1 — Quel vaccin */}
            <Card className="border-sky-200 bg-sky-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[0].title}</h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-sky-100">
                    <p className="font-bold text-sky-700 mb-2">{data.sections[0].vaccine.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{data.sections[0].vaccine.delay}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-sm text-foreground leading-relaxed mb-3">{data.sections[0].vaccine.purpose}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{data.sections[0].vaccine.locations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SECTION 2 — Pour quel public */}
            <Card className="border-blue-200 bg-blue-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[1].title}</h2>
                <p className="text-sm text-muted-foreground">{data.sections[1].intro}</p>
                <div className="space-y-2">
                  {data.sections[1].categories.map((cat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white border border-blue-100">
                      <p className="font-semibold text-foreground text-sm mb-1">• {cat.label}</p>
                      {cat.details && (
                        <p className="text-xs text-muted-foreground leading-relaxed ml-4">{cat.details}</p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-blue-700 font-medium bg-blue-50 border border-blue-100 rounded-xl p-4">
                  {data.sections[1].note}
                </p>
              </CardContent>
            </Card>

            {/* SECTION 3 — Rappels importants */}
            <Card className="border-amber-200 bg-amber-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[2].title}</h2>
                <div className="space-y-3">
                  {data.sections[2].alerts.map((alert, i) => {
                    const colorMap = {
                      warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600" },
                      info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" },
                      highlight: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600" }
                    };
                    const colors = colorMap[alert.type as keyof typeof colorMap];
                    return (
                      <div key={i} className={`p-4 rounded-xl ${colors.bg} border ${colors.border} flex items-start gap-3`}>
                        <AlertCircle className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 space-y-2">
                          <p className="text-sm text-foreground leading-relaxed">{alert.text}</p>
                          {alert.phone && (
                            <a href={`tel:${alert.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors">
                              <Phone className="w-4 h-4" />
                              {alert.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* SECTION 4 — En savoir plus */}
            <Card className="border-sky-200 bg-sky-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[3].title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.sections[3].resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-white border border-sky-100 hover:border-sky-300 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <ExternalLink className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5 group-hover:text-sky-700" />
                        <div>
                          <p className="font-semibold text-foreground text-sm mb-1">{resource.label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SECTION 5 — Gestes barrières */}
            <Card className="border-blue-200 bg-blue-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[4].title}</h2>
                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full aspect-[16/9]">
                    <Image src={data.sections[4].image} alt={data.sections[4].caption} fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-center text-blue-700">{data.sections[4].caption}</p>
                <ul className="space-y-2">
                  {data.sections[4].measures.map((measure, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground leading-relaxed bg-blue-100 border border-blue-200 rounded-xl p-4 font-medium">
                  {data.sections[4].highlight}
                </p>
                {data.sections[4].imageBottom && (
                  <div className="rounded-xl overflow-hidden">
                    <div className="relative w-full aspect-[16/9]">
                      <Image src={data.sections[4].imageBottom} alt="Protéger" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SECTION 6 — Test positif */}
            <Card className="border-red-200 bg-red-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[5].title}</h2>
                <div className="rounded-xl overflow-hidden mb-4">
                  <div className="relative w-full aspect-[16/9]">
                    <Image src={data.sections[5].image} alt="Test COVID positif" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
                </div>
                <div className="space-y-3">
                  {data.sections[5].content.map((c, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                  ))}
                </div>
                <div className="space-y-3 mt-4">
                  {data.sections[5].rules.map((rule, i) => {
                    const colorMap = {
                      info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" },
                      warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600" }
                    };
                    const colors = colorMap[rule.type as keyof typeof colorMap];
                    return (
                      <div key={i} className={`p-4 rounded-xl ${colors.bg} border ${colors.border} flex items-start gap-3`}>
                        <Info className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                        <p className="text-sm text-foreground leading-relaxed">
                          {rule.date && <strong>{rule.date}</strong>} {rule.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* SECTION 7 — Cas contact */}
            <Card className="border-purple-200 bg-purple-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[6].title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{data.sections[6].intro}</p>
                <p className="text-sm font-semibold text-foreground">{data.sections[6].subtitle}</p>
                <ul className="space-y-2">
                  {data.sections[6].measures.map((measure, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground p-3 rounded-xl bg-white border border-purple-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* SECTION 8 — Où se faire vacciner */}
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.sections[7].title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed bg-white border border-green-100 rounded-xl p-4">
                  {data.sections[7].text}
                </p>
                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full aspect-[3/4]">
                    <Image src={data.sections[7].image} alt="Centre de vaccination" fill className="object-contain" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
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
