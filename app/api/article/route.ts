import { log } from "@/src/utils/logger";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/src/db";
import { articles } from "@/src/db/schema";

import { generateArticle } from "@/src/services/gemini";
import { parseArticleContent } from "@/src/utils/article";
import { generateSlug } from "@/src/utils/slug";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");
        const slug = searchParams.get("slug");

        if (!id && !slug) {
            // Return all articles if no specific query
            const result = await db
                .select()
                .from(articles)
                .orderBy(articles.createdAt);
            return NextResponse.json(result);
        }

        // Query by slug if provided, otherwise by id
        const result = await db
            .select()
            .from(articles)
            .where(
                slug ? eq(articles.slug, slug) : eq(articles.id, parseInt(id!))
            )
            .limit(1);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json(
            { error: "Failed to fetch article" },
            { status: 500 }
        );
    }
}

export async function POST() {
    log("info", "Starting new article creation");

    try {
        const rawArticle = await generateArticle();
        log("debug", "Received raw article from Gemini", { raw: rawArticle });

        const article = parseArticleContent(rawArticle);
        log("debug", "Successfully parsed article content");

        if (!article) {
            log("error", "Failed to parse article content");
            return NextResponse.json(
                { error: "Failed to parse article content" },
                { status: 500 }
            );
        }

        const slug = generateSlug(article.title);

        const [newArticle] = await db
            .insert(articles)
            .values({ ...article, slug })
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
