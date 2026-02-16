"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
// import { BackgroundGradient } from "@/components/background-gradient";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import faqData from "@/app/data/faq.json";

export default function FAQPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    faqData.questions[0].id
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <main className="min-h-screen relative">
      {/* <BackgroundGradient /> */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-12 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-md lg:max-w-lg">
              <Image
                src="/faq/FAQs-cuate.svg"
                alt="FAQ"
                width={500}
                height={500}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-8 lg:py-12 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.questions.map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-gray-200 rounded-2xl overflow-hidden"
                >
                  {/* Accordion Button */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full px-6 py-5 lg:px-8 lg:py-6 bg-primary transition-colors flex items-center justify-between text-left group"
                  >
                    <span className="text-lg lg:text-xl font-bold text-white pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-white flex-shrink-0 transition-transform duration-300 ${
                        openAccordion === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openAccordion === item.id
                        ? "max-h-[5000px] opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="p-6 lg:p-8 bg-white">
                      <p className="leading-relaxed text-muted-foreground text-base lg:text-lg">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
