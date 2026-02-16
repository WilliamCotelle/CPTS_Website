"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, Clock, MapPin, CheckCircle2, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/formations.json";

type FormationStatus = "available" | "complete" | "past";

interface Formation {
  id: string;
  title: string;
  date: string;
  status: FormationStatus;
  category: string;
  duration?: string;
  location?: string;
  link?: string;
}

export default function FormationsPage() {
  const [activeTab, setActiveTab] = useState<"simairlec" | "autres">("simairlec");

  const formationsSimairlec2025: Formation[] = data.formationsSimairlec2025 as Formation[];
  const formationsSimairlec2024: Formation[] = data.formationsSimairlec2024 as Formation[];
  const autresFormations: Formation[] = data.autresFormations as Formation[];

  const getStatusBadge = (status: FormationStatus) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            Inscriptions ouvertes
          </span>
        );
      case "complete":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Complet
          </span>
        );
      case "past":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
            Terminée
          </span>
        );
    }
  };

  const FormationCard = ({ formation }: { formation: Formation }) => (
    <Card className={`border-2 rounded-2xl overflow-hidden transition-all hover:shadow-lg ${
      formation.status === "available"
        ? "border-primary/20 bg-primary/5"
        : formation.status === "complete"
        ? "border-gray-200 bg-muted/30"
        : "border-gray-200 bg-gray-50/50"
    }`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-foreground leading-tight flex-1">
              {formation.title}
            </h3>
            {getStatusBadge(formation.status)}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formation.date}</span>
            </div>
            {formation.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{formation.duration}</span>
              </div>
            )}
            {formation.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{formation.location}</span>
              </div>
            )}
          </div>

          {formation.link && (
            <a
              href={formation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
            >
              En savoir plus
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">
                Les formations
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground text-pretty">
                Les formations prises en charge par la CPTS pour ses adhérents
              </p>
              <div className="flex items-center justify-center gap-2 pt-4">
                <a
                  href="https://airlecairespace.com/fr/simairlec-fr/trainings-fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold transition-colors"
                >
                  Simairlec - Formations en simulation
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <section className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-center gap-2 py-4">
              <button
                onClick={() => setActiveTab("simairlec")}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "simairlec"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Simairlec 2025
              </button>
              <button
                onClick={() => setActiveTab("autres")}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "autres"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Autres formations
              </button>
            </div>
          </div>
        </section>

        {/* Formations Simairlec */}
        {activeTab === "simairlec" && (
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-12">
                {/* Formations 2025 */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-foreground">
                      Formations 2025
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {formationsSimairlec2025.filter(f => f.status === "available").length} disponibles
                    </span>
                  </div>
                  <div className="grid gap-4">
                    {formationsSimairlec2025.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                </div>

                {/* Formations 2024 - Archives */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-muted-foreground">
                      Archives 2024
                    </h2>
                  </div>
                  <div className="grid gap-4 opacity-60">
                    {formationsSimairlec2024.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Autres Formations */}
        {activeTab === "autres" && (
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl font-bold text-foreground">
                    Autres formations 2025
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {autresFormations.length} formations
                  </span>
                </div>
                <div className="grid gap-4">
                  {autresFormations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </div>

                {/* Additional info sections */}
                <div className="mt-12 space-y-6">
                  <Card className="border-2 border-primary/20 bg-primary/5 rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        DPC Sport Santé
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Formation des médecins généraliste « COMMENT PRESCRIRE L'ACTIVITE PHYSIQUE » en reprenant les bienfaits de l'activité physique, les différents niveaux et les éléments de prescription.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        Dates 2025 : 22 mai / 25 septembre / 27 novembre
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20 bg-primary/5 rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        Les pathologies du sommeil
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Formation délivrée par Le Dr Sabrina Carlier, Médecin du sommeil et Endocrinologue et Thierry Gouzland, Rééducateur maxillofacial sur le sommeil et ses pathologies en pratique libérale.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20 bg-primary/5 rounded-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        Violences intra familiales
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        La CPTS Ouest Gironde vous propose une sensibilisation avec 2 formats:
                      </p>
                      <ul className="space-y-2 text-muted-foreground text-sm ml-4">
                        <li>• Format journée : comprendre cette problématique, détecter ces victimes à travers différents outils et connaître les structures vers qui orienter (VICT'AID, CAUVA, RPBNA)</li>
                        <li>• Format soirée (3H) : avec la Maison des Femmes de Mérignac et le Pôle Territorial de Solidarité Porte du Médoc</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
