import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/insomnie.json";

export default function InsomniePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-background" />
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
            <Card className="border-l-4 border-l-indigo-400 border-t-0 border-r-0 border-b-0 rounded-l-none">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <p className="text-lg font-semibold text-foreground leading-relaxed">{data.intro.text}</p>
                {data.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </CardContent>
            </Card>

            {/* CHIFFRES CLÉS */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wide">{data.chiffres.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.chiffres.stats.map((s, i) => {
                  const colors = ["bg-indigo-600", "bg-purple-600", "bg-violet-600"];
                  return (
                    <div key={i} className={`${colors[i]} rounded-2xl p-6 flex flex-col items-center text-center text-white`}>
                      <span className="text-3xl font-black mb-2">{s.value}</span>
                      <span className="text-xs leading-snug opacity-90">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FACTEURS */}
            <Card className="border-indigo-200 bg-indigo-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.facteurs.title}</h2>
                <p className="text-sm font-semibold text-indigo-700">{data.facteurs.intro}</p>
                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full aspect-[16/9]">
                    <Image src={data.facteurs.image} alt="Facteurs agissant sur le sommeil" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
                </div>
                <ul className="space-y-2">
                  {data.facteurs.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* TRAITEMENTS */}
            <Card className="border-purple-200 bg-purple-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.traitements.title}</h2>
                <p className="text-sm font-semibold text-purple-700">{data.traitements.intro}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {data.traitements.images.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden bg-white p-4">
                        <div className="relative w-32 h-32 mx-auto">
                          <Image src={img} alt={`Traitement ${idx + 1}`} fill className="object-contain" sizes="128px" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-5">
                    {data.traitements.sections.map((section, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-purple-100">
                        <p className="font-bold text-foreground text-sm mb-2">{section.title}</p>
                        {section.subtitle && <p className="text-xs font-semibold text-purple-600 mb-2">{section.subtitle}</p>}
                        <ul className="space-y-1.5">
                          {section.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TCC */}
            <Card className="border-violet-200 bg-violet-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1">{data.therapies.title}</h2>
                  <p className="text-sm font-semibold text-violet-700">{data.therapies.intro}</p>
                </div>

                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full aspect-[4/3]">
                    <Image src={data.therapies.image} alt="Thérapies cognitivo-comportementales" fill className="object-contain" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
                </div>

                <div className="space-y-3">
                  {data.therapies.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* RELAXATION */}
            <Card className="border-indigo-200 bg-indigo-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.relaxation.title}</h2>

                <div className="rounded-xl overflow-hidden bg-white p-6">
                  <div className="relative w-full aspect-square max-w-xs mx-auto">
                    <Image src={data.relaxation.image} alt="Techniques de relaxation" fill className="object-contain" sizes="(max-width: 768px) 100vw, 400px" />
                  </div>
                </div>

                <div className="space-y-3">
                  {data.relaxation.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* MÉDICAMENTS */}
            <Card className="border-purple-200 bg-purple-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{data.medicaments.title}</h2>
                  <p className="text-sm font-semibold text-purple-700 leading-relaxed">{data.medicaments.intro}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-xl overflow-hidden">
                    <div className="relative w-full aspect-square">
                      <Image src={data.medicaments.image} alt="Médicaments contre l'insomnie" fill className="object-cover" sizes="(max-width: 768px) 100vw, 450px" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {data.medicaments.items.map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-purple-100">
                        <p className="font-bold text-foreground text-sm mb-2">{item.title}</p>
                        <div className="space-y-1.5">
                          {item.content.map((text, j) => (
                            <p key={j} className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HYPNOTIQUES */}
            <Card className="border-violet-200 bg-violet-50/30">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{data.hypnotiques.title}</h2>

                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full aspect-[16/9]">
                    <Image src={data.hypnotiques.image} alt="Types d'hypnotiques" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
                  </div>
                </div>

                <div className="space-y-5">
                  {data.hypnotiques.types.map((type, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white border border-violet-100">
                      <h3 className="font-bold text-foreground text-sm mb-3">{type.title}</h3>
                      <div className="space-y-2">
                        {type.content.map((text, j) => (
                          <p key={j} className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                        ))}
                        {type.risks && (
                          <ul className="space-y-1 mt-2">
                            {type.risks.map((risk, k) => (
                              <li key={k} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {type.notes && (
                          <div className="mt-3 space-y-1">
                            {type.notes.map((note, l) => (
                              <p key={l} className="text-xs text-violet-700 leading-relaxed">{note}</p>
                            ))}
                          </div>
                        )}
                      </div>
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
