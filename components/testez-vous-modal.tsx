"use client";

import { useState } from "react";
import { X, Check, AlertTriangle } from "lucide-react";

interface TestezVousModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: 1,
    question: "Depuis 6 mois, est-ce que vous souffrez d'essoufflement ?",
    key: "essoufflement",
  },
  {
    id: 2,
    question: "Depuis 6 mois, est-ce que vous avez eu une prise de poids ?",
    key: "poids",
  },
  {
    id: 3,
    question: "Depuis 6 mois, est-ce que vous souffrez d'œdème des jambes ?",
    key: "oedemes",
  },
  {
    id: 4,
    question: "Depuis 6 mois, est ce que vous souffrez de fatigue ?",
    key: "fatigue",
  },
];

export function TestezVousModal({ isOpen, onClose }: TestezVousModalProps) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleAnswer = (key: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const yesCount = Object.values(answers).filter(Boolean).length;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="p-6 lg:p-8">
          <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide mb-4">
            Auto-évaluation
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 pr-10">
            Diagnostic Insuffisance Cardiaque
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />

          {!allAnswered ? (
            <div className="space-y-5">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200"
                >
                  <p className="text-sm font-semibold text-foreground mb-3">
                    {q.question}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(q.key, true)}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        answers[q.key] === true
                          ? "bg-red-600 text-white shadow-md scale-105"
                          : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
                      }`}
                    >
                      Oui
                    </button>
                    <button
                      onClick={() => handleAnswer(q.key, false)}
                      className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        answers[q.key] === false
                          ? "bg-emerald-600 text-white shadow-md scale-105"
                          : "bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-400"
                      }`}
                    >
                      Non
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {yesCount === 0 ? (
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center">
                    Bon résultat
                  </h3>
                  <p className="text-base text-emerald-800 leading-relaxed">
                    Vous ne présentez pas de signes d'alerte d'insuffisance cardiaque actuellement. Continuez à surveiller votre état de santé et consultez votre médecin pour un suivi régulier.
                  </p>
                </div>
              ) : yesCount <= 2 ? (
                <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-3 text-center">
                    Vigilance recommandée
                  </h3>
                  <p className="text-base text-orange-800 leading-relaxed mb-4">
                    Vous présentez <strong>{yesCount}</strong> signe{yesCount > 1 ? "s" : ""} d'alerte. Il est recommandé de consulter votre médecin traitant pour un bilan.
                  </p>
                  <div className="bg-white p-4 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700">
                      Surveillez particulièrement :
                    </p>
                    <ul className="mt-2 space-y-1">
                      {Object.entries(answers)
                        .filter(([_, value]) => value)
                        .map(([key]) => (
                          <li key={key} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">-</span>
                            <span className="capitalize">{key.replace("_", " ")}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border-2 border-red-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-3 text-center">
                    Consultation urgente recommandée
                  </h3>
                  <p className="text-base text-red-800 leading-relaxed mb-4">
                    Vous présentez <strong>{yesCount}</strong> signes d'alerte sur 4. Ces symptômes peuvent indiquer une insuffisance cardiaque qui nécessite une prise en charge rapide.
                  </p>
                  <div className="bg-white p-4 rounded-xl border-2 border-red-200">
                    <p className="text-sm font-bold text-red-900 mb-2">
                      Action recommandée :
                    </p>
                    <p className="text-sm text-red-800">
                      Contactez rapidement votre médecin traitant ou consultez un service d'urgence si les symptômes s'aggravent.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Refaire le test
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Fermer
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Ce test est indicatif et ne remplace pas un avis médical professionnel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
