import { useState, useCallback, useEffect } from "react";
import { IS_PREVIEW } from "../config";
import * as api from "../api";
import type { ChatMessage } from "../types";

export default function useChat(onDone?: () => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);

  const loadHistory = useCallback(async () => {
    const history = await api.loadHistory();
    if (history.length) {
      setMessages(history);
    } else if (IS_PREVIEW) {
      setMessages([
        {
          role: "assistant",
          content:
            "UI preview mode is on. Tap a skill chip to open the call modal, or type a message to see mock streaming.",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setStreaming(true);

      const userMsg: ChatMessage = {
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
        status: "READ",
      };

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      try {
        let fullText = "";

        for await (const event of api.streamChat(trimmed)) {
          if (event.type === "token") {
            fullText += event.content ?? "";
            const captured = fullText;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: captured,
              };
              return updated;
            });
          } else if (event.type === "done") {
            onDone?.();
          } else if (event.type === "error") {
            const errContent = `${fullText}\n[Error: ${event.content}]`;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: errContent,
                status: "ERROR",
                isStreaming: false,
              };
              return updated;
            });
          }
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            isStreaming: false,
          };
          return updated;
        });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: `Connection error: ${msg}`,
            status: "ERROR",
            isStreaming: false,
          };
          return updated;
        });
      } finally {
        setStreaming(false);
      }
    },
    [streaming, onDone]
  );

  return { messages, streaming, sendMessage };
}
