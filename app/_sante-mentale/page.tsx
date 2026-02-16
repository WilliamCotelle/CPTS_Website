"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Brain,
  Moon,
  Heart,
  Users,
  Video,
  Phone,
  MapPin,
  Stethoscope,
  Activity,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import data from "@/app/data/sante-mentale.json";

type ModalContent = {
  title: string;
  description: string;
  content: string;
  icon: LucideIcon;
  color: string;
};

// Mapping des noms d'icônes vers les composants
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Moon,
  Activity,
  Users,
  Brain,
  Stethoscope,
};

// Transformation des données JSON en ajoutant les composants d'icônes
const topics: ModalContent[] = data.topics.map((topic) => ({
  ...topic,
  icon: iconMap[topic.iconName],
}));

export default function SanteMentalePage() {
  const [selectedTopic, setSelectedTopic] = useState<ModalContent | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-16 lg:pt-20 pb-6 lg:pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
              Santé mentale
            </h1>
            <p className="text-lg lg:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto font-light">
              Prendre soin de sa santé mentale, c'est prendre soin de soi
            </p>
            <div className="pt-1">
              <p className="text-sm lg:text-base text-muted-foreground/80">
                Découvrez nos ressources et professionnels dédiés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section circulaire avec colimaçon */}
      <section className="py-4 md:py-6 lg:py-8 bg-background overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-secondary/30 via-secondary/20 to-primary/10 rounded-[3rem] p-6 lg:p-8 shadow-xl border border-border/50">
            {/* Titre de la section */}
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Nos thématiques
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground/70 font-light">
                Explorez les sujets qui vous concernent
              </p>
            </div>

            {/* Disposition circulaire - Desktop */}
            <div className="hidden lg:block relative max-w-5xl mx-auto h-[600px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Image centrale du colimaçon */}
                <div className="relative w-[280px] h-[280px] z-20">
                  <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-8 border-background animate-gentle-pulse">
                    <Image
                      src="/colimaçon.jpg"
                      alt="Santé Mentale"
                      fill
                      className="object-cover"
                      priority
                      sizes="280px"
                    />
                  </div>
                </div>

                {/* Cards disposées en cercle */}
                {topics.map((topic, index) => {
                  const angle = (index * 360) / topics.length - 90;
                  const radius = 230;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedTopic(topic)}
                      className="absolute top-1/2 left-1/2 group z-30"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                      aria-label={`En savoir plus sur ${topic.title}`}
                    >
                      <div className="relative w-24 h-24 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:z-40">
                        <div
                          className={`relative h-full rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300 ${topic.color} flex flex-col items-center justify-center p-2 border-4 border-white dark:border-gray-800`}
                        >
                          <topic.icon className="w-8 h-8 mb-1 text-gray-700 dark:text-gray-200 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-[8px] font-bold text-center text-gray-700 dark:text-gray-200 leading-tight">
                            {topic.title}
                          </span>
                        </div>

                        {/* Hover hint */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-50">
                          <span className="text-xs bg-foreground text-background px-2 py-1 rounded-full font-medium shadow-lg">
                            Cliquer pour en savoir plus
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Disposition pour tablette */}
            <div className="hidden md:block lg:hidden">
              <div className="relative w-[350px] h-[350px] mx-auto mb-8">
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-8 border-background animate-gentle-pulse">
                  <Image
                    src="/colimaçon.jpg"
                    alt="Santé Mentale"
                    fill
                    className="object-cover"
                    priority
                    sizes="350px"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopic(topic)}
                    className={`group relative rounded-3xl shadow-lg transition-all hover:scale-105 hover:shadow-xl ${topic.color} flex flex-col items-center justify-center p-4 border-2 border-white dark:border-gray-800 min-h-[120px]`}
                  >
                    <topic.icon className="w-8 h-8 mb-2 text-gray-700 dark:text-gray-200" />
                    <span className="text-xs font-bold text-center text-gray-700 dark:text-gray-200 leading-tight">
                      {topic.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grille mobile */}
            <div className="md:hidden">
              <div className="relative w-64 h-64 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-6 border-background animate-gentle-pulse">
                  <Image
                    src="/colimaçon.jpg"
                    alt="Santé Mentale"
                    fill
                    className="object-cover"
                    priority
                    sizes="256px"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopic(topic)}
                    className={`group relative rounded-2xl shadow-lg transition-all active:scale-95 ${topic.color} flex flex-col items-center justify-center p-4 border-2 border-white dark:border-gray-800 min-h-[110px]`}
                  >
                    <topic.icon className="w-7 h-7 mb-2 text-gray-700 dark:text-gray-200" />
                    <span className="text-[11px] font-bold text-center text-gray-700 dark:text-gray-200 leading-tight">
                      {topic.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annuaire Territorial */}
      <section className="py-12 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Annuaire territorial
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Trouvez les professionnels et structures près de chez vous
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Pour les adultes */}
            <Card className="border-border rounded-3xl overflow-hidden bg-card">
              <CardContent className="p-8 lg:p-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-6">
                  Pour les adultes
                </h3>
                <div className="space-y-4">
                  <div className="bg-background/50 p-4 rounded-xl">
                    <p className="font-bold mb-2">CMP Pessac</p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>05 56 56 XX XX</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Avenue du Dr Albert Schweitzer, 33600 Pessac</span>
                    </div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl">
                    <p className="font-bold mb-2">CMP Mérignac</p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>05 56 56 XX XX</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Rue du Professeur Arnozan, 33700 Mérignac</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pour les jeunes */}
            <Card className="border-border rounded-3xl overflow-hidden bg-card">
              <CardContent className="p-8 lg:p-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-6">
                  Pour les jeunes
                </h3>
                <div className="space-y-4">
                  <div className="bg-background/50 p-4 rounded-xl">
                    <p className="font-bold mb-2">Maison des Adolescents</p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>05 56 79 XX XX</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Accueil des 11-25 ans
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl">
                    <p className="font-bold mb-2">
                      CMPEA (Centre Médico-Psychologique Enfants-Ados)
                    </p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>05 56 56 XX XX</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Pour les enfants et adolescents
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ressources Utiles */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Ressources utiles
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Des ressources pour vous accompagner
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Lien ARS */}
            <a
              href="https://www.santementale-info-service.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-border rounded-3xl overflow-hidden bg-card hover:shadow-xl transition-all h-full hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Brain className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    Santé Mentale Info Service
                  </h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Service national d'aide à distance en santé mentale, proposé
                    par l'ARS.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Accéder au site</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Vidéos */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="text-left group"
            >
              <Card className="border-border rounded-3xl overflow-hidden bg-card hover:shadow-xl transition-all h-full hover:border-primary/30">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Video className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    Vidéos pédagogiques
                  </h3>
                  {/* Miniature YouTube */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                    <Image
                      src="https://img.youtube.com/vi/LD1hk0OVt8Y/maxresdefault.jpg"
                      alt="Vidéo sur la santé mentale"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Bouton Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-8 h-8 text-primary ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-muted-foreground">
                    Comprendre les enjeux de la santé mentale
                  </p>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Dialog - Topics */}
      <Dialog
        open={!!selectedTopic}
        onOpenChange={() => setSelectedTopic(null)}
      >
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              {selectedTopic && (
                <selectedTopic.icon className="w-6 h-6 text-primary" />
              )}
            </div>
            <DialogTitle className="text-2xl lg:text-3xl">
              {selectedTopic?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedTopic?.description}
            </DialogDescription>
          </DialogHeader>
          <div
            className="prose prose-lg max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: selectedTopic?.content || "" }}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Dialog - Vidéo */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">
              Comprendre la santé mentale
            </DialogTitle>
            <DialogDescription>
              Vidéo explicative sur les enjeux de la santé mentale
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            {isVideoModalOpen && (
              <iframe
                src="https://www.youtube.com/embed/LD1hk0OVt8Y?autoplay=1"
                title="Vidéo santé mentale"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
