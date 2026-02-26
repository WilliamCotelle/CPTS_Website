import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AccesAuxSoinsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#actualites"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour aux actualités</span>
            </Link>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Besoin d&apos;un medecin ? suivez le bon chemin.
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src="/actu/acces-aux-soins/Acces-Aux-Soins-1.jpg"
                  alt="Affiche accès aux soins 1"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
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
