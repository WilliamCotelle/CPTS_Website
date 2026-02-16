# 🏗️ Architecture du Projet - CPTS Ouest Gironde

## 📋 Vue d'ensemble

Projet Next.js 15 avec App Router, TypeScript, Tailwind CSS et composants Radix UI.

**Stack technique :**
- **Framework** : Next.js 15.2.4
- **UI** : React 19 + Tailwind CSS 4.1.9
- **Components** : Radix UI + Lucide Icons
- **Language** : TypeScript strict
- **Package Manager** : npm/pnpm

---

## 📁 Structure du Projet

```
cpts-website/
├── app/                        # App Router (Next.js 13+)
│   ├── layout.tsx             # Layout racine global
│   ├── page.tsx               # Page d'accueil
│   ├── globals.css            # Styles globaux Tailwind
│   │
│   ├── data/                  # 🆕 Données JSON externalisées
│   │   ├── sante-mentale.json
│   │   ├── sante-mentale-2.json
│   │   ├── formations.json
│   │   ├── supports.json
│   │   ├── formation.json     # Ancien fichier (legacy)
│   │   └── nos-actions-vos-outils.json
│   │
│   ├── actualites/            # Routes actualités
│   │   ├── certificats-medicaux/
│   │   ├── diabete/
│   │   ├── diversification-alimentaire/
│   │   └── recherche-medecin-traitant/
│   │
│   ├── patients/              # Routes espace patients
│   │   ├── coordonnees/
│   │   ├── annuaire/
│   │   ├── medecin-traitant/
│   │   └── mon-espace-sante/
│   │
│   ├── prevention/            # Routes prévention
│   │   ├── du-mois/
│   │   ├── education-therapeutique/
│   │   ├── memos-suivi/
│   │   └── sante-familiale/
│   │
│   ├── professionnels/        # Routes professionnels
│   │   ├── adhesion/
│   │   ├── supports/          # Commander des supports
│   │   ├── formations/        # Les formations
│   │   └── actions-outils/
│   │       ├── page.tsx
│   │       ├── data.tsx       # Données accordéons
│   │       ├── types.ts
│   │       └── components/    # Composants locaux
│   │
│   ├── presentation/
│   │   ├── page.tsx
│   │   └── suivi-activites/
│   │
│   ├── sante-mentale/
│   ├── sante-mentale-2/
│   └── faq/
│
├── components/                # Composants réutilisables
│   ├── header.tsx            # Header global (CLIENT)
│   ├── footer.tsx            # Footer global (SERVER)
│   ├── hero.tsx              # Carousel homepage (CLIENT)
│   ├── actualites.tsx        # Section actualités (SERVER)
│   ├── mission.tsx           # Section mission (SERVER)
│   ├── services.tsx          # Section services (SERVER)
│   ├── team.tsx              # Section équipe (SERVER)
│   ├── contact.tsx           # Formulaire contact (CLIENT)
│   ├── social-modal.tsx      # Modale réseaux sociaux (CLIENT)
│   ├── download-button.tsx   # Bouton téléchargement (CLIENT)
│   ├── theme-provider.tsx    # Provider thème (CLIENT)
│   ├── navigation-data.ts    # 🆕 Données navigation centralisées
│   │
│   └── ui/                   # Composants Radix UI (55 composants)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── accordion.tsx
│       ├── tabs.tsx
│       └── ...
│
├── hooks/                    # Custom React hooks
│   ├── use-toast.ts
│   └── use-mobile.ts
│
├── lib/
│   └── utils.ts             # Utilitaires (clsx, tailwind-merge)
│
├── public/                   # Assets statiques
│   ├── actions-outils/      # PDFs actions & outils
│   ├── supports/            # Images supports
│   └── actu/                # Images actualités
│
├── styles/
│
├── next.config.mjs          # Configuration Next.js
├── tailwind.config.ts       # Configuration Tailwind
├── tsconfig.json            # Configuration TypeScript
├── package.json
│
├── REFACTORING.md          # 🆕 Journal de refactorisation
└── ARCHITECTURE.md         # 🆕 Ce document
```

