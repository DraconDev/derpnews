import { NextResponse } from "next/server";
import { generateArticle } from "@/src/services/gemini";
import { db } from "@/src/db";
import { articles } from "@/src/db/schema";
import { log } from "@/src/utils/logger";
import { parseArticleContent } from "@/src/utils/article";

// Environment variables
const CRON_SECRET = process.env.CRON_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
    // Check environment variables first
    if (!GEMINI_API_KEY) {
        log("error", "GEMINI_API_KEY is not set");
        return NextResponse.json(
            { error: "GEMINI_API_KEY is required" },
            { status: 500 }
        );
    }

    if (!CRON_SECRET) {
        log("error", "CRON_SECRET is not set");
        return NextResponse.json(
            { error: "CRON_SECRET is required" },
            { status: 500 }
        );
    }

    const { secret } = await request.json();

    if (secret !== CRON_SECRET) {
        log("error", "Invalid secret provided");
        return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    try {
        log("info", "Starting article generation");
        const rawArticle = await generateArticle();

        if (!rawArticle) {
            return NextResponse.json(
                { error: "Generated article is empty" },
                { status: 500 }
            );
        }

        const article = parseArticleContent(rawArticle);

        if (!article) {
            return NextResponse.json(
                { error: "Failed to parse article content" },
                { status: 500 }
            );
        }

        log("debug", "Successfully parsed article content");

        const [newArticle] = await db
            .insert(articles)
            .values(article)
            .returning();

        log("info", "Successfully created new article", {
            id: newArticle.id,
            title: newArticle.title,
        });

        return NextResponse.json(newArticle);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        log("error", "Failed to generate article", { error: errorMessage });
        return NextResponse.json(
            { error: `Failed to generate article: ${errorMessage}` },
            { status: 500 }
        );
    }
}
