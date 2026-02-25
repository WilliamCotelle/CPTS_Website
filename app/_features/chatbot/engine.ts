import { matchResources } from "./matcher"
import { normalizeText } from "./normalize"
import type {
  ChatMessage,
  ChatNode,
  ChatbotConfig,
  ChatbotState,
  QuickReply,
  ResourceMatch,
} from "./types"

export const CHATBOT_HISTORY_KEY = "cpts_chatbot_history"

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

function logDev(event: string, payload: unknown): void {
  if (isDevelopment()) {
    // Minimal observability in dev only
    console.info(`[chatbot] ${event}`, payload)
  }
}

function createMessage(
  role: ChatMessage["role"],
  text: string,
  extra: Pick<ChatMessage, "quickReplies" | "suggestions"> = {},
): ChatMessage {
  const messageId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return {
    id: messageId,
    role,
    text,
    timestamp: Date.now(),
    quickReplies: extra.quickReplies,
    suggestions: extra.suggestions,
  }
}

function resolveNode(config: ChatbotConfig, nodeId: string): ChatNode {
  return config.nodes[nodeId] ?? config.nodes[config.rules.fallbackNodeId]
}

function suggestionsFromResourceIds(config: ChatbotConfig, resourceIds: string[]): ResourceMatch[] {
  return resourceIds
    .map((resourceId, index) => {
      const resource = config.resources[resourceId]
      if (!resource) {
        return null
      }

      return {
        resource,
        score: 100 - index * 5,
        matchedKeyword: "action-node",
      }
    })
    .filter((item): item is ResourceMatch => Boolean(item))
    .slice(0, config.rules.maxSuggestions)
}

function buildNodeMessages(config: ChatbotConfig, node: ChatNode): ChatMessage[] {
  const messages: ChatMessage[] = [
    createMessage("bot", node.message, {
      quickReplies: node.quickReplies,
    }),
  ]

  if (!node.actions?.length) {
    return messages
  }

  for (const action of node.actions) {
    if (action.type !== "suggest_resources") {
      continue
    }

    const suggestions = suggestionsFromResourceIds(config, action.resourceIds)
    if (!suggestions.length) {
      continue
    }

    messages.push(
      createMessage("bot", action.message ?? "Je te conseille :", {
        suggestions,
      }),
    )
  }

  return messages
}

function findTextQuickReply(node: ChatNode, input: string): QuickReply | undefined {
  const normalizedInput = normalizeText(input)

  return node.quickReplies?.find((reply) => {
    const labelMatch = normalizeText(reply.label) === normalizedInput
    const valueMatch = normalizeText(reply.value) === normalizedInput
    return labelMatch || valueMatch
  })
}

function applyQuickReplyWithoutUserMessage(
  state: ChatbotState,
  config: ChatbotConfig,
  quickReply: QuickReply,
): ChatbotState {
  const nextMessages = [...state.messages]
  let nextNodeId = state.currentNodeId

  if (quickReply.actionResourceIds?.length) {
    const suggestions = suggestionsFromResourceIds(config, quickReply.actionResourceIds)

    if (suggestions.length) {
      nextMessages.push(createMessage("bot", "Je te conseille :", { suggestions }))
    }
  }

  if (quickReply.nextNodeId) {
    const nextNode = resolveNode(config, quickReply.nextNodeId)
    nextMessages.push(...buildNodeMessages(config, nextNode))
    nextNodeId = nextNode.id
  }

  const nextState = {
    currentNodeId: nextNodeId,
    messages: nextMessages,
  }

  logDev("quick-reply", {
    quickReplyId: quickReply.id,
    nextNodeId,
  })

  return nextState
}

function isPersistedState(value: unknown): value is ChatbotState {
  if (!value || typeof value !== "object") {
    return false
  }

  const candidate = value as ChatbotState

  return typeof candidate.currentNodeId === "string" && Array.isArray(candidate.messages)
}

export function createInitialState(config: ChatbotConfig): ChatbotState {
  const startNode = resolveNode(config, config.rules.startNodeId)

  return {
    currentNodeId: startNode.id,
    messages: buildNodeMessages(config, startNode),
  }
}

export function hydrateState(config: ChatbotConfig): ChatbotState {
  if (!isBrowser()) {
    return createInitialState(config)
  }

  try {
    const raw = window.localStorage.getItem(CHATBOT_HISTORY_KEY)
    if (!raw) {
      return createInitialState(config)
    }

    const parsed: unknown = JSON.parse(raw)
    if (!isPersistedState(parsed)) {
      return createInitialState(config)
    }

    return parsed
  } catch {
    return createInitialState(config)
  }
}

export function persistState(state: ChatbotState): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(CHATBOT_HISTORY_KEY, JSON.stringify(state))
  logDev("persist", {
    currentNodeId: state.currentNodeId,
    messageCount: state.messages.length,
  })
}

export function restartConversation(config: ChatbotConfig): ChatbotState {
  const nextState = createInitialState(config)
  logDev("restart", { nodeId: nextState.currentNodeId })
  return nextState
}

export function processQuickReply(
  state: ChatbotState,
  quickReply: QuickReply,
  config: ChatbotConfig,
): ChatbotState {
  const stateWithUserMessage: ChatbotState = {
    ...state,
    messages: [...state.messages, createMessage("user", quickReply.label)],
  }

  return applyQuickReplyWithoutUserMessage(stateWithUserMessage, config, quickReply)
}

export function processUserInput(
  state: ChatbotState,
  input: string,
  config: ChatbotConfig,
): ChatbotState {
  const trimmed = input.trim()

  if (!trimmed) {
    return state
  }

  const messagesWithUser = [...state.messages, createMessage("user", trimmed)]
  const currentNode = resolveNode(config, state.currentNodeId)
  const matchedQuickReply = findTextQuickReply(currentNode, trimmed)

  if (matchedQuickReply) {
    return applyQuickReplyWithoutUserMessage(
      {
        ...state,
        messages: messagesWithUser,
      },
      config,
      matchedQuickReply,
    )
  }

  const matches = matchResources({
    input: trimmed,
    keywordIndex: config.keywordIndex,
    resources: config.resources,
    maxSuggestions: config.rules.maxSuggestions,
    minScore: config.rules.minScore,
    fuzzyDistanceThreshold: config.rules.fuzzyDistanceThreshold,
  })

  if (matches.length > 0) {
    logDev("keyword-match", {
      input: trimmed,
      matches: matches.map((match) => ({ resourceId: match.resource.id, score: match.score })),
    })

    return {
      currentNodeId: state.currentNodeId,
      messages: [
        ...messagesWithUser,
        createMessage("bot", "Je te conseille :", {
          suggestions: matches,
        }),
      ],
    }
  }

  const fallbackNode = resolveNode(config, config.rules.fallbackNodeId)
  logDev("fallback", {
    input: trimmed,
    fallbackNodeId: fallbackNode.id,
  })

  return {
    currentNodeId: fallbackNode.id,
    messages: [...messagesWithUser, ...buildNodeMessages(config, fallbackNode)],
  }
}
