import { useRef, type FormEvent, type KeyboardEvent } from "react";
import SendIcon from "./SendIcon";

interface ChatFormProps {
  disabled: boolean;
  value: string;
  onChange: (text: string) => void;
  onSend: (text: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function ChatForm({ disabled, value, onChange, onSend, inputRef }: ChatFormProps) {
  const localRef = useRef<HTMLInputElement>(null);
  const ref = inputRef ?? localRef;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    onChange("");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          ref={ref}
          className="message-input"
          type="text"
          placeholder="Type a message..."
          autoComplete="off"
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        type="submit"
        className="action-btn send-btn"
        aria-label="Send"
        disabled={disabled}
      >
        <SendIcon />
      </button>
    </form>
  );
}
