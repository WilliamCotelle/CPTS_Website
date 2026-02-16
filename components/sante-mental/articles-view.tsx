"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Moon,
  Heart,
  Users,
  Stethoscope,
  Activity,
  LucideIcon,
  Clock,
  ArrowRight,
} from "lucide-react";
import data from "@/app/data/sante-mentale-2.json";

type Topic = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  image: string | null;
  link: string | null;
  hasContent: boolean;
};

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Moon,
  Activity,
  Users,
  Brain,
  Stethoscope,
};

const topics: Topic[] = data.topics.map((topic) => ({
  ...topic,
  icon: iconMap[topic.iconName],
}));

export function ArticlesView() {
  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Votre santé mentale, on en parle ?
        </h2>
        <p className="text-muted-foreground">
          Explorez les sujets qui vous concernent
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          const hasContent = topic.hasContent && topic.link;

          // Card avec contenu (lien vers page)
          if (hasContent) {
            return (
              <Link
                key={index}
                href={topic.link!}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl border-2 border-white dark:border-gray-800 min-h-[220px] md:min-h-[280px] flex flex-col"
              >
                {/* Image de fond */}
                {topic.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  </div>
                )}

                {/* Contenu */}
                <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm line-clamp-2 mb-3">
                    {topic.description}
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-xs font-medium group-hover:text-white transition-colors">
                    <span>Découvrir</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          }

          // Card placeholder (contenu à venir)
          return (
            <div
              key={index}
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-800 min-h-[220px] md:min-h-[280px] flex flex-col ${topic.color}`}
            >
              {/* Badge "À venir" */}
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>À venir</span>
                </div>
              </div>

              {/* Contenu */}
              <div className="flex flex-col items-center justify-center h-full p-4 md:p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/50 dark:bg-gray-800/50 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2">
                  {topic.description}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-3 italic">
                  Contenu en préparation
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
