import { NextResponse } from "next/server";
import { generateArticle } from "@/src/services/gemini";
import { db } from "@/src/db";
import { articles } from "@/src/db/schema";
import { log } from "@/src/utils/logger";
import { parseArticleContent } from "../../articles/route";

// Add a simple secret key validation
const CRON_SECRET = process.env.CRON_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Validate required environment variables
if (!GEMINI_API_KEY) {
    log("error", "GEMINI_API_KEY is not set");
    throw new Error("GEMINI_API_KEY is required");
}

if (!CRON_SECRET) {
    log("error", "CRON_SECRET is not set");
    throw new Error("CRON_SECRET is required");
}

export async function POST(request: Request) {
    try {
        // Validate the secret from the request
        const body = await request.json();
        const { secret } = body;

        if (!secret) {
            log("error", "No secret provided in request");
            return NextResponse.json(
                { error: "No secret provided" },
                { status: 401 }
            );
        }

        if (secret !== CRON_SECRET) {
            log("error", "Invalid secret provided");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        log("info", "Starting article generation");
        const rawArticle = await generateArticle();
        log("debug", "Received raw article from Gemini", { raw: rawArticle });

        const article = parseArticleContent(rawArticle);
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
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        log("error", "Failed to generate article", { error: errorMessage });
        return NextResponse.json(
            { error: "Failed to generate article" },
            { status: 500 }
        );
    }
}