---

## 🎯 Architecture Client/Server

### Principe général

Next.js 15 utilise **Server Components par défaut**. Seuls les composants nécessitant de l'interactivité utilisent `"use client"`.

### Pages SERVER (18 pages - 78%)

✅ **Avantages** : SEO optimal, performance, pas de JavaScript côté client

- Page d'accueil `/`
- 4 pages actualités
- 4 pages patients (placeholders)
- 4 pages prévention (placeholders)
- `/presentation`
- `/professionnels/adhesion`
- `/faq`
- `/presentation/suivi-activites`

### Pages CLIENT (5 pages - 22%)

⚠️ **Nécessitent JavaScript** pour l'interactivité

| Page | Raison |
|------|--------|
| `/professionnels/formations` | Tabs interactifs |
| `/professionnels/supports` | Panier + formulaire |
| `/professionnels/actions-outils` | Accordéons |
| `/sante-mentale` | Modales dynamiques |
| `/sante-mentale-2` | Layout escalier interactif |

### Composants de la page d'accueil

**CLIENT (3/8)** :
- `header.tsx` → Menu mobile + dropdowns
- `hero.tsx` → Carousel
- `contact.tsx` → Formulaire

**SERVER (5/8)** :
- `actualites.tsx`, `services.tsx`, `mission.tsx`, `team.tsx`, `footer.tsx`

---

## 📊 Gestion des Données

### Données JSON externalisées (app/data/)

| Fichier | Contenu | Utilisé par |
|---------|---------|-------------|
| `sante-mentale.json` | 6 thématiques + annuaire | `sante-mentale/page.tsx` |
| `sante-mentale-2.json` | 6 thématiques + positions | `sante-mentale-2/page.tsx` |
| `formations.json` | Formations 2024/2025 | `professionnels/formations/page.tsx` |
| `supports.json` | 12 supports disponibles | `professionnels/supports/page.tsx` |
| `navigation-data.ts` | Routes du header | `components/header.tsx` |

### Comment utiliser les données JSON

```typescript
// ✅ Bon : Importer depuis app/data/
import data from "@/app/data/formations.json"

const formations = data.formationsSimairlec2025
```

```typescript
// ❌ Mauvais : Ne plus hardcoder les données
const formations = [
  { title: "...", date: "..." }, // À éviter
]
```

---

## 🛣️ Routes Disponibles

### Routes publiques

```
/                               # Page d'accueil
/presentation                   # Présentation CPTS
/presentation/suivi-activites   # Suivi activités
/faq                           # Questions fréquentes
```

### Actualités

```
/actualites/diabete
/actualites/certificats-medicaux
/actualites/diversification-alimentaire
/actualites/recherche-medecin-traitant
```

### Espace Patients

```
/patients/coordonnees           # Coordonnées utiles
/patients/annuaire              # Annuaire professionnels
/patients/medecin-traitant      # Info médecin traitant
/patients/mon-espace-sante      # Mon Espace Santé
```

### Prévention

```
/prevention/du-mois             # Prévention du mois
/prevention/education-therapeutique
/prevention/memos-suivi
/prevention/sante-familiale
```

### Professionnels

```
/professionnels/adhesion        # Adhérer à la CPTS
/professionnels/supports        # Commander supports
/professionnels/formations      # Formations disponibles
/professionnels/actions-outils  # Actions & outils
```

### Santé mentale

```
/sante-mentale                  # Version circulaire
/sante-mentale-2                # Version escalier
```

---

## 🧩 Composants Principaux

### Layout & Navigation

| Composant | Type | Rôle |
|-----------|------|------|
| `header.tsx` | CLIENT | Header fixe + navigation responsive |
| `footer.tsx` | SERVER | Footer avec liens sociaux |
| `navigation-data.ts` | DATA | Routes centralisées |

### Sections Homepage

| Composant | Type | Rôle |
|-----------|------|------|
| `hero.tsx` | CLIENT | Carousel principal |
| `actualites.tsx` | SERVER | Liste actualités |
| `mission.tsx` | SERVER | Mission CPTS |
| `services.tsx` | SERVER | Services proposés |
| `team.tsx` | SERVER | Équipe |
| `contact.tsx` | CLIENT | Formulaire contact |

