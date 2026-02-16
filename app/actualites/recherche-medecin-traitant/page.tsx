import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Stethoscope, Shield, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

export default function RechercheMedecinTraitantPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section with Image */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  className="group hover:bg-primary/10"
                  asChild
                >
                  <Link href="/#actualites" className="inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Retour aux actualités</span>
                  </Link>
                </Button>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Recherche médecin traitant
                </h1>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2024-11-01" className="text-sm">
                    1 novembre 2024
                  </time>
                </div>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
              </div>

              {/* Affiche */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
                <img
                  src="/actu/Affiche-CPTS-Medecin-Traitant-5.08.25-pdf.jpg"
                  alt="Recherche médecin traitant"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Introduction */}
              <Card className="p-8 rounded-3xl border-2 bg-card">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Stethoscope className="w-8 h-8 text-primary" />
                  Vous ne trouvez pas de médecin traitant?
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    La CPTS Ouest Gironde se mobilise pour vous et essaye de vous aider à trouver un médecin proche de
                    chez vous. Vous devez résider sur une des 4 communes de la CPTS Ouest Gironde (Mérignac, Pessac,
                    Martignas en Jalles, Saint Jean d'Illac).
                  </p>
                  <p>
                    Vous êtes invités à remplir un questionnaire qui va vous permettre de vous inscrire sur une liste
                    d'attente. Lorsque votre nom arrivera en haut de la liste d'attente, vous serez contacté pour vous
                    indiquer vers quel médecin vous diriger.
                  </p>
                  <p className="font-semibold text-foreground">
                    Cette démarche ne vous empêche pas de poursuivre les recherches de votre côté
                  </p>
                </div>
              </Card>

              {/* Déclaration médecin traitant */}
              <Card className="p-8 rounded-3xl border-2 bg-primary/5 border-primary/20">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  🩺 Désormais vous avez un médecin généraliste!
                </h2>
                <p className="text-lg text-foreground mb-6 font-semibold">
                  L'avez-vous déclaré comme votre médecin traitant référent?
                </p>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Il est <strong className="text-foreground">INDISPENSABLE</strong> de vérifier que la déclaration du
                    médecin traitant a bien été faite : vous pouvez le vérifier sur votre espace santé ou auprès de
                    votre professionnel de santé (pharmacien, IDE, Kinésithérapeute…) après lecture de votre{" "}
                    <strong className="text-foreground">CARTE VITALE</strong>.
                  </p>
                </div>
              </Card>

              {/* Alert */}
              <Card className="p-8 rounded-3xl border-2 bg-red-50 border-red-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p className="font-bold text-red-900">
                      🚨 La non déclaration de votre médecin peut engendrer des défauts de remboursements voire des
                      franchises plus importantes.
                    </p>
                    <p className="text-red-800">
                      Et en cas d'hospitalisation, les médecins hospitaliers ne pourront pas savoir qui contacter pour
                      communiquer vos informations médicales.
                    </p>
                    <p className="font-bold text-red-900 uppercase">
                      Pensez à demander à votre médecin de vérifier si votre déclaration de médecin traitant est bien à
                      jour
                    </p>
                  </div>
                </div>
              </Card>

              {/* Protection des données */}
              <Card className="p-8 rounded-3xl border-2 bg-accent/10 border-accent/30">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                  Protection des données médicales
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Le questionnaire 'recherche médecin traitant' contenant des informations médicales sécurisées, il est
                  à transmettre à la CPTS <strong className="text-foreground">UNIQUEMENT</strong> via la messagerie de
                  santé sécurisée d'un professionnel de santé (Pharmacie de quartier, médecin généraliste, IDEL, médecin
                  du CNP Hôpital privé Saint Martin de Pessac …).
                </p>
              </Card>

              {/* Back Button at Bottom */}
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="group hover:bg-primary hover:text-white hover:border-primary transition-all rounded-full"
                  asChild
                >
                  <Link href="/#actualites" className="inline-flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Retour aux actualités</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
