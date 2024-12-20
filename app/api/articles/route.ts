import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { articles } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { log } from "@/src/utils/logger";

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