### Composants Utilitaires

| Composant | Type | Rôle |
|-----------|------|------|
| `social-modal.tsx` | CLIENT | Modale réseaux sociaux |
| `download-button.tsx` | CLIENT | Bouton téléchargement PDF |
| `theme-provider.tsx` | CLIENT | Gestion thème clair/sombre |

---

## ➕ Ajouter une Nouvelle Feature

### 1. Ajouter une nouvelle page

```bash
# Créer le dossier de la route
mkdir -p app/ma-nouvelle-page

# Créer page.tsx
touch app/ma-nouvelle-page/page.tsx
```

```tsx
// app/ma-nouvelle-page/page.tsx
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MaNouvellePagePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Votre contenu ici */}
      <section className="pt-32 pb-20 px-4">
        <h1>Ma Nouvelle Page</h1>
      </section>

      <Footer />
    </main>
  )
}
```

### 2. Ajouter une route au header

Modifier `components/navigation-data.ts` :

```typescript
export const navigationItems = [
  // ... routes existantes
  {
    label: "MA PAGE",
    href: "/ma-nouvelle-page",
    type: "link" as const,
  },
]
```

### 3. Ajouter des données JSON

```bash
# Créer le fichier JSON
touch app/data/ma-feature.json
```

```json
{
  "items": [
    { "id": "1", "title": "Item 1" }
  ]
}
```

```tsx
// Dans votre page
import data from "@/app/data/ma-feature.json"

const items = data.items
```

---

## 🎨 Conventions de Code

### Naming

- **Composants** : PascalCase (`Header.tsx`, `HeroSection.tsx`)
- **Fichiers data** : kebab-case (`navigation-data.ts`, `formations.json`)
- **Routes** : kebab-case (`/mon-espace-sante`, `/actions-outils`)

### Structure d'une page

```tsx
// ✅ Bon ordre d'imports
import { Header } from "@/components/header"      // Composants
import { Button } from "@/components/ui/button"   // UI components
import data from "@/app/data/example.json"        // Data
import { useState } from "react"                  // React hooks

// Si besoin de CLIENT
"use client"

export default function MaPage() {
  return (
    <main>
      <Header />
      {/* Contenu */}
      <Footer />
    </main>
  )
}
```

### Client vs Server

```tsx
// ✅ Utiliser SERVER par défaut
export default function MaPage() {
  // Pas de useState, useEffect, onClick...
}

// ⚠️ Utiliser CLIENT uniquement si nécessaire
"use client"

export default function MaPageInteractive() {
  const [state, setState] = useState(false)
  // Avec interactivité
}
```

---

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev              # Lance le serveur dev (http://localhost:3000)

# Build
npm run build            # Build de production
npm run start            # Démarre le build de prod

# Nettoyage
rm -rf .next             # Nettoyer le cache Next.js
rm -rf node_modules      # Nettoyer node_modules

# Réinstaller
npm install              # Réinstaller les dépendances
```

---

## 🐛 Debugging

### Erreur : "Module not found"

```bash
# Nettoyer et rebuild
rm -rf .next
npm run dev
```

### Erreur : Style ne charge pas

```bash
# Redémarrer le serveur
Ctrl+C
npm run dev
```

### Erreur : 404 sur une route

1. Vérifier que le fichier `page.tsx` existe dans le dossier
2. Vérifier que le nom du dossier correspond à l'URL
3. Redémarrer le serveur

---

## 📚 Ressources

- **Next.js Docs** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Radix UI** : https://www.radix-ui.com/docs/primitives
- **Lucide Icons** : https://lucide.dev/icons

---

## 🔄 Historique des Modifications

- **2026-01-09** : Création de ARCHITECTURE.md (Phase 4)
- **2026-01-09** : Refactoring Phases 1-3 (-1397 lignes)
- **2026-01-09** : Ajout navigation-data.ts + 4 fichiers JSON

---

*Document maintenu à jour - Dernière révision : 2026-01-09*
