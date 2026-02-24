import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { suiviArticles } from "../articles-data";
import { ArticleMediaCarousel } from "@/components/suivi-activite/article-media-carousel";

const LES_MATINS_SLUG = "les-matins-prevention-sante-aller-vers-les-usagers";
const JOURNEE_ALLER_VERS_SLUG =
  "journee-aller-vers-usagers-martignas-pharmacie-ccas";
const DEUXIEME_ATELIER_DIVERSIFICATION_SLUG =
  "deuxieme-atelier-de-diversification-alimentaire";
const PREMIERE_JOURNEE_PREVENTION_ALLER_VERS_SLUG =
  "premiere-journee-de-prevention-aller-vers";
const LES_JOURNEES_2025_INTER_CPTS_SLUG =
  "les-journees-2025-inter-cpts-a-montpellier";

function renderParagraphWithBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((chunk, index) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={`${chunk}-${index}`} className="font-semibold text-foreground">
          {chunk.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${chunk}-${index}`}>{chunk}</span>;
  });
}

const articleDetails = {
  [LES_MATINS_SLUG]: {
    paragraphs: [
      "Un grand merci au CCAS de nous avoir convié ce jeudi 27 novembre 2025 pour ce dépistage des agents et du public Pessacais.",
      "Une prévention Diabète leur a été proposée par la CPTS ainsi que des ateliers nutrition animés par les pôles ETP et la Maison du diabète.",
      "Grâce au questionnaire Findrisk, une trentaine de personnes ont été sensibilisées : des pré-diabètes dépistés ont pu être redirigés vers le médecin traitant et également vers le pôle ETP présent, venu animer un atelier sur les mesures hygiéno-diététiques.",
      "Pour ceux dont la tension artérielle était limite, une éducation de l’automesure tensionnelle a été faite ainsi que la délivrance de feuilles d’automesure CPAM.",
      "Des conseils d’hygiène de vie alimentaire et sportive ont pu être transmis.",
      "Une belle matinée de prévention primaire réalisée en présence d’Émilie Loubiat IDE ETP, Dr Françoise Debost, Dr Céline Lazerowitch et Dr Méliani Nedjari Kheira.",
    ],
    mediaImages: [
      "/suivi-activite/articles/les-matins-prev/carrousel-1.webp",
      "/suivi-activite/articles/les-matins-prev/carrousel-2.webp",
      "/suivi-activite/articles/les-matins-prev/carrousel-3.webp",
      "/suivi-activite/articles/les-matins-prev/carrousel-4.webp",
    ],
  },
  [JOURNEE_ALLER_VERS_SLUG]: {
    paragraphs: [
      "Une quarantaine de personnes dont 2 personnes avaient pris un rendez-vous en amont à la pharmacie.",
      "Il a été réalisé 20 tests Findrisk qui ont conduit à 6 tests glycémiques qui n’ont révélé que des résultats inférieurs aux valeurs de référence mais nous ont permis d’évoquer la pathologie diabétique, ses facteurs de risque et les mesures hygiénodiététiques appropriées pour diminuer les risques de survenue d’un diabète de type 2.",
      "15 personnes étaient en pré-diabète ou diabète déjà connus, nous avons pu revoir avec 6 d’entre elles les examens de surveillance à réaliser et diffuser la documentation SOPHIA.",
      "Les 5 personnes restantes ont pris des informations pour leur entourage.",
      "39 de ces personnes ont plus de 60 ans, 1 moins de 40 ans.",
      "3 femmes ont présentés de gros soucis d’isolement et de souffrance psychologique du a l’état de santé de leur compagnon et/ou leur passage à la retraite. Le numéro vert du soutien psychologique a été donné à l’une d’entre elle…",
      "1 personne a présenté des Troubles du Comportement Alimentaire avec « addiction au sucre »",
      "Un grand merci au CCAS et la Pharmacie du Centre d’avoir permis aux 2 IDE la réalisation de cette journée : Karim Kherradji Infirmier de Pratique Avancée Emilie Laroche Loubiat Infirmière",
    ],
    mediaImages: ["/suivi-activite/articles/journee-aller-vers/media.webp"],
  },
  [DEUXIEME_ATELIER_DIVERSIFICATION_SLUG]: {
    paragraphs: [
      "2ème atelier de diversification alimentaire animé par Celine MAILLARD, diététicienne, le 20 novembre 2025.",
      "L’atelier a réuni cinq parents et une orthophoniste.",
      "Les questions portaient surtout sur les nouvelles recommandations, la peur de l’étouffement, l’évolution des textures, les réflexes nauséeux, et les produits du commerce (aliments pour bébé et matériel autour du repas).",
      "Avec la diététicienne, les parents ont pu voir :",
      "- la structure des repas, les textures et l’équilibre alimentaire d’un bébé ;",
      "- la place du lait et l’introduction des autres produits laitiers ;",
      "- les aliments à risque d’étouffement ou de toxi-infection ;",
      "- quelques notions sur les perturbateurs endocriniens.",
      "L’alternance théorie/pratique, l’interactivité et les jeux ont été très appréciés.",
      "Prochain atelier dans 2 mois : n’hésitez pas à vous inscrire !",
    ],
    mediaImages: [
      "/suivi-activite/articles/diversification-alimentaire/Affiche-divers-alimentaire.webp",
    ],
  },
  [PREMIERE_JOURNEE_PREVENTION_ALLER_VERS_SLUG]: {
    paragraphs: [
      "**1 ère journée de prévention « aller vers »** sur le marché solidaire de Pessac organisé avec l’ESAAC sur le thème de **la vaccination HPV et la prévention VIF**.",
      "Quel étonnant enthousiasme de la part des usagers ! Touchés par le fait de venir à eux, d’imprimer des flyers en différentes langues et de prendre le temps d’écouter leurs réticences, ils ont déconstruit des idées reçues sur la vaccination.",
      "Une dizaine de parents ont verbalisé le désir de protéger leurs enfants suite à la sensibilisation !",
      "Un grand merci à l’ESAAC de nous avoir reçu et accompagné.",
      "Merci aux sages-femmes et infirmières pour leur investissement.",
      "Distributions d’autotests HPV fournis par le laboratoire Synlab.",
      "Un très bon retour sur le questionnaire de satisfaction et des idées des usagers pour les prochains thèmes à aborder !",
    ],
    mediaImages: [
      "/suivi-activite/articles/premiere-journee-allee-vers/media-1.webp",
      "/suivi-activite/articles/premiere-journee-allee-vers/media-2.webp",
      "/suivi-activite/articles/premiere-journee-allee-vers/media-3.webp",
      "/suivi-activite/articles/premiere-journee-allee-vers/media-4.webp",
      "/suivi-activite/articles/premiere-journee-allee-vers/media-5.webp",
    ],
  },
  [LES_JOURNEES_2025_INTER_CPTS_SLUG]: {
    paragraphs: [
      "Les journées 2025 inter CPTS se sont déroulées à Montpellier avec un intérêt pour la **santé mentale** des soignants et des coordinateurs de CPTS !",
      "L’amendement pour renommer les CPTS, qui a depuis été voté, a beaucoup fait réagir les participants..les CPTS deviendraient les **Communautés France Santé** avec des rôles nouveaux de pilotage de dispositifs homologués France Santé ..",
      "La CPAM souhaite renforcer **l’évaluation individuelle des CPTS** et améliorer **la lisibilité des dispositifs**.",
      "Enfin, et c est le plus important, beaucoup de partages d’expériences inter CPTS au cours des nombreux ateliers animés : **les partenaires patients** sont remis aux centres des prises en charge, les délégations de tâches et certains parcours **articles 51** ont été abordés etc..",
      "Des échanges riches, des contacts et des idées nouvelles pour essayer d’aborder sereinement cette année 2025/2026 malgré le temps politique orageux..",
    ],
    mediaImages: [
      "/suivi-activite/articles/2025-inter-CPTS/media-1.webp",
      "/suivi-activite/articles/2025-inter-CPTS/media-2.webp",
      "/suivi-activite/articles/2025-inter-CPTS/media-3.webp",
      "/suivi-activite/articles/2025-inter-CPTS/media-4.webp",
    ],
  },
} as const;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return suiviArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = suiviArticles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Article introuvable",
    };
  }

  return {
    title: `${article.title} | Suivi des activités`,
  };
}

export default async function SuiviActiviteArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = suiviArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const details =
    articleDetails[article.slug as keyof typeof articleDetails] ?? null;
  const heroContainerClass = "max-w-4xl";
  const mediaImages = details?.mediaImages ?? [];
  const hasCarousel = mediaImages.length > 1;
  const hasSingleImage = mediaImages.length === 1;
  const singleImageTitle =
    article.slug === DEUXIEME_ATELIER_DIVERSIFICATION_SLUG
      ? "Affiche de l’atelier"
      : "Photo de la journée";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-24 lg:pt-32 pb-10 lg:pb-14 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`${heroContainerClass} mx-auto`}>
            <Link
              href="/presentation/suivi-activites#fil-actu"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au fil d&apos;actu</span>
            </Link>

            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {article.title}
            </h1>

            <div className="rounded-3xl border border-border bg-card p-3 lg:p-4 shadow-xl">
              <div className="relative h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] bg-muted/40 rounded-2xl">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={1600}
                  height={1000}
                  priority
                  quality={72}
                  className="w-full h-full object-contain p-2 md:p-3"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1000px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          {details ? (
            <div className="max-w-5xl mx-auto space-y-8">
              <article className="rounded-3xl border border-border bg-card p-6 lg:p-10">
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-foreground">
                    {article.title}
                  </h2>
                  {details.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${paragraph}-${index}`}
                      className="text-muted-foreground leading-relaxed text-lg"
                    >
                      {renderParagraphWithBold(paragraph)}
                    </p>
                  ))}
                  {article.publishedAt && (
                    <p className="pt-2 text-sm text-muted-foreground">
                      {article.publishedAt}
                    </p>
                  )}
                </div>
              </article>

              {hasCarousel && (
                <article className="rounded-3xl border border-border bg-card p-4 lg:p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Galerie photo
                  </h3>
                  <ArticleMediaCarousel
                    images={mediaImages.map((src, index) => ({
                      src,
                      alt: `${article.title} - photo ${index + 1}`,
                    }))}
                  />
                </article>
              )}

              {hasSingleImage && (
                <article className="rounded-3xl border border-border bg-card p-4 lg:p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {singleImageTitle}
                  </h3>
                  <div className="relative h-[360px] sm:h-[460px] md:h-[560px] bg-muted/40 rounded-2xl overflow-hidden">
                    <Image
                      src={mediaImages[0]}
                      alt={`${article.title} - photo`}
                      fill
                      quality={70}
                      className="object-contain p-2 md:p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1000px"
                    />
                  </div>
                </article>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 lg:p-10">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Contenu de l&apos;article à venir.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
