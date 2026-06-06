import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const demoRequestsTable = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  challenge: text("challenge").notNull(),
  source: text("source").notNull().default("landing"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDemoRequestSchema = createInsertSchema(demoRequestsTable).omit({
  id: true,
  source: true,
  createdAt: true,
});
export type InsertDemoRequest = z.infer<typeof insertDemoRequestSchema>;
export type DemoRequest = typeof demoRequestsTable.$inferSelect;
