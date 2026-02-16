import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SanteMentaleDesJeunesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/50 to-background" />

        {/* Image de fond avec opacité */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sante-mental-jeune/sante-mental-jeune.jpeg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Bouton retour */}
          <Link
            href="/sante-mental"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour à Santé mentale</span>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Santé mentale des jeunes
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
              Comprendre et accompagner la santé mentale des adolescents et
              jeunes adultes
            </p>
          </div>
        </div>
      </section>

      {/* Contenu à venir */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-border rounded-3xl overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50/30 to-background">
              <CardContent className="p-8 lg:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icône */}
                  <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Clock className="w-10 h-10 text-green-600" />
                  </div>

                  {/* Texte */}
                  <div className="space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                      Contenu à venir
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                      Cette page est en cours de préparation. Nous travaillons à
                      vous fournir des ressources complètes sur la santé mentale
                      des jeunes.
                    </p>
                  </div>

                  {/* Aperçu du contenu prévu */}
                  <div className="w-full pt-6 border-t border-border mt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Contenu prévu :
                    </p>
                    <ul className="text-left space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>
                          Comprendre les enjeux de la santé mentale chez les
                          adolescents
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>
                          Signes d'alerte et quand consulter
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>
                          Ressources et structures d'accompagnement
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span>
                          Conseils pour les parents et l'entourage
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Lien vers annuaire */}
                  <div className="pt-6">
                    <Link
                      href="/sante-mental"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      <span>Consulter l'annuaire jeunes</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
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
