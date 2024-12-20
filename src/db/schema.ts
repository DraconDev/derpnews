import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    content: text("content").notNull(),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ArticleType = typeof articles.$inferSelect;
