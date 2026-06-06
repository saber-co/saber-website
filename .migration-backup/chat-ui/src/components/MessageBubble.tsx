import type { ChatMessage } from "../types";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const date = new Date(message.createdAt);
  const isError = message.status === "ERROR";

  const statusText = message.status === "ERROR" ? "ERROR" : "";
  const metaText = `${formatTime(date)}${statusText ? ` \u2022 ${statusText}` : ""}`;

  return (
    <div className={`message-group ${isUser ? "sent" : "received"}`}>
      <div className={`bubble${isError ? " error" : ""}`}>
        {message.isStreaming && !message.content ? (
          <span className="typing-indicator">Thinking</span>
        ) : (
          message.content
        )}
        <span className="bubble-meta">{metaText}</span>
      </div>
    </div>
  );
}
