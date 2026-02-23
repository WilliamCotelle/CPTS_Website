import { Header } from "@/components/header";
import { NewHero } from "@/components/new-hero";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { Actualites } from "@/components/actualites";
import { Services } from "@/components/services";
import { Mission } from "@/components/mission";
import { Team } from "@/components/team";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import {
  BackgroundGradient0,
  BackgroundGradient1,
  BackgroundGradient2,
  BackgroundGradient3,
  BackgroundGradient4,
  BackgroundGradient5,
  BackgroundGradient6,
  BackgroundGradient7,
  BackgroundGradient8,
  BackgroundGradient9,
  BackgroundGradient10,
  BackgroundGradient11,
  BackgroundGradient12,
  BackgroundGradient13,
  BackgroundGradient14,
  BackgroundGradient15,
  BackgroundGradient16,
  BackgroundGradient17,
  BackgroundGradient18,
  BackgroundGradient19,
  BackgroundGradient20,
  BackgroundGradient21,
  BackgroundGradient22,
  BackgroundGradient23,
  BackgroundGradient24,
  BackgroundGradient25,
  BackgroundGradient26,
  BackgroundGradient27,
  BackgroundGradient28,
  BackgroundGradient29,
  BackgroundGradient30,
  BackgroundGradient31,
  BackgroundGradient32,
  BackgroundGradient33,
  BackgroundGradient34,
  BackgroundGradient35,
  BackgroundGradient36,
  BackgroundGradient37,
  BackgroundGradient38,
  BackgroundGradient39,
  BackgroundGradient40,
  BackgroundGradient41,
  BackgroundGradient42,
  BackgroundGradient43,
  BackgroundGradient44,
  BackgroundGradient45,
  BackgroundGradient46,
  BackgroundGradient47,
  BackgroundGradient48,
  BackgroundGradient49,
} from "@/components/background-gradient";

export default function Home() {
  return (
    <main className="min-h-screen [--home-header-height:7rem]">
      <BackgroundGradient0 />

      {/* Wrapper z-10 pour mettre tout le contenu au-dessus du background */}
      <div className="relative z-10">
        <Header />
        <NewHero />
        <FeaturedCarousel />
        <Actualites />
        <Mission />
        <Services />
        <Team />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
