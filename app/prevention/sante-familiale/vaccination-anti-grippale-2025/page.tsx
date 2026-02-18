import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, FileText, Syringe, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/vaccination-anti-grippale-2025.json";

export default function VaccinationAntiGrippale2025Page() {
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
              </CardContent>
            </Card>

            {/* CHIFFRES CLÉS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.chiffres.map((c, i) => (
                <div key={i} className="rounded-2xl p-6 text-white text-center flex flex-col items-center gap-2" style={{ backgroundColor: c.color }}>
                  <span className="text-3xl font-bold">{c.value}</span>
                  <span className="text-sm leading-snug opacity-90">{c.label}</span>
                </div>
              ))}
            </div>

            {/* ENGAGEMENT CPTS */}
            <Card className="border-l-4 border-l-blue-400 border-t-0 border-r-0 border-b-0 rounded-l-none bg-blue-50/30">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-start gap-3">
                  <Syringe className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{data.engagement}</p>
                </div>
              </CardContent>
            </Card>

            {/* PDF LINKS */}
            <div className="flex flex-col sm:flex-row gap-4">
              {data.pdfLinks.map((pdf, i) => (
                <a
                  key={i}
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-center"
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span>{pdf.label}</span>
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
              ))}
            </div>

            {/* CAMPAGNE — QUI EST CONCERNÉ */}
            <Card className="border-amber-200 bg-amber-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{data.campagne.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{data.campagne.intro}</p>
                <ul className="space-y-2 pt-2">
                  {data.campagne.cibles.map((cible, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                      <span>{cible}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* LE SAVIEZ-VOUS */}
            <Card className="border-green-200 bg-green-50/30">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{data.saviezVous.title}</h2>
                <p className="font-semibold text-foreground">{data.saviezVous.intro}</p>
                <ul className="space-y-2">
                  {data.saviezVous.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* MÉMO GRIPPE */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{data.memo.title}</h3>
              </div>
              <a
                href={data.memo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex-shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>{data.memo.label}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* GESTES BARRIÈRES */}
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{data.gestesBarrieres.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{data.gestesBarrieres.text}</p>
              <div className="rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={data.gestesBarrieres.image}
                  alt={data.gestesBarrieres.imageAlt}
                  width={900}
                  height={600}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>

            {/* OÙ SE FAIRE VACCINER */}
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{data.ouSeVacciner.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{data.ouSeVacciner.text}</p>
              <div className="rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={data.ouSeVacciner.image}
                  alt={data.ouSeVacciner.imageAlt}
                  width={900}
                  height={600}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
