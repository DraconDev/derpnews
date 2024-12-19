import { generateArticle } from "@/src/services/gemini";
import { log } from "@/src/utils/logger";
import { parseArticleContent } from "../app/api/articles/route";
import { articles } from "@/src/db/schema";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { db } from "@/src/db";

export async function POST() {
    log("info", "Starting new article creation");

    try {
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
        log("error", "Failed to create article", {
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { error: "Failed to create article" },
            { status: 500 }
        );
    }
}
