import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";

export default function MonEspaceSantePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
            Mon espace santé : TOUT SAVOIR, TOUT COMPRENDRE et S'EN SERVIR !
          </h1>
          <Card className="p-8">
            <p className="text-lg text-muted-foreground">
              Contenu à venir...
            </p>
          </Card>
        </div>
      </section>
      <Footer />
    </main>
  );
}
