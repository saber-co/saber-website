import { Router, type IRouter } from "express";
import { CreateDemoRequestBody } from "@workspace/api-zod";
import { db, demoRequestsTable } from "@workspace/db";

const router: IRouter = Router();

type DemoRequestParse = ReturnType<typeof CreateDemoRequestBody.safeParse>;
type DemoRequestIssue = Extract<
  DemoRequestParse,
  { success: false }
>["error"]["issues"][number];

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  company: "Company name",
  email: "Email",
  challenge: "Challenge",
};

function formatValidationError(issues: DemoRequestIssue[]): string {
  const messages = issues.map((issue) => {
    const field = String(issue.path[0] ?? "");
    const label = FIELD_LABELS[field] ?? "Field";

    if (field === "email" && issue.code === "invalid_string") {
      return "Please enter a valid email address";
    }
    if (issue.code === "too_small" || issue.code === "invalid_type") {
      return `${label} is required`;
    }
    if (issue.code === "too_big") {
      return `${label} is too long`;
    }
    return `${label} is invalid`;
  });

  // De-duplicate while preserving order so a single field can't repeat.
  return [...new Set(messages)].join(". ");
}

function trimIfString(value: unknown): unknown {
  return typeof value === "string" ? value.trim() : value;
}

router.post("/demo-requests", async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  // Trim before validation so whitespace-only fields fail required checks
  // and length limits apply to the value we actually persist.
  const candidate = {
    name: trimIfString(body.name),
    company: trimIfString(body.company),
    email: trimIfString(body.email),
    challenge: trimIfString(body.challenge),
  };

  const parsed = CreateDemoRequestBody.safeParse(candidate);

  if (!parsed.success) {
    res.status(400).json({ error: formatValidationError(parsed.error.issues) });
    return;
  }

  try {
    await db.insert(demoRequestsTable).values({
      name: parsed.data.name,
      company: parsed.data.company,
      email: parsed.data.email,
      challenge: parsed.data.challenge,
      source: "landing",
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    req.log?.error({ err }, "Failed to save demo request");
    res.status(500).json({ error: "Failed to save demo request" });
  }
});

export default router;
