import type { ChatbotConfig, QuickReply } from "./types"

const mainQuickReplies: QuickReply[] = [
  {
    id: "qr-medecin-traitant",
    label: "Trouver un médecin traitant",
    value: "medecin traitant",
    nextNodeId: "medecin-traitant",
  },
  {
    id: "qr-urgences",
    label: "Urgences et numéros utiles",
    value: "urgences",
    nextNodeId: "urgences",
  },
  {
    id: "qr-sante-mentale",
    label: "Santé mentale",
    value: "sante mentale",
    nextNodeId: "sante-mentale",
  },
  {
    id: "qr-annuaire",
    label: "Trouver un professionnel",
    value: "annuaire",
    nextNodeId: "annuaire",
  },
  {
    id: "qr-prevention",
    label: "Prévention santé familiale",
    value: "prevention",
    nextNodeId: "prevention",
  },
  {
    id: "qr-faq",
    label: "FAQ / questions fréquentes",
    value: "faq",
    nextNodeId: "faq",
  },
]

const restartQuickReply: QuickReply = {
  id: "qr-retour-accueil",
  label: "Revenir au menu principal",
  value: "menu principal",
  nextNodeId: "start",
}

export const chatbotConfig: ChatbotConfig = {
  resources: {
    "medecin-traitant": {
      id: "medecin-traitant",
      type: "internal",
      title: "Avez-vous un médecin traitant ?",
      description: "Parcours et informations pour trouver un médecin traitant.",
      href: "/patients/medecin-traitant",
    },
    annuaire: {
      id: "annuaire",
      type: "internal",
      title: "Annuaire des professionnels de santé",
      description: "Rechercher un professionnel selon votre besoin.",
      href: "/patients/annuaire",
    },
    coordonnees: {
      id: "coordonnees",
      type: "internal",
      title: "Coordonnées utiles",
      description: "Tous les contacts essentiels pour urgences et soins non programmés.",
      href: "/patients/coordonnees",
    },
    "mon-espace-sante": {
      id: "mon-espace-sante",
      type: "internal",
      title: "Mon Espace Santé",
      description: "Comprendre et activer Mon Espace Santé.",
      href: "/patients/mon-espace-sante",
    },
    "sante-mentale": {
      id: "sante-mentale",
      type: "internal",
      title: "Ressources santé mentale",
      description: "Aides, articles et outils sur la santé mentale.",
      href: "/sante-mental",
    },
    "sante-mentale-jeunes": {
      id: "sante-mentale-jeunes",
      type: "internal",
      title: "Santé mentale des jeunes",
      description: "Ressources spécifiques pour les jeunes et leurs proches.",
      href: "/prevention/sante-mentale-des-jeunes",
    },
    "prevention-familiale": {
      id: "prevention-familiale",
      type: "internal",
      title: "Articles santé familiale",
      description: "Vaccination, dépistage, sommeil, prévention du quotidien.",
      href: "/prevention/sante-familiale",
    },
    faq: {
      id: "faq",
      type: "internal",
      title: "FAQ",
      description: "Réponses aux questions les plus fréquentes.",
      href: "/faq",
    },
    "contact-email": {
      id: "contact-email",
      type: "email",
      title: "Contacter la CPTS par email",
      description: "Pour une demande générale ou une orientation complémentaire.",
      value: "info@cpts-ouest-gironde.fr",
    },
    "urgence-3114": {
      id: "urgence-3114",
      type: "phone",
      title: "Prévention suicide - 3114",
      description: "Numéro national 24h/24, 7j/7.",
      value: "3114",
    },
  },
  keywordIndex: [
    { keyword: "medecin traitant", resourceId: "medecin-traitant", scoreBoost: 12 },
    { keyword: "recherche medecin", resourceId: "medecin-traitant" },
    { keyword: "annuaire", resourceId: "annuaire", scoreBoost: 8 },
    { keyword: "specialiste", resourceId: "annuaire" },
    { keyword: "urgence", resourceId: "coordonnees", scoreBoost: 10 },
    { keyword: "samu", resourceId: "coordonnees" },
    { keyword: "112", resourceId: "coordonnees" },
    { keyword: "sante mentale", resourceId: "sante-mentale", scoreBoost: 9 },
    { keyword: "depression", resourceId: "sante-mentale" },
    { keyword: "angoisse", resourceId: "sante-mentale" },
    { keyword: "suicide", resourceId: "urgence-3114", scoreBoost: 10 },
    { keyword: "jeunes", resourceId: "sante-mentale-jeunes" },
    { keyword: "mon espace sante", resourceId: "mon-espace-sante", scoreBoost: 10 },
    { keyword: "vaccination", resourceId: "prevention-familiale" },
    { keyword: "faq", resourceId: "faq", scoreBoost: 7 },
  ],
  nodes: {
    start: {
      id: "start",
      message:
        "Bonjour, je peux t’aider à trouver la bonne ressource CPTS. Clique un choix rapide ou écris ta question.",
      quickReplies: mainQuickReplies,
    },
    "medecin-traitant": {
      id: "medecin-traitant",
      message: "Pour trouver un médecin traitant, voici les ressources les plus utiles :",
      quickReplies: [
        {
          id: "qr-voir-annuaire",
          label: "Voir aussi l’annuaire",
          value: "voir annuaire",
          actionResourceIds: ["annuaire"],
        },
        restartQuickReply,
      ],
      actions: [
        {
          type: "suggest_resources",
          resourceIds: ["medecin-traitant", "annuaire"],
        },
      ],
    },
    urgences: {
      id: "urgences",
      message: "En cas de besoin urgent, je te redirige vers les contacts adaptés :",
      quickReplies: [restartQuickReply],
      actions: [
        {
          type: "suggest_resources",
          resourceIds: ["coordonnees", "urgence-3114"],
        },
      ],
    },
    "sante-mentale": {
      id: "sante-mentale",
      message: "Pour la santé mentale, ces ressources peuvent t’aider rapidement :",
      quickReplies: [restartQuickReply],
      actions: [
        {
          type: "suggest_resources",
          resourceIds: ["sante-mentale", "sante-mentale-jeunes", "urgence-3114"],
        },
      ],
    },
    annuaire: {
      id: "annuaire",
      message: "Je te conseille l’annuaire pour trouver un professionnel de santé :",
      quickReplies: [restartQuickReply],
      actions: [
        {
          type: "suggest_resources",
          resourceIds: ["annuaire"],
        },
      ],
    },
    prevention: {
      id: "prevention",
      message: "Voici les contenus de prévention santé familiale :",
      quickReplies: [restartQuickReply],
      actions: [
        {
          type: "suggest_resources",
          resourceIds: ["prevention-familiale"],
        },
      ],
    },
    faq: {
      id: "faq",
      message: "Tu peux commencer par la FAQ, puis nous écrire si nécessaire :",
      quickReplies: [restartQuickReply],
      actions: [
        {
          type: "suggest_resources",
          resourceIds: ["faq", "contact-email"],
        },
      ],
    },
    fallback: {
      id: "fallback",
      message:
        "Je n’ai pas trouvé de ressource précise. Tu peux reformuler ta question ou choisir une catégorie ci-dessous.",
      quickReplies: mainQuickReplies,
    },
  },
  rules: {
    startNodeId: "start",
    fallbackNodeId: "fallback",
    restartNodeId: "start",
    maxSuggestions: 3,
    minScore: 55,
    fuzzyDistanceThreshold: 1,
    decisionRules: [
      {
        id: "rule-quick-reply-text",
        trigger: "quick_reply_text",
        description: "Si le texte correspond à un choix rapide, suivre sa transition.",
      },
      {
        id: "rule-keyword",
        trigger: "keyword_detected",
        description: "Si un mot-clé est détecté, proposer les 3 meilleures ressources.",
      },
      {
        id: "rule-fallback",
        trigger: "no_match",
        description: "Si aucun match, afficher les catégories et suggérer une reformulation.",
      },
    ],
  },
}
