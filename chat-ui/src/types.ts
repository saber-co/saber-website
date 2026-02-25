export interface ChatMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  status?: "READ" | "ERROR";
  isStreaming?: boolean;
}

export interface Capability {
  key: string;
  label: string;
  type: "Skill" | "Capability";
  template: string;
  description?: string;
}

export interface CallModalState {
  isOpen: boolean;
  capability: Capability | null;
  status: "idle" | "pending" | "success" | "error";
  statusMessage: string;
  submitting: boolean;
}

export interface SSEEvent {
  type: "token" | "done" | "error";
  content?: string;
  tokens?: number;
}

declare global {
  interface Window {
    __TENANT_SLUG__?: string;
    __TENANT_NAME__?: string;
  }
}
