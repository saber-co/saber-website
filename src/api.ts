import { IS_PREVIEW, BASE_PATH, TENANT_SLUG } from "./config";
import type { ChatMessage, SSEEvent } from "./types";

export async function fetchTenant(): Promise<{ slug: string; display_name: string }> {
  try {
    const res = await fetch(`/t/${TENANT_SLUG}/api/tenant`);
    if (!res.ok) return { slug: TENANT_SLUG, display_name: TENANT_SLUG };
    return res.json();
  } catch {
    return { slug: TENANT_SLUG, display_name: TENANT_SLUG };
  }
}

export async function fetchUsage(): Promise<string> {
  if (IS_PREVIEW) return "\u221E";
  try {
    const res = await fetch(`${BASE_PATH}/api/usage`);
    if (!res.ok) return "--";
    const data = await res.json();
    return Number(data.balance).toFixed(2);
  } catch {
    return "--";
  }
}

export async function loadHistory(): Promise<ChatMessage[]> {
  if (IS_PREVIEW) return [];
  try {
    const res = await fetch(`${BASE_PATH}/api/history`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.messages.map(
      (m: { id: string; role: string; content: string; created_at: string }) => ({
        id: m.id,
        role: m.role as ChatMessage["role"],
        content: m.content,
        createdAt: m.created_at,
        status: m.role === "user" ? ("READ" as const) : undefined,
      })
    );
  } catch {
    return [];
  }
}

export async function* streamChat(message: string): AsyncGenerator<SSEEvent> {
  if (IS_PREVIEW) {
    yield {
      type: "token",
      content:
        "Preview response: UI is wired. The skills widgets, call modal, and input bar are all active.",
    };
    yield { type: "done" };
    return;
  }

  const res = await fetch(`${BASE_PATH}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    yield {
      type: "error",
      content: err.error || err.detail || `Error: ${res.status}`,
    };
    return;
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (!jsonStr) continue;

      try {
        const event = JSON.parse(jsonStr) as SSEEvent;
        yield event;
      } catch {
        // ignore malformed SSE chunks
      }
    }
  }
}

export async function submitCall(
  phoneNumber: string,
  skillKey: string
): Promise<{ success: boolean; message: string }> {
  if (IS_PREVIEW) {
    return { success: true, message: "Preview: call initiated" };
  }

  try {
    const res = await fetch(`${BASE_PATH}/api/call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number: phoneNumber, skill_key: skillKey }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      return { success: true, message: data.message || "Call initiated" };
    }

    return {
      success: false,
      message: data.detail || data.message || data.error || "Call failed",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { success: false, message: `Connection error: ${msg}` };
  }
}
