import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const mentalHealthSlides = [
  "/prevention/sante-famille/movember/la-sante-mental-homme.png",
  "/prevention/sante-famille/movember/la-sante-mental-homme-1.png",
  "/prevention/sante-famille/movember/la-sante-mental-homme-2.png",
  "/prevention/sante-famille/movember/la-sante-mental-homme-3.png",
  "/prevention/sante-famille/movember/la-sante-mental-homme-4.png",
  "/prevention/sante-famille/movember/la-sante-mental-homme-5.png",
];

const moActions = [
  "Courez ou marchez 60 kms sur le mois et partagez-le sur les réseaux",
  "Organisez un Mo-Ment",
  "Créez votre Mo Challenge",
];

const bergonieProgram = [
  {
    date: "Mardi 3 mars",
    location:
      "Institut Bergonié – Hall A (9h à 11h30) puis Cafétéria (11h30 à 14h)",
    details: [
      "Stand de prévention animé par l'équipe Prévention et des médecins du Groupe Digestif de l'Institut Bergonié.",
      "Distribution de kits de dépistage et de supports d'information.",
    ],
  },
  {
    date: "Mardi 3 mars",
    location: "Place Pey-Berland – 11h à 14h",
    details: [
      "Stand de prévention animé par l'équipe Prévention et des médecins du Groupe Digestif avec le Bergo'Bus, en partenariat avec la Ligue contre le cancer de la Gironde.",
      "Distribution de kits de dépistage et de documentation d'information.",
    ],
  },
  {
    date: "Jeudi 5 mars",
    location: "Hôpital Charles Perrens",
    details: [
      "L'équipe Prévention de l'Institut Bergonié se déplace avec le Bergo'Bus pour une action de sensibilisation au cancer colorectal.",
    ],
  },
  {
    date: "Lundi 9 mars",
    location: "Mairie de Bordeaux – 18h à 19h30",
    details: [
      "Sous l'impulsion de Bordeaux Colorectal Institute, une conférence réunira professionnels de santé et acteurs institutionnels autour des enjeux du dépistage et du parcours de soins du cancer colorectal.",
      "L'Institut sera représenté par le Dr Simon Pernot pour animer un temps d'échange sur la thématique « Comprendre la chimiothérapie : Pourquoi et pour quels patients ? » ainsi que par Mme Céline Etchetto, Directrice Générale adjointe.",
    ],
  },
];

export default function Movember2026Page() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-slate-700/5 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/prevention/sante-familiale"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Santé familiale
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>27 février 2026</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
              MOVEMBER 2026
            </h1>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/prevention/sante-famille/movember-2026.png"
                alt="Movember 2026"
                fill
                className="object-cover"
                priority
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-20 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            <Card className="border-l-4 border-l-primary border-t-0 border-r-0 border-b-0 rounded-l-none bg-primary/5">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">MOVEMBER 2026</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dans la lignée d'Octobre Rose, la campagne annuelle Movember vise à sensibiliser
                  sur les maladies masculines (en particulier le cancer de la prostate) et ce depuis 2003.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Généralement, les hommes meurent <strong className="text-foreground">4,5 ans plus tôt</strong> que les femmes.
                  On peut se mobiliser pour réduire cet écart sur des pathologies qui peuvent être prévenues.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Version de travail: les informations 2026 seront mises à jour avec tes éléments finaux.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Le mois de la moustache ?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tous les hommes sont invités à se <strong className="text-foreground">laisser pousser la moustache pendant 30 jours</strong>.
                  Cette manifestation a pour but de récolter des fonds et de sensibiliser les hommes
                  sur les cancers (prostate, testicule), la santé mentale ainsi que la prévention contre le suicide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  La multiplication des moustaches au mois de novembre attire l'attention,
                  suscite les conversations et libère la parole.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  En 2024, Benjamin souhaite aller plus loin et <strong className="text-foreground">récolter au moins 1000EUR pour Movember</strong>.
                </p>

                <ul className="space-y-2">
                  {moActions.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="sm" className="rounded-full">
                  <a
                    href="https://swll.to/U7N1q"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lien de mobilisation
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Vos professionnels de santé se mobilisent pour Movember 2026
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Chaque année, la clinique BEL-AIR se mobilise pour cette campagne.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      La clinique Tivoli propose des temps d'échanges, de sensibilisation et un stand
                      d'information dans le hall, en présence de professionnels de santé.
                    </span>
                  </li>
                </ul>

                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <a
                    href="https://nouvellecliniquebelair.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Site clinique BEL-AIR
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-emerald-50/40 via-white to-sky-50/40">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Quels événements sur votre territoire ?
                </h2>

                <p className="text-muted-foreground">
                  Retrouvez tous les événements en fonction de votre lieu de vie.
                </p>
                <Button asChild size="sm" variant="outline" className="rounded-full w-fit">
                  <a
                    href="https://fr.movember.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fr.movember.com
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>

                <div className="relative w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="/prevention/sante-famille/movember/movember-foundation.png"
                    alt="Logo Movember Foundation"
                    fill
                    className="object-contain p-8 bg-white"
                  />
                </div>

                <Card className="border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-orange-50 shadow-sm">
                  <CardContent className="p-5 lg:p-7 space-y-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      <div className="flex-1 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                          Institut Bergonié
                        </p>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                          MARS BLEU 2026 : Mobilisons-nous pour le dépistage du
                          cancer colorectal
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          À l'occasion de Mars Bleu, l'Institut Bergonié se
                          mobilise pour sensibiliser au dépistage du cancer
                          colorectal, un test simple, gratuit et accessible dès
                          50 ans.
                        </p>
                        <Button asChild size="sm" className="rounded-full bg-sky-700 hover:bg-sky-800">
                          <a
                            href="https://www.bergonie.fr/mars-bleu-2026-mobilisons-nous-pour-le-depistage-du-cancer-colorectal/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Voir le programme complet Bergonié
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </Button>
                      </div>

                      <div className="w-full lg:w-80 rounded-2xl overflow-hidden border border-sky-100 bg-white p-2">
                        <Image
                          src="/prevention/sante-famille/movember/bergo-bus.svg"
                          alt="Bergo'Bus - actions de prévention des cancers"
                          width={1200}
                          height={550}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {bergonieProgram.map((event) => (
                        <div
                          key={`${event.date}-${event.location}`}
                          className="rounded-xl border border-sky-100 bg-white/90 p-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                            <span className="inline-flex w-fit rounded-full bg-orange-100 text-orange-800 px-3 py-1 text-xs font-semibold">
                              {event.date}
                            </span>
                            <p className="text-sm font-medium text-foreground">
                              {event.location}
                            </p>
                          </div>
                          <ul className="space-y-1.5">
                            {event.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <ChevronRight className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 lg:p-8 space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Et si on parlait de la santé mentale des hommes ?
                </h2>

                <div className="max-w-3xl mx-auto">
                  <Carousel
                    opts={{ align: "center", loop: true }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {mentalHealthSlides.map((src, index) => (
                        <CarouselItem key={src}>
                          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-white">
                            <Image
                              src={src}
                              alt={`Santé mentale des hommes - visuel ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 720px"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-white/90" />
                    <CarouselNext className="right-2 bg-white/90" />
                  </Carousel>
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
