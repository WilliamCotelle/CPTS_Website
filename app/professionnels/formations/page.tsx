"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Calendar, Clock, MapPin, CheckCircle2, ExternalLink, Users, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/formations.json";

type FormationStatus = "available" | "complete" | "past" | "upcoming";

interface Formation {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  status: FormationStatus;
  category: string;
  duration?: string;
  location?: string;
  link?: string;
  note?: string;
  speakers?: string;
  partners?: string;
}

export default function FormationsPage() {
  const [activeTab, setActiveTab] = useState<"simairlec" | "autres">("simairlec");

  const formationsSimairlec2026: Formation[] = data.formationsSimairlec2026 as Formation[];
  const formationsSimairlecArchives: Formation[] = data.formationsSimairlecArchives as Formation[];
  const autresFormations2026: Formation[] = data.autresFormations2026 as Formation[];
  const autresFormationsArchives: Formation[] = data.autresFormationsArchives as Formation[];

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
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            À venir
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
    <Card className={`border-2 rounded-2xl overflow-hidden ${
      formation.status === "available"
        ? "border-primary/20 bg-primary/5"
        : formation.status === "upcoming"
        ? "border-amber-200 bg-amber-50/30"
        : formation.status === "complete"
        ? "border-gray-200 bg-muted/30"
        : "border-gray-200 bg-gray-50/50"
    }`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground leading-tight">
                {formation.title}
              </h3>
              {formation.subtitle && (
                <p className="text-sm text-muted-foreground mt-0.5 italic">{formation.subtitle}</p>
              )}
            </div>
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

          {formation.speakers && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{formation.speakers}</span>
            </div>
          )}

          {formation.partners && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Partenaires : </span>
              {formation.partners}
            </div>
          )}

          {formation.note && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span className="italic">{formation.note}</span>
            </div>
          )}

          {formation.link && (
            <a
              href={formation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
            >
              S&apos;inscrire sur Digiforma
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
                Simairlec 2026
              </button>
              <button
                onClick={() => setActiveTab("autres")}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === "autres"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Soirées thématiques
              </button>
            </div>
          </div>
        </section>

        {/* Formations Simairlec */}
        {activeTab === "simairlec" && (
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-12">
                {/* Formations 2026 */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-foreground">
                      Formations 2026
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {formationsSimairlec2026.filter(f => f.status === "available").length} disponibles
                    </span>
                  </div>
                  <div className="grid gap-4">
                    {formationsSimairlec2026.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                </div>

                {/* Archives */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-muted-foreground">
                      Archives
                    </h2>
                  </div>
                  <div className="grid gap-4 opacity-60">
                    {formationsSimairlecArchives.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Soirées thématiques */}
        {activeTab === "autres" && (
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-5xl mx-auto space-y-12">

                {/* Formations 2026 */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-foreground">
                      Soirées thématiques 2026
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {autresFormations2026.length} soirées
                    </span>
                  </div>
                  <div className="grid gap-4">
                    {autresFormations2026.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
                </div>

                {/* Archives */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-3xl font-bold text-muted-foreground">
                      Archives
                    </h2>
                  </div>
                  <div className="grid gap-4 opacity-60">
                    {autresFormationsArchives.map((formation) => (
                      <FormationCard key={formation.id} formation={formation} />
                    ))}
                  </div>
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
