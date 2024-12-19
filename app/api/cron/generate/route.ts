import { NextResponse } from "next/server";
import { generateArticle } from "@/src/services/gemini";
import { db } from "@/src/db";
import { articles } from "@/src/db/schema";

// Add a simple secret key validation
const CRON_SECRET = process.env.CRON_SECRET || "secretestesttestsetkey";

export async function POST(request: Request) {
    try {
        // Validate the secret from the request
        const { secret } = await request.json();

        if (secret !== CRON_SECRET) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Generate and save the article
        const articleJson = await generateArticle();
        const article = JSON.parse(articleJson);
        const [insertedArticle] = await db
            .insert(articles)
            .values(article)
            .returning();

        return NextResponse.json(insertedArticle);
    } catch (error) {
        console.error("Error in cron job:", error);
        return NextResponse.json(
            { error: "Failed to generate article" },
            { status: 500 }
        );
    }
}
