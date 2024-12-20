import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { articles } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { log } from "@/src/utils/logger";

export function parseArticleContent(text: string) {
    try {
        // First try direct JSON parse
        return JSON.parse(text);
    } catch {
        // If that fails, try to extract from markdown
        const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[1]);
            } catch (e2) {
                log("error", "Failed to parse extracted JSON from markdown", {
                    error: e2 instanceof Error ? e2.message : "Unknown error",
                    extractedContent: jsonMatch[1],
                });
                throw new Error("Invalid article format");
            }
        }
        log("error", "No valid JSON or markdown block found", { text });
        throw new Error("Invalid article format");
    }
}

export async function GET() {
    log("info", "Fetching all articles");

    try {
        const allArticles = await db
            .select()
            .from(articles)
            .orderBy(desc(articles.createdAt));

        log("info", "Successfully fetched articles", {
            count: allArticles.length,
        });
        return NextResponse.json(allArticles);
    } catch (error) {
        log("error", "Failed to fetch articles", {
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { error: "Failed to fetch articles" },
            { status: 500 }
        );
    }
}
