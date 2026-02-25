"use client"

import { RotateCcw, Send, X } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { MessageBubble } from "./MessageBubble"
import { QuickReplies } from "./QuickReplies"
import type { ChatMessage, QuickReply } from "./types"

interface ChatWindowProps {
  messages: ChatMessage[]
  onSend: (input: string) => void
  onQuickReply: (reply: QuickReply) => void
  onRestart: () => void
  onClose: () => void
}

export function ChatWindow({ messages, onSend, onQuickReply, onRestart, onClose }: ChatWindowProps) {
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const latestQuickReplies = useMemo(() => {
    const reversed = [...messages].reverse()
    const lastBotMessageWithQuickReplies = reversed.find(
      (message) => message.role === "bot" && (message.quickReplies?.length ?? 0) > 0,
    )

    return lastBotMessageWithQuickReplies?.quickReplies ?? []
  }, [messages])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = draft.trim()
    if (!value) {
      return
    }

    onSend(value)
    setDraft("")
  }

  return (
    <div className="flex h-[min(72vh,36rem)] w-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p id="chatbot-title" className="text-sm font-semibold text-foreground">
            Assistant CPTS
          </p>
          <p className="text-xs text-muted-foreground">Orientation sans IA, par mots-clés</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onRestart}
            aria-label="Recommencer la conversation"
          >
            <RotateCcw className="size-4" />
          </Button>
          <Button type="button" size="icon-sm" variant="ghost" onClick={onClose} aria-label="Fermer la fenêtre chatbot">
            <X className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3" aria-live="polite" aria-label="Historique des messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>

      <QuickReplies replies={latestQuickReplies} onSelect={onQuickReply} />

      <form className="border-t border-border p-3" onSubmit={handleSubmit}>
        <label htmlFor="chatbot-input" className="sr-only">
          Votre message
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="chatbot-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ex: Je cherche un médecin traitant"
            autoComplete="off"
          />
          <Button type="submit" size="icon" aria-label="Envoyer le message">
            <Send className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
