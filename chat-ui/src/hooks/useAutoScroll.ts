import { useRef, useEffect } from "react";

export default function useAutoScroll(dep: unknown) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [dep]);

  return containerRef;
}
