import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Newspaper,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { ReactNode } from "react";
import { suiviArticles } from "./articles-data";

type PageProps = {
  searchParams: Promise<{
    all?: string;
  }>;
};

const projets: ReactNode[] = [
  <>
    Le projet{" "}
    <span className="text-primary font-medium">
      Parcours pluriprofessionnel pour l’insuffisance cardiaque
    </span>
  </>,
  <>
    Le projet <span className="text-primary font-medium">RCP</span> parcours
    pluriprofessionnel pour{" "}
    <span className="text-primary font-medium">
      les patients complexes et/ou douloureux
    </span>
  </>,
  <>
    Le projet{" "}
    <span className="text-primary font-medium">
      Parcours pluriprofessionnel du patient diabétique
    </span>
  </>,
  <>
    Le projet{" "}
    <span className="text-primary font-medium">Améliorer l’accès aux soins</span>{" "}
    et <span className="text-primary font-medium">soins non programmés</span>
  </>,
  <>
    Le projet Actions territoriales de{" "}
    <span className="text-primary font-medium">Prévention</span>
  </>,
];

const outils: ReactNode[] = [
  <>
    <span className="text-primary font-medium">Questionnaire d’inclusion</span>{" "}
    pour un médecin traitant
  </>,
  <>
    <span className="text-primary font-medium">
      Questionnaire Requérant / Patient
    </span>{" "}
    pour proposer un dossier en <span className="text-primary font-medium">RCP</span>
  </>,
  <span className="text-primary font-medium">
    Formulaire d’adressage vers de l’éducation thérapeutique
  </span>,
  <>
    <span className="text-primary font-medium">Formulaire d’adressage</span>{" "}
    vers les dispositifs{" "}
    <span className="text-primary font-medium">en santé mentale</span> du
    territoire
  </>,
  <>
    Aide à l’accompagnement{" "}
    <span className="text-primary font-medium">
      pour la prise en charge complexe
    </span>{" "}
    à domicile
  </>,
];

export default async function SuiviActivitesPage({ searchParams }: PageProps) {
  const { all } = await searchParams;
  const showAll = all === "1";
  const initialCount = 9;
  const visibleArticles = showAll
    ? suiviArticles
    : suiviArticles.slice(0, initialCount);
  const hiddenCount = Math.max(0, suiviArticles.length - initialCount);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-28 lg:pt-36 pb-14 lg:pb-20 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_20%,hsl(var(--primary)/0.14),transparent_45%)]" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Vie de la CPTS
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">
                Le suivi de nos activités
              </h1>

              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed">
                L’association CPTS Ouest Gironde compte désormais plus de{" "}
                <strong className="text-foreground">300 adhérents</strong> :
                professionnels de santé (dont 30 % de médecins généralistes),
                associations, établissements de soins. La 1ère AGO de notre
                jeune CPTS a eu lieu le{" "}
                <strong className="text-foreground">
                  mardi 26 septembre 2023
                </strong>
                .
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/suivi-activite/hero.png"
                  alt="Illustration du suivi des activités de la CPTS Ouest Gironde"
                  width={1600}
                  height={1000}
                  priority
                  quality={72}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="rounded-3xl border border-border bg-card p-6 lg:p-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Plus de{" "}
                <strong className="text-foreground">50 membres actifs</strong>{" "}
                travaillent depuis juin 2022 sur les projets suivants :
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-5">
                  Projets en cours
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  {projets.map((projet, index) => (
                    <li
                      key={`projet-${index}`}
                      className="flex gap-3 leading-relaxed"
                    >
                      <span className="text-primary mt-1.5">•</span>
                      <span>{projet}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-3xl border border-teal-200 bg-teal-50/40 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-5">
                  Boîte à outils (5 thèmes)
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  {outils.map((outil, index) => (
                    <li key={`outil-${index}`} className="flex gap-3 leading-relaxed">
                      <span className="text-primary mt-1.5">•</span>
                      <span>{outil}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="rounded-3xl border border-border bg-card p-6 lg:p-8 space-y-5">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Les membres du bureau rencontrent les{" "}
                <strong className="text-foreground">Mairies et les CCAS</strong>{" "}
                du territoire afin d’échanger sur les objectifs communs de
                meilleure prise en charge des patients diabétiques du secteur.
                La CPTS Ouest Gironde a notamment évoqué le besoin de salles
                pour organiser des ateliers d’éducation thérapeutique au plus
                près des usagers et a reçu l’accord des 4 communes.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg">
                L’annuaire des professionnels adhérents avec une{" "}
                <strong className="text-foreground">cartographie</strong> est
                fonctionnel depuis octobre 2022 sur la plateforme collaborative
                Plexus Santé, il est accessible depuis le site internet.
              </p>
            </article>

            <article className="rounded-3xl border border-primary/20 bg-primary/5 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Avec le concours du{" "}
                    <span className="text-primary font-medium">GIP ESEA</span>,
                    la CPTS s’est dotée d’une adresse de messagerie santé
                    sécurisée :
                  </p>
                  <a
                    href="mailto:cpts.ouestgironde.33@na.mssante.fr"
                    className="text-primary font-semibold hover:underline break-all"
                  >
                    cpts.ouestgironde.33@na.mssante.fr
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    Pensez à suivre nos actualités sur les réseaux
                  </h3>
                  <p className="text-muted-foreground">
                    Retrouvez les actions de la CPTS Ouest Gironde sur nos
                    comptes officiels.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:ml-auto">
                  <a
                    href="https://www.linkedin.com/company/cpts-ouest-gironde"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0A66C2] text-white">
                      <Linkedin className="w-4 h-4" />
                    </span>
                    LinkedIn
                  </a>

                  <a
                    href="https://www.facebook.com/cptsouestgironde/?locale=fr_FR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1877F2] text-white">
                      <Facebook className="w-4 h-4" />
                    </span>
                    Facebook
                  </a>

                  <a
                    href="https://www.instagram.com/cptsouestgironde/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white">
                      <Instagram className="w-4 h-4" />
                    </span>
                    Instagram
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="fil-actu" className="py-12 lg:py-16 bg-secondary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 text-primary font-semibold mb-3">
                <Newspaper className="w-5 h-5" />
                Actualités
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-3 text-balance">
                Le fil d’actualité de nos évènements
              </h2>
              <p className="text-muted-foreground text-lg">
                Retrouvez ici l’ensemble des articles liés aux actions de la
                CPTS Ouest Gironde.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {visibleArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/presentation/suivi-activites/${article.slug}`}
                  className="group h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col [content-visibility:auto] [contain-intrinsic-size:520px]"
                >
                  <div className="relative h-56 sm:h-52 lg:h-56 bg-gradient-to-br from-muted/70 via-muted/40 to-secondary/20 border-b border-border/70">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      loading="lazy"
                      decoding="async"
                      quality={62}
                      className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-1 flex-col">
                    <h3 className="font-bold text-foreground leading-relaxed mb-3 break-words">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 min-h-[4.75rem]">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-auto">
                      Lire l’article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {!showAll && hiddenCount > 0 && (
              <div className="mt-8 flex justify-center">
                <Link
                  href="/presentation/suivi-activites?all=1#fil-actu"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Afficher les {hiddenCount} actualités suivantes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            <div className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/20 p-5 lg:p-7">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
                  <Clock3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Les prochaines actualités arrivent bientôt
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Le reste de nos actualités est actuellement en cours de
                    création. Elles seront publiées progressivement sur le site
                    dans les prochaines mises à jour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
