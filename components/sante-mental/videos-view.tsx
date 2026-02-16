"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Play, ExternalLink, HandHeart } from "lucide-react";
import Image from "next/image";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

const videosParlent: VideoItem[] = [
  {
    id: "parlent1",
    title: "Comprendre la santé mentale",
    description: "Un clip Psycom pour comprendre la santé mentale et ce qui l'influence",
    youtubeId: "LD1hk0OVt8Y",
  },
  {
    id: "parlent2",
    title: "La santé mentale, c'est pas que dans la tête",
    description: "Découvrez comment prendre soin de votre santé mentale au quotidien",
    youtubeId: "e-pfESIBU6s",
  },
  {
    id: "parlent3",
    title: "Parler de santé mentale",
    description: "Briser les tabous autour de la santé mentale",
    youtubeId: "Uit4lwPFTOI",
  },
  {
    id: "parlent4",
    title: "Agir pour sa santé mentale",
    description: "Des conseils pratiques pour améliorer son bien-être mental",
    youtubeId: "PPSzX_NIBJI",
  },
];

interface VideosViewProps {
  type: "aide" | "parlent";
}

export function VideosView({ type }: VideosViewProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Vue "Venez on vous aide" - Texte + lien externe
  if (type === "aide") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HandHeart className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Venez, on vous aide !
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Pour vous accompagner, nous avons créé des supports et questionnaires
            dédiés aux professionnels de santé pour la gestion de votre santé mentale.
            Ces outils vous permettront de mieux comprendre votre situation et de
            trouver les ressources adaptées à vos besoins.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 font-medium">
            Rapprochez-vous d'un professionnel de santé pour remplir le formulaire.
          </p>
          <a
            href="https://cpts.livingpage.fr/ma-livingpage?id=321&nom=sante-mentale-les-dispositifs-du-territoire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>Accéder aux ressources</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  // Vue "Ils en parlent aussi" - Vidéos
  const videos = videosParlent;

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Ils en parlent aussi
        </h2>
        <p className="text-muted-foreground">Témoignages et partages d'expériences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video: VideoItem) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 cursor-pointer hover:shadow-2xl transition-all duration-500 aspect-video"
          >
            {/* Miniature YouTube */}
            <div className="absolute inset-0 z-0">
              <Image
                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

            {/* Play icon */}
            <div className="absolute inset-0 flex items-center justify-center z-15">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20 text-left">
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                {video.title}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">
                {video.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal Video */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">{selectedVideo?.title}</DialogTitle>
            <DialogDescription>{selectedVideo?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
