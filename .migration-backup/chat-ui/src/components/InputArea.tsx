import { useState, useRef } from "react";
import SkillsStrip from "./SkillsStrip";
import ChatForm from "./ChatForm";
import type { Capability } from "../types";

interface InputAreaProps {
  streaming: boolean;
  onSend: (text: string) => void;
}

export default function InputArea({ streaming, onSend }: InputAreaProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSkillClick(cap: Capability) {
    setText(cap.template);
    setTimeout(() => {
      inputRef.current?.focus();
      const len = cap.template.length;
      inputRef.current?.setSelectionRange(len, len);
    }, 0);
  }

  return (
    <div className="input-area">
      <SkillsStrip onSkillClick={handleSkillClick} />
      <ChatForm
        disabled={streaming}
        value={text}
        onChange={setText}
        onSend={onSend}
        inputRef={inputRef}
      />
    </div>
  );
}
