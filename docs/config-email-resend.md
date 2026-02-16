# Configuration Email - Resend

## Situation actuelle (Test)
- **Destinataire** : `contact@nexyra.dev`
- **Expéditeur** : `onboarding@resend.dev` (domaine test Resend)
- **Limite** : Emails uniquement vers ton adresse Resend

## Pour la production (CPTS)

### 1. Vérifier un domaine sur Resend
1. Va sur https://resend.com/domains
2. Clique "Add Domain"
3. Entre le domaine : `cpts-ouest-gironde.fr`
4. Ajoute les enregistrements DNS fournis par Resend (MX, TXT, DKIM)
5. Attends la vérification (quelques minutes à 24h)

### 2. Modifier le code
Dans `app/api/contact/route.ts`, change :

```ts
// Avant (test)
from: "CPTS Ouest Gironde <onboarding@resend.dev>",
to: ["contact@nexyra.dev"],

// Après (production)
from: "CPTS Ouest Gironde <contact@cpts-ouest-gironde.fr>",
to: ["info@cpts-ouest-gironde.fr"],  // ou l'email souhaité
```

### 3. Variables d'environnement Vercel
1. Va dans les settings du projet Vercel
2. Ajoute : `RESEND_API_KEY` = `re_iCu7t24i_...` (ta clé)

### 4. Supprimer les console.log
Une fois en prod, retirer les logs de debug dans `route.ts`.

## Résumé des fichiers
- `.env.local` - Clé API (local uniquement, pas sur Git)
- `app/api/contact/route.ts` - Route API d'envoi
- `components/contact.tsx` - Formulaire front
