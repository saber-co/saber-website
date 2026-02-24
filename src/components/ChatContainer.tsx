import { type RefObject } from "react";
import type { ChatMessage } from "../types";
import MessageBubble from "./MessageBubble";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function TimestampSeparator({ date }: { date: Date }) {
  const todayKey = new Date().toDateString();
  const isToday = date.toDateString() === todayKey;

  const text = isToday
    ? `Today ${formatTime(date)}`
    : date.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

  return <div className="timestamp-separator">{text}</div>;
}

interface ChatContainerProps {
  messages: ChatMessage[];
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ChatContainer({
  messages,
  containerRef,
}: ChatContainerProps) {
  let lastDateKey = "";

  return (
    <div className="chat-scroll" ref={containerRef} aria-live="polite">
      {messages.map((msg, i) => {
        const date = new Date(msg.createdAt);
        const dateKey = date.toDateString();
        const showSeparator = dateKey !== lastDateKey;
        if (showSeparator) lastDateKey = dateKey;

        return (
          <div key={msg.id || `msg-${i}`} style={{ display: "flex", flexDirection: "column" }}>
            {showSeparator && <TimestampSeparator date={date} />}
            <MessageBubble message={msg} />
          </div>
        );
      })}
    </div>
  );
}
