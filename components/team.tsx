import Image from "next/image";

export function Team() {
  const partners = [
    {
      name: "Assurance Maladie",
      description: "Sécurité Sociale - Agir ensemble, protéger chacun",
      image: "/AM-logo.png",
      link: "https://www.ameli.fr/gironde",
    },
    {
      name: "ARS Nouvelle-Aquitaine",
      description: "Agence Régionale de Santé",
      image: "/ARS-logo.jpg",
      link: "https://www.nouvelle-aquitaine.ars.sante.fr/",
    },
  ]

  return (
    <section id="partenaires" className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-3 lg:space-y-4 mb-10 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground text-balance">Nos partenaires</h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ensemble pour améliorer votre accès aux soins
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex"
            >
              <div className="rounded-2xl overflow-hidden bg-white border border-border hover:border-primary/30 transition-all duration-300 shadow-md hover:shadow-xl p-4 lg:p-8 flex flex-col w-full">
                <div className="aspect-[16/9] flex items-center justify-center mb-3 lg:mb-4 relative">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 50vw"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-sm lg:text-lg font-bold text-foreground mb-1 text-center">{partner.name}</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground text-center">{partner.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
