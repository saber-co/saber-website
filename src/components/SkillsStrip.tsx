import { capabilityCatalog } from "../data/capabilities";
import type { Capability } from "../types";

interface SkillsStripProps {
  onSkillClick: (capability: Capability) => void;
}

export default function SkillsStrip({ onSkillClick }: SkillsStripProps) {
  const doubled = [...capabilityCatalog, ...capabilityCatalog];

  return (
    <section className="skills-strip-wrapper" aria-label="OpenClaw capabilities">
      <div className="skills-track" role="list">
        {doubled.map((cap, i) => (
          <button
            key={`${cap.key}-${i}`}
            type="button"
            className="skill-card"
            role="listitem"
            onClick={() => onSkillClick(cap)}
            aria-label={cap.label}
          >
            <span className="skill-card-type">{cap.type}</span>
            <span className="skill-card-label">{cap.label}</span>
            <span className="skill-card-desc">{cap.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
