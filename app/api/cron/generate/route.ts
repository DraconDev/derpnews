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
    try {
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

        let requestBody;
        try {
            requestBody = await request.json();
            log("debug", "Received request body", { body: requestBody });
        } catch (error) {
            log("error", "Failed to parse request body", {
                error: error instanceof Error ? error.message : "Unknown error",
                headers: Object.fromEntries(request.headers),
            });
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { secret } = requestBody;

        if (!secret) {
            log("error", "No secret provided in request");
            return NextResponse.json(
                { error: "Secret is required" },
                { status: 400 }
            );
        }

        if (secret !== CRON_SECRET) {
            log("error", "Invalid secret provided", {
                providedLength: secret.length,
                expectedLength: CRON_SECRET.length,
            });
            return NextResponse.json(
                { error: "Invalid secret" },
                { status: 401 }
            );
        }

        try {
            log("info", "Starting article generation in route handler");
            const rawArticle = await generateArticle();

            if (!rawArticle) {
                log("error", "Generated article is empty in route handler");
                return NextResponse.json(
                    { error: "Generated article is empty" },
                    { status: 500 }
                );
            }

            log("debug", "Raw article received", { length: rawArticle.length });
            const article = parseArticleContent(rawArticle);

            if (!article) {
                log(
                    "error",
                    "Failed to parse article content in route handler"
                );
                return NextResponse.json(
                    { error: "Failed to parse article content" },
                    { status: 500 }
                );
            }

            log("debug", "Article parsed successfully", {
                title: article.title,
                summaryLength: article.summary?.length,
                contentLength: article.content?.length,
            });

            const [newArticle] = await db
                .insert(articles)
                .values(article)
                .returning();

            log("info", "Successfully created new article", {
                id: newArticle.id,
                title: newArticle.title,
                timestamp: new Date().toISOString(),
            });

            return NextResponse.json({
                success: true,
                article: {
                    id: newArticle.id,
                    title: newArticle.title,
                },
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            log("error", "Failed to generate article", { error: errorMessage });
            return NextResponse.json(
                { error: `Failed to generate article: ${errorMessage}` },
                { status: 500 }
            );
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        log("error", "Failed to handle request", { error: errorMessage });
        return NextResponse.json(
            { error: `Failed to handle request: ${errorMessage}` },
            { status: 500 }
        );
    }
}
