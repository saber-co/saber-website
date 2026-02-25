import { useState, useCallback } from "react";
import type { Capability } from "../types";

export default function useCallModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [capability, setCapability] = useState<Capability | null>(null);

  const open = useCallback((cap: Capability | null) => {
    setCapability(cap);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, capability, open, close };
}
