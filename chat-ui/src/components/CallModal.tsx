import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { Capability } from "../types";
import * as api from "../api";

interface CallModalProps {
  isOpen: boolean;
  capability: Capability | null;
  onClose: () => void;
}

export default function CallModal({
  isOpen,
  capability,
  onClose,
}: CallModalProps) {
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setStatusMessage("");
      setSubmitting(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  async function handleSubmit() {
    const trimmed = phone.trim();
    if (!trimmed) {
      setStatus("error");
      setStatusMessage("Enter a phone number");
      return;
    }

    setSubmitting(true);
    setStatus("pending");
    setStatusMessage("Initiating call...");

    const skillKey = capability?.key ?? "coding-agent";
    const result = await api.submitCall(trimmed, skillKey);

    if (result.success) {
      setStatus("success");
      setStatusMessage("Call initiated! You'll receive a call shortly.");
    } else {
      setStatus("error");
      setStatusMessage(result.message);
      setSubmitting(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  if (!isOpen) return null;

  const title = "enter ur number to give a call";
  const subtitle = capability
    ? `${capability.type} \u2014 ${capability.key}`
    : "General assistant";

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true">
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close call modal"
        >
          Close
        </button>
        <h2 className="modal-title">{title}</h2>
        <p className="call-modal-skill">{subtitle}</p>
        <label className="modal-field-label" htmlFor="phone-input">
          Phone number (E.164)
        </label>
        <input
          ref={inputRef}
          id="phone-input"
          className="modal-text-input"
          type="tel"
          inputMode="tel"
          placeholder="+15551234567"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="call-submit-btn"
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? (status === "success" ? "Call sent" : "Calling...") : "Call me"}
        </button>
        {status !== "idle" && (
          <p className={`call-status call-status--${status}`}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}
