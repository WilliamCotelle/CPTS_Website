import assert from "node:assert/strict"
import test from "node:test"

import { chatbotConfig } from "./chatbot.config"
import { createInitialState, processUserInput } from "./engine"

function getLastBotMessage(stateMessages: ReturnType<typeof createInitialState>["messages"]) {
  const reversed = [...stateMessages].reverse()
  return reversed.find((message) => message.role === "bot")
}

test("processUserInput répond à une salutation avec un message conversationnel", () => {
  const initialState = createInitialState(chatbotConfig)
  const nextState = processUserInput(initialState, "bonjour", chatbotConfig)

  const lastBotMessage = getLastBotMessage(nextState.messages)

  assert.ok(lastBotMessage)
  assert.match(lastBotMessage.text, /assistant d'orientation CPTS/i)
})

test("processUserInput répond poliment aux remerciements", () => {
  const initialState = createInitialState(chatbotConfig)
  const nextState = processUserInput(initialState, "merci beaucoup", chatbotConfig)

  const lastBotMessage = getLastBotMessage(nextState.messages)

  assert.ok(lastBotMessage)
  assert.match(lastBotMessage.text, /avec plaisir/i)
})

test("processUserInput propose des ressources de contact sur demande", () => {
  const initialState = createInitialState(chatbotConfig)
  const nextState = processUserInput(initialState, "comment vous contacter", chatbotConfig)

  const lastBotMessage = getLastBotMessage(nextState.messages)

  assert.ok(lastBotMessage)
  assert.ok((lastBotMessage.suggestions?.length ?? 0) > 0)
  assert.ok(lastBotMessage.suggestions?.some((item) => item.resource.id === "contact-email"))
})

test("processUserInput explique la CPTS et propose la page présentation", () => {
  const initialState = createInitialState(chatbotConfig)
  const nextState = processUserInput(initialState, "c'est quoi la cpts ?", chatbotConfig)

  const lastBotMessage = getLastBotMessage(nextState.messages)

  assert.ok(lastBotMessage)
  assert.match(lastBotMessage.text, /communaut. professionnelle territoriale de sant./i)
  assert.ok(lastBotMessage.suggestions?.some((item) => item.resource.id === "presentation"))
  assert.ok(!lastBotMessage.suggestions?.some((item) => item.resource.id === "pro-adhesion"))
})

test("processUserInput répond aux formulations familières de type chatbot", () => {
  const initialState = createInitialState(chatbotConfig)
  const nextState = processUserInput(initialState, "comment tu peux m'aider", chatbotConfig)

  const lastBotMessage = getLastBotMessage(nextState.messages)

  assert.ok(lastBotMessage)
  assert.match(lastBotMessage.text, /je peux vous orienter/i)
})

test("processUserInput fallback propose un contact quand aucun match", () => {
  const initialState = createInitialState(chatbotConfig)
  const nextState = processUserInput(initialState, "texte totalement inconnu xyz", chatbotConfig)

  const botMessages = nextState.messages.filter((message) => message.role === "bot")
  const hasContactSuggestion = botMessages.some((message) =>
    message.suggestions?.some((item) => item.resource.id === "contact-email"),
  )

  assert.ok(hasContactSuggestion)
})
