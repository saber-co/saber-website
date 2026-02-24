import type { Capability } from "../types";

export const capabilityCatalog: Capability[] = [
  {
    key: "coding-agent",
    label: "Coding Agent",
    type: "Skill",
    description: "Write, refactor, and ship code across any repo with full context and test coverage.",
    template: `Act as my autonomous coding agent. I want you to open the repo at [repo path], deeply understand the architecture, then implement [feature/fix]. Don't just write code — run the tests, validate the output, catch edge cases, and tell me exactly what changed and why. This is what OpenClaw makes possible: an AI that doesn't just suggest code in a chat box, but actually opens files, runs commands, edits, tests, and ships — the same way a senior engineer would, but without the back-and-forth. Show me what autonomous software development looks like.`,
  },
  {
    key: "gh-issues",
    label: "GitHub Issues",
    type: "Skill",
    description: "Triage, implement, and close GitHub issues autonomously with PR summaries.",
    template: `Go to [owner/repo] on GitHub, pull the 10 most recent open issues tagged as bugs, and for each one: understand the root cause, implement a fix in an isolated branch, run tests, open a PR with a clear description, and report back with status. Most AI assistants can talk about GitHub. OpenClaw can actually work GitHub — reading issues, writing code, pushing branches, opening PRs — without you touching a single button. This is the difference between an AI that advises and an AI that executes.`,
  },
  {
    key: "github",
    label: "GitHub CLI",
    type: "Skill",
    description: "Full GitHub CLI access — PRs, reviews, CI checks, and branch operations.",
    template: `Check the latest open PRs on [owner/repo]. For each one, look at CI status, review comments, and failing checks — then tell me exactly what needs to happen to get each one merged. If there's a clear fix, implement it. OpenClaw has full access to the GitHub CLI, which means it can read PR diffs, understand review threads, patch code, re-run checks, and summarize everything in plain English. You get an AI that doesn't just read your repo — it actively maintains it.`,
  },
  {
    key: "healthcheck",
    label: "Healthcheck",
    type: "Skill",
    description: "Security audit your host: firewall, SSH posture, exposed services, and remediation.",
    template: `Run a full security healthcheck on this OpenClaw host. Check firewall rules, SSH configuration, exposed ports, running services, pending system updates, and any obvious hardening gaps. Prioritize every finding by risk level and give me a concrete remediation checklist. OpenClaw runs on your infrastructure — that means it can actually inspect it too. Most AI tools can't touch your server. OpenClaw lives there, which means it can audit it, harden it, and keep it secure as part of your normal workflow.`,
  },
  {
    key: "session-logs",
    label: "Session Logs",
    type: "Skill",
    description: "Search and surface prior conversations to trace decisions and past context.",
    template: `Search through all prior session logs for any decisions, discussions, or context related to [topic]. Pull out a timeline of the key decisions made, who was involved, and what was agreed. Cite the exact excerpts. OpenClaw doesn't have amnesia between sessions — it keeps a searchable log of everything. That means when you come back to a project weeks later, you don't have to re-explain your architecture, preferences, or past decisions. The context is already there, indexed, and ready to surface.`,
  },
  {
    key: "skill-creator",
    label: "Skill Creator",
    type: "Skill",
    description: "Design and build new reusable AgentSkills with docs, examples, and guardrails.",
    template: `I want to build a new reusable OpenClaw skill for [workflow]. Design the full skill: write the SKILL.md with clear instructions, usage examples, input/output contracts, guardrails for edge cases, and any helper scripts needed to make it work reliably. OpenClaw's skills aren't static — you can define new capabilities and teach it new workflows. This is the compounding advantage: every skill you create makes the system more powerful, and every run sharpens how it executes. Build the skill once, use it everywhere.`,
  },
  {
    key: "tmux",
    label: "tmux Control",
    type: "Skill",
    description: "Attach to live terminal sessions and run interactive workflows end-to-end.",
    template: `Attach to the tmux session named [session-name]. Run [commands], capture the full pane output at each step, and keep going until the entire workflow is complete. Don't stop at the first command — stay in the session, react to what you see, and handle whatever comes up interactively. Most AI tools are stuck behind a chat interface. OpenClaw can attach to a live terminal, see what's on screen, type commands, respond to prompts, and navigate interactive programs — the same way a human operator would.`,
  },
  {
    key: "video-frames",
    label: "Video Frames",
    type: "Skill",
    description: "Extract frames, clips, and key moments from any video file with ffmpeg.",
    template: `Take the video at [file path], extract a keyframe every [N] seconds, and generate a short highlight clip around timestamp [T]. Save everything to [output directory] and give me a visual summary of what's in the footage. OpenClaw treats video as data. With direct ffmpeg access, it can extract frames, cut clips, analyze motion, and generate summaries — without you needing to open a video editor or write a single ffmpeg command. Your media library becomes something you can reason about and act on.`,
  },
  {
    key: "weather",
    label: "Weather",
    type: "Skill",
    description: "Instant current conditions and forecasts with practical recommendations.",
    template: `Get me the current weather and a 24-hour forecast for [location]. Don't just give me the numbers — tell me what it means practically. Should I change any plans? Is there anything I should know before heading out? OpenClaw connects to real-time data, which means it doesn't just answer questions — it answers them with fresh information and packages the answer in a way that actually helps you decide what to do. This is what it feels like when your AI is hooked into the real world.`,
  },
  {
    key: "browser",
    label: "Browser Automation",
    type: "Capability",
    description: "Control a real browser — navigate, click, fill forms, and capture screenshots.",
    template: `Open [URL] in a real browser and walk through [flow] step by step. Click through the UI, fill in any forms, extract the key information from the final state, and capture a screenshot. Don't describe what the page looks like — actually navigate it. OpenClaw can control a real browser the same way you do. That means it can log into web apps, fill out multi-step forms, scrape pages that require JavaScript, interact with dashboards, and complete web-based workflows without your hands ever touching the keyboard.`,
  },
  {
    key: "web-research",
    label: "Web Research",
    type: "Capability",
    description: "Deep multi-source web research synthesized into concise, cited summaries.",
    template: `Research [topic] thoroughly. Find at least 5 high-quality recent sources, fetch the full content of the most relevant pages, cross-reference the key claims, and deliver a tight, evidence-backed summary with citations. Don't give me a surface-level answer — go deep. OpenClaw doesn't stop at a search results page. It actually fetches and reads the content, synthesizes across sources, catches contradictions, and distills everything into something you can act on. This is research done at machine speed, with human-level judgment.`,
  },
  {
    key: "reminders",
    label: "Reminders",
    type: "Capability",
    description: "Set timed reminders that fire with full context from your current conversation.",
    template: `Set a reminder for [duration] from now to [task]. When it fires, include the relevant context from this conversation so I know exactly where I left off and what I was trying to do. OpenClaw reminders aren't just pings — they fire with memory. They know what you were working on, what decisions were pending, and what comes next. It's the difference between a calendar alert that says "meeting" and one that says "you were deciding between option A and B — here's where you landed."`,
  },
  {
    key: "memory",
    label: "Memory Recall",
    type: "Capability",
    description: "Query long-term memory to surface past decisions, preferences, and agreements.",
    template: `Search my long-term memory for everything related to [topic]. Surface any past decisions, preferences, prior context, or agreements we've made. Cite the specific sessions or exchanges where they came up. One of the biggest failures of AI assistants is that they forget everything the moment a conversation ends. OpenClaw has persistent memory across sessions — so your preferences, your architecture decisions, your recurring workflows, your personal context — it all carries forward. You stop re-explaining yourself and start building on what you've already established.`,
  },
  {
    key: "node-devices",
    label: "Node Devices",
    type: "Capability",
    description: "Access paired hardware nodes — pull location, camera, and sensor data on demand.",
    template: `Connect to paired node [name] and pull its current location, a camera snapshot, and any available sensor readings. Compare against the last known state and summarize what's changed. OpenClaw isn't just a cloud service — it can reach into the physical world through paired hardware nodes. That means location data, live camera feeds, environmental sensors, and more, all accessible from a single conversation. Your AI gets eyes, ears, and awareness of the world beyond the screen.`,
  },
  {
    key: "messaging",
    label: "Messaging",
    type: "Capability",
    description: "Send proactive messages to any channel or target with concise, actionable content.",
    template: `Send the following update to [channel or contact]: [message]. Keep it short, include only what's actionable, and make sure the tone matches the audience. OpenClaw can reach out, not just respond. That means proactive status updates, automated alerts, team notifications, and outbound messages — all triggered from a conversation or a workflow. Your AI doesn't wait to be asked. It communicates on your behalf when something matters.`,
  },
  {
    key: "subagents",
    label: "Subagents",
    type: "Capability",
    description: "Spawn parallel sub-agents for long or complex tasks with milestone reporting.",
    template: `Spawn a sub-agent to handle [task]. Have it work autonomously, check in at each major milestone with a brief status update, and return the full output plus a list of any changed files or decisions made when it's done. OpenClaw can scale itself. When a task is too large or complex for a single thread, it spawns sub-agents to work in parallel — each one focused, each one reporting back. This is what makes genuinely ambitious, multi-step automation possible. Not just one AI working for you, but a coordinated team of them.`,
  },
  {
    key: "tts",
    label: "Voice (TTS)",
    type: "Capability",
    description: "Convert any response to natural spoken audio with tone and pacing control.",
    template: `Read the following aloud with natural pacing and a clear, friendly tone: [text]. Keep phrasing concise — no filler, no awkward transitions. Make it sound like something a person would actually say. OpenClaw can speak. That means your AI isn't locked to a screen — it can narrate summaries while you're driving, read back documents for review, deliver briefings out loud, or give your product a voice. Text to speech isn't new. Text to speech that understands context and delivers it naturally is.`,
  },
];

export const capabilityByKey = capabilityCatalog.reduce<
  Record<string, Capability>
>((acc, cap) => {
  acc[cap.key] = cap;
  return acc;
}, {});
