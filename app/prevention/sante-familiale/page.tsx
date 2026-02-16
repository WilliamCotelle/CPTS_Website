import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SanteFamilialePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Construction className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Santé familiale
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cette page est actuellement en construction.
          </p>

          <p className="text-base text-muted-foreground">
            Vous y trouverez bientôt des ressources dédiées à la santé de toute la famille.
          </p>

          <div className="pt-8">
            <Link href="/">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
