import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, AlertTriangle, Users, Stethoscope, Activity, Heart, Baby, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import data from "@/app/data/syndrome-apnee-sommeil.json";

const IconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Users,
  Stethoscope,
  Activity,
  Heart,
  Baby,
};

export default function SyndromeApneeSommeilPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href={data.backLink.href}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{data.backLink.label}</span>
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>{data.date}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
              {data.title}
            </h1>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pt-12 lg:pt-16 pb-20 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {data.sections.map((section) => {
              const Icon = section.iconName ? IconMap[section.iconName] : null;

              // Styles selon le type
              const cardStyles: Record<string, string> = {
                default: "",
                warning: "border-amber-200 bg-amber-50/50",
                info: "border-blue-200 bg-blue-50/50",
                danger: "border-red-200 bg-red-50/50",
                success: "border-green-200 bg-green-50/50",
                children: "border-violet-200 bg-violet-50/50",
              };

              const iconBgStyles: Record<string, string> = {
                default: "bg-primary/10",
                warning: "bg-amber-100",
                info: "bg-blue-100",
                danger: "bg-red-100",
                success: "bg-green-100",
                children: "bg-violet-100",
              };

              const iconColorStyles: Record<string, string> = {
                default: "text-primary",
                warning: "text-amber-600",
                info: "text-blue-600",
                danger: "text-red-600",
                success: "text-green-600",
                children: "text-violet-600",
              };

              return (
                <Card key={section.id} className={`overflow-hidden ${cardStyles[section.type]}`}>
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full ${iconBgStyles[section.type]} flex items-center justify-center`}>
                        {Icon ? (
                          <Icon className={`w-5 h-5 ${iconColorStyles[section.type]}`} />
                        ) : (
                          <span className={`font-bold ${iconColorStyles[section.type]}`}>{section.number}</span>
                        )}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      {/* Layout spécial pour enfants : image à gauche, texte à droite */}
                      {section.id === "enfants" && section.image ? (
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/3 flex-shrink-0">
                            <div className="rounded-xl overflow-hidden">
                              <Image
                                src={section.image}
                                alt={section.imageAlt || section.title}
                                width={300}
                                height={400}
                                className="w-full h-auto"
                                sizes="(max-width: 768px) 100vw, 300px"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-4">
                            {section.paragraphs?.map((p, i) => (
                              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Image de section (en haut) - plus petite et centrée pour symptomes */}
                          {section.image && (
                            <div className={`rounded-xl overflow-hidden mb-6 ${section.id === "symptomes" ? "max-w-sm mx-auto" : ""}`}>
                              <Image
                                src={section.image}
                                alt={section.imageAlt || section.title}
                                width={section.id === "symptomes" ? 350 : 800}
                                height={section.id === "definition" ? 400 : section.id === "symptomes" ? 280 : 600}
                                className="w-full h-auto"
                                sizes={section.id === "symptomes" ? "(max-width: 768px) 100vw, 350px" : "(max-width: 768px) 100vw, 700px"}
                              />
                            </div>
                          )}

                          {/* Paragraphes */}
                          {section.paragraphs?.map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                          ))}
                        </>
                      )}

                      {/* Image après paragraphes (pour diagnostic) */}
                      {section.imageAfterParagraphs && (
                        <div className="rounded-xl overflow-hidden my-6">
                          <Image
                            src={section.imageAfterParagraphs}
                            alt={section.imageAfterParagraphsAlt || section.title}
                            width={800}
                            height={600}
                            className="w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 700px"
                          />
                        </div>
                      )}

                      {/* Paragraphes après image */}
                      {section.paragraphsAfterImage?.map((p, i) => (
                        <p key={`after-${i}`} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}

                      {/* Niveaux de gravité */}
                      {section.levels && (
                        <div className="grid gap-3">
                          {section.levels.map((level, i) => {
                            const levelColors: Record<string, string> = {
                              green: "bg-green-100/50 border-green-200 text-green-700",
                              amber: "bg-amber-100/50 border-amber-200 text-amber-700",
                              red: "bg-red-100/50 border-red-200 text-red-700",
                            };
                            return (
                              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${levelColors[level.color]}`}>
                                <span className="font-semibold">{level.range} :</span>
                                <span>{level.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Facteurs de risque */}
                      {section.riskFactors && (
                        <div className="grid gap-4 mt-6">
                          {section.riskFactors.map((factor, i) => (
                            <div key={i} className="p-4 rounded-xl bg-secondary/30 border">
                              <h3 className="font-semibold text-foreground mb-2">{factor.title}</h3>
                              <p className="text-sm">{factor.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Symptômes */}
                      {section.symptoms && (
                        <ul className="grid gap-2 list-none">
                          {section.symptoms.map((symptom, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Complications */}
                      {section.complications && (
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {section.complications.map((comp, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/80 border text-sm">{comp}</div>
                          ))}
                        </div>
                      )}

                      {/* Examens */}
                      {section.exams && (
                        <div className="space-y-4">
                          {section.exams.map((exam, i) => (
                            <div key={i} className="p-4 rounded-xl bg-secondary/30 border">
                              <h3 className="font-semibold text-foreground mb-2">{exam.title}</h3>
                              <p className="text-sm">{exam.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Info supplémentaire diagnostic */}
                      {section.additionalInfo && (
                        <div className="space-y-4 mt-4">
                          {section.additionalInfo.map((info, i) => (
                            <p key={i}>{info}</p>
                          ))}
                        </div>
                      )}

                      {/* Ce qu'étudie la polysomnographie */}
                      {section.studies && (
                        <div className="mt-4">
                          <p className="font-semibold text-foreground mb-2">Il étudie :</p>
                          <ul className="space-y-2">
                            {section.studies.map((study, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{study}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Conclusion diagnostic */}
                      {section.conclusion && (
                        <p className="mt-4">{section.conclusion}</p>
                      )}

                      {/* Intro traitements */}
                      {section.introText && (
                        <p className="font-medium text-foreground">{section.introText}</p>
                      )}

                      {/* Traitements */}
                      {section.treatments && (
                        <div className="space-y-6">
                          {section.treatments.map((treatment, i) => (
                            <div key={i}>
                              <div className="p-4 rounded-xl bg-white/80 border">
                                <h3 className="font-semibold text-foreground mb-3">{treatment.title}</h3>
                                <p className="text-sm mb-3">{treatment.description}</p>
                                {treatment.items && (
                                  <ul className="space-y-2 text-sm">
                                    {treatment.items.map((item, j) => (
                                      <li key={j} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {treatment.additionalInfo && (
                                  <p className="text-sm mt-3 italic">{treatment.additionalInfo}</p>
                                )}
                              </div>
                              {/* Image après traitement (pour PPC) */}
                              {treatment.image && (
                                <div className="rounded-xl overflow-hidden mt-4">
                                  <Image
                                    src={treatment.image}
                                    alt={treatment.imageAlt || treatment.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto"
                                    sizes="(max-width: 768px) 100vw, 700px"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Traitements enfants */}
                      {section.childTreatments && (
                        <div className="mt-6 p-4 rounded-xl bg-white/80 border">
                          <h3 className="font-semibold text-foreground mb-3">Traitements chez l'enfant</h3>
                          <ul className="space-y-2 text-sm">
                            {section.childTreatments.map((treatment, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-violet-500 mt-1">•</span>
                                <span>{treatment}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
