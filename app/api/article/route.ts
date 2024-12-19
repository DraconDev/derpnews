import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/src/db";
import { articles } from "@/src/db/schema";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || typeof id !== "string") {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    try {
        const article = await db
            .select()
            .from(articles)
            .where(eq(articles.id, parseInt(id)))
            .limit(1);

        if (!article) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error) {
        console.log("error", "Failed to fetch article", {
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { error: "Failed to fetch article" },
            { status: 500 }
        );
    }
}
