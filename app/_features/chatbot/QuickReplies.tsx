import type { QuickReply } from "./types"

interface QuickRepliesProps {
  replies: QuickReply[]
  onSelect: (reply: QuickReply) => void
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (!replies.length) {
    return null
  }

  return (
    <div className="border-t border-border px-3 py-3" aria-label="Choix rapides">
      <div className="flex flex-wrap gap-2">
        {replies.map((reply) => (
          <button
            key={reply.id}
            type="button"
            onClick={() => onSelect(reply)}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  )
}
