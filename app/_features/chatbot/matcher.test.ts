import assert from "node:assert/strict"
import test from "node:test"

import { matchResources } from "./matcher"
import type { ChatResource, KeywordIndexEntry } from "./types"

const resources: Record<string, ChatResource> = {
  "medecin-traitant": {
    id: "medecin-traitant",
    type: "internal",
    title: "Médecin traitant",
    href: "/patients/medecin-traitant",
  },
  annuaire: {
    id: "annuaire",
    type: "internal",
    title: "Annuaire",
    href: "/patients/annuaire",
  },
  coordonnees: {
    id: "coordonnees",
    type: "internal",
    title: "Coordonnées",
    href: "/patients/coordonnees",
  },
  faq: {
    id: "faq",
    type: "internal",
    title: "FAQ",
    href: "/faq",
  },
}

const keywordIndex: KeywordIndexEntry[] = [
  { keyword: "medecin traitant", resourceId: "medecin-traitant", scoreBoost: 10 },
  { keyword: "annuaire", resourceId: "annuaire", scoreBoost: 4 },
  { keyword: "urgence", resourceId: "coordonnees" },
  { keyword: "faq", resourceId: "faq" },
]

function runMatch(input: string) {
  return matchResources({
    input,
    keywordIndex,
    resources,
    minScore: 45,
    maxSuggestions: 3,
    fuzzyDistanceThreshold: 1,
  })
}

test("matchResources priorise le match exact", () => {
  const matches = runMatch("médecin traitant")

  assert.equal(matches[0]?.resource.id, "medecin-traitant")
  assert.ok((matches[0]?.score ?? 0) > 100)
})

test("matchResources détecte un mot-clé contenu dans une phrase", () => {
  const matches = runMatch("Je cherche un annuaire de professionnels")

  assert.equal(matches[0]?.resource.id, "annuaire")
})

test("matchResources fait un fuzzy léger sans librairie", () => {
  const matches = runMatch("je cherche un medcin traitant")

  assert.equal(matches[0]?.resource.id, "medecin-traitant")
})

test("matchResources limite le résultat au top 3", () => {
  const matches = runMatch("medecin traitant annuaire urgence faq")

  assert.equal(matches.length, 3)
})
