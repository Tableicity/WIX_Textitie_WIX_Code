import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  CreateLeadBody,
  CreateLeadResponse,
  ListLeadsResponseItem,
  OptOutLeadResponse,
  OptOutLeadParams,
} from "@workspace/api-zod";
import { notifyNewLead } from "../lib/notify.js";

const router: IRouter = Router();

/** Normalize a phone number to digits (with optional leading +) for dedupe. */
function normalizePhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  if (!/^\+?\d{7,15}$/.test(cleaned)) return null;
  return cleaned;
}

router.post("/leads", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const phone = normalizePhone(parsed.data.phone);
  if (!phone) {
    res.status(400).json({ error: "Please enter a valid phone number" });
    return;
  }

  const existing = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.phone, phone));
  if (existing.length > 0) {
    res.status(200).json(CreateLeadResponse.parse(existing[0]));
    return;
  }

  const [lead] = await db
    .insert(leadsTable)
    .values({ phone, source: parsed.data.source ?? "unknown" })
    .returning();
  req.log.info({ leadId: lead.id, source: lead.source }, "lead captured");

  // Fire-and-forget notification — failures must not block the response.
  notifyNewLead(lead).catch(() => {});

  res.status(201).json(CreateLeadResponse.parse(lead));
});

router.get("/leads", async (_req, res) => {
  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));
  res.json(leads.map((l) => ListLeadsResponseItem.parse(l)));
});

router.post("/leads/:id/opt-out", async (req, res) => {
  const params = OptOutLeadParams.safeParse(req.params);
  if (!params.success) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  const [lead] = await db
    .update(leadsTable)
    .set({ optedOut: true })
    .where(eq(leadsTable.id, params.data.id))
    .returning();
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json(OptOutLeadResponse.parse(lead));
});

export default router;
