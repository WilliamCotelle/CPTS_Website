import { normalizeText } from "./normalize"
import type { ChatResource, KeywordIndexEntry, ResourceMatch } from "./types"

interface MatchOptions {
  input: string
  keywordIndex: KeywordIndexEntry[]
  resources: Record<string, ChatResource>
  minScore: number
  maxSuggestions: number
  fuzzyDistanceThreshold: number
}

const EXACT_MATCH_SCORE = 120
const CONTAINS_MATCH_SCORE = 85
const FUZZY_MATCH_SCORE = 55

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }

  return matrix[a.length][b.length]
}

function scoreKeywordMatch(input: string, keyword: string, fuzzyDistanceThreshold: number): number {
  if (input === keyword) {
    return EXACT_MATCH_SCORE
  }

  if (input.includes(keyword) || keyword.includes(input)) {
    return CONTAINS_MATCH_SCORE
  }

  const inputTokens = input.split(" ").filter(Boolean)
  const keywordTokens = keyword.split(" ").filter(Boolean)

  let bestDistance = Number.POSITIVE_INFINITY

  for (const inputToken of inputTokens) {
    if (inputToken.length < 4) {
      continue
    }

    for (const keywordToken of keywordTokens) {
      if (keywordToken.length < 4) {
        continue
      }

      const distance = levenshteinDistance(inputToken, keywordToken)
      if (distance < bestDistance) {
        bestDistance = distance
      }
    }
  }

  if (bestDistance <= fuzzyDistanceThreshold) {
    return FUZZY_MATCH_SCORE - bestDistance * 5
  }

  return 0
}

export function matchResources({
  input,
  keywordIndex,
  resources,
  minScore,
  maxSuggestions,
  fuzzyDistanceThreshold,
}: MatchOptions): ResourceMatch[] {
  const normalizedInput = normalizeText(input)

  if (!normalizedInput) {
    return []
  }

  const aggregatedScores = new Map<string, { score: number; matchedKeyword: string }>()

  for (const entry of keywordIndex) {
    const normalizedKeyword = normalizeText(entry.keyword)

    if (!normalizedKeyword) {
      continue
    }

    const baseScore = scoreKeywordMatch(normalizedInput, normalizedKeyword, fuzzyDistanceThreshold)

    if (baseScore === 0) {
      continue
    }

    const boostedScore = baseScore + (entry.scoreBoost ?? 0)
    const previous = aggregatedScores.get(entry.resourceId)

    if (!previous) {
      aggregatedScores.set(entry.resourceId, { score: boostedScore, matchedKeyword: normalizedKeyword })
      continue
    }

    const nextScore = Math.max(previous.score, boostedScore) + 4
    aggregatedScores.set(entry.resourceId, {
      score: nextScore,
      matchedKeyword: boostedScore > previous.score ? normalizedKeyword : previous.matchedKeyword,
    })
  }

  return [...aggregatedScores.entries()]
    .filter(([, value]) => value.score >= minScore)
    .map(([resourceId, value]) => ({
      resource: resources[resourceId],
      score: value.score,
      matchedKeyword: value.matchedKeyword,
    }))
    .filter((result): result is ResourceMatch => Boolean(result.resource))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSuggestions)
}
