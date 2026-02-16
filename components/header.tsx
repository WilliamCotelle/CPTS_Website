"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { SocialModal } from "./social-modal"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="bg-white/98 backdrop-blur-xl border border-border/40 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between h-20 px-4 lg:px-6">
            <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-cpts-ouest-gironde-removebg-preview-USphMG3yVl3Lqb7ySVEstCfv6debUR.png"
                alt="CPTS Ouest Gironde"
                width={280}
                height={80}
                className="h-12 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              >
                Accueil
              </Link>

              {/* Professionnels de Santé Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 whitespace-nowrap">
                  Professionnels
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  <div className="py-2 px-2">
                    <Link
                      href="/professionnels/adhesion"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Adhésion
                    </Link>
                    <Link
                      href="/professionnels/supports"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Commander des supports
                    </Link>
                    <Link
                      href="/professionnels/actions-outils"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Nos actions & vos outils
                    </Link>
                    <Link
                      href="/professionnels/formations"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Les formations
                    </Link>
                  </div>
                </div>
              </div>

              {/* Espace Patients et Usagers Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 whitespace-nowrap">
                  Patients
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  <div className="py-2 px-2">
                    <Link
                      href="/patients/coordonnees"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Coordonnées utiles
                    </Link>
                    <Link
                      href="/patients/annuaire"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      L'annuaire des professionnels de santé
                    </Link>
                    <Link
                      href="/patients/medecin-traitant"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Avez-vous un médecin traitant ?
                    </Link>
                    <Link
                      href="/patients/mon-espace-sante"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Mon Espace de Santé
                    </Link>
                  </div>
                </div>
              </div>

              {/* Présentation de la CPTS Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 whitespace-nowrap">
                  Présentation
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  <div className="py-2 px-2">
                    <Link
                      href="/presentation#organisation"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Organisation
                    </Link>
                    <Link
                      href="/presentation#territoire"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Le territoire
                    </Link>
                    <Link
                      href="/presentation#pourquoi"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Pourquoi une communauté
                    </Link>
                    <Link
                      href="/presentation#missions"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Missions
                    </Link>
                    <Link
                      href="/presentation/suivi-activites"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Le suivi de nos activités
                    </Link>
                  </div>
                </div>
              </div>

              {/* Prévention Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200 whitespace-nowrap">
                  Prévention
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  <div className="py-2 px-2">
                    <Link
                      href="/prevention/du-mois"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Votre prévention du mois
                    </Link>
                    <Link
                      href="/prevention/education-therapeutique"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Éducation thérapeutique
                    </Link>
                    <Link
                      href="/prevention/memos-suivi"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Mémos de suivi
                    </Link>
                    <Link
                      href="/prevention/sante-familiale"
                      className="block px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-primary/8 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      Santé familiale
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/faq"
                className="px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
              >
                FAQ
              </Link>
            </nav>

            <div className="hidden xl:block flex-shrink-0">
              <Button
                size="lg"
                className="rounded-full font-semibold text-sm px-6 h-11 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setIsSocialModalOpen(true)}
              >
                Nous Rejoindre
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2.5 hover:bg-primary/5 rounded-xl transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="xl:hidden py-6 px-4 space-y-2 border-t border-border/40 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <Link
                href="/"
                className="block px-4 py-2.5 text-base font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>

              {/* Mobile Professionnels de Santé */}
              <div className="px-4">
                <button
                  onClick={() => toggleDropdown("professionnels")}
                  className="flex items-center justify-between w-full py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-all duration-200"
                >
                  Professionnels de Santé
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "professionnels" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "professionnels" && (
                  <div className="mt-2 ml-3 space-y-1 border-l-2 border-primary/20 pl-4">
                    <Link
                      href="/professionnels/adhesion"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Adhésion
                    </Link>
                    <Link
                      href="/professionnels/supports"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Commander des supports
                    </Link>
                    <Link
                      href="/professionnels/actions-outils"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Nos actions & vos outils
                    </Link>
                    <Link
                      href="/professionnels/formations"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Les formations
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Espace Patients */}
              <div className="px-4">
                <button
                  onClick={() => toggleDropdown("patients")}
                  className="flex items-center justify-between w-full py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-all duration-200"
                >
                  Espace Patients et Usagers
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "patients" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "patients" && (
                  <div className="mt-2 ml-3 space-y-1 border-l-2 border-primary/20 pl-4">
                    <Link
                      href="/patients/coordonnees"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Coordonnées utiles
                    </Link>
                    <Link
                      href="/patients/annuaire"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      L'annuaire des professionnels de santé
                    </Link>
                    <Link
                      href="/patients/medecin-traitant"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Avez-vous un médecin traitant ?
                    </Link>
                    <Link
                      href="/patients/mon-espace-sante"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mon Espace de Santé
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Présentation */}
              <div className="px-4">
                <button
                  onClick={() => toggleDropdown("presentation")}
                  className="flex items-center justify-between w-full py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-all duration-200"
                >
                  Présentation de la CPTS
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "presentation" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "presentation" && (
                  <div className="mt-2 ml-3 space-y-1 border-l-2 border-primary/20 pl-4">
                    <Link
                      href="/presentation#organisation"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Organisation
                    </Link>
                    <Link
                      href="/presentation#territoire"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Le territoire
                    </Link>
                    <Link
                      href="/presentation#pourquoi"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pourquoi une communauté
                    </Link>
                    <Link
                      href="/presentation#missions"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Missions
                    </Link>
                    <Link
                      href="/presentation/suivi-activites"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Le suivi de nos activités
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Prévention */}
              <div className="px-4">
                <button
                  onClick={() => toggleDropdown("prevention")}
                  className="flex items-center justify-between w-full py-2.5 text-base font-semibold text-foreground/80 hover:text-primary transition-all duration-200"
                >
                  Prévention
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "prevention" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "prevention" && (
                  <div className="mt-2 ml-3 space-y-1 border-l-2 border-primary/20 pl-4">
                    <Link
                      href="/prevention/du-mois"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Votre prévention du mois
                    </Link>
                    <Link
                      href="/prevention/education-therapeutique"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Éducation thérapeutique
                    </Link>
                    <Link
                      href="/prevention/memos-suivi"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Mémos de suivi
                    </Link>
                    <Link
                      href="/prevention/sante-familiale"
                      className="block py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Santé familiale
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/faq"
                className="block px-4 py-2.5 text-base font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>

              <div className="px-4 pt-3">
                <Button
                  size="lg"
                  className="w-full rounded-full font-semibold text-base h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsSocialModalOpen(true)
                  }}
                >
                  Nous Rejoindre
                </Button>
              </div>
              </nav>
            )}
          </div>
        </div>
      </header>

      <SocialModal isOpen={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)} />
    </>
  )
}
