import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/src/db";
import { articles } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { log } from "@/src/utils/logger";

async function getArticle(id: number) {
    log("info", "Fetching article by ID", { id });

    try {
        const [article] = await db
            .select()
            .from(articles)
            .where(eq(articles.id, id));

        if (!article) {
            log("warn", "Article not found", { id });
            notFound();
        }

        log("info", "Successfully fetched article", {
            id,
            title: article.title,
        });
        return article;
    } catch (error) {
        log("error", "Error fetching article", {
            id,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        throw error;
    }
}

export default async function ArticlePage({
    params,
}: {
    params: { id: string };
}) {
    const article = await getArticle(parseInt(params.id));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <Link href="/" className="text-4xl font-bold text-black hover:text-blue-600 transition-colors">
                        DerpNews
                    </Link>
                    <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-grow">
                <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        {article.title}
                    </h1>
                    <p className="text-xl text-black mb-8 leading-relaxed">
                        {article.summary}
                    </p>
                    <div className="prose prose-lg max-w-none">
                        {article.content
                            .split("\n\n")
                            .map((paragraph, index) => (
                                <p key={index} className="mb-4 text-black">
                                    {paragraph}
                                </p>
                            ))}
                    </div>
                </article>
            </main>

            <footer className="bg-white mt-auto border-t py-6">
                <div className="container mx-auto px-4 text-center text-black">
                    <p> 2024 DerpNews - AI-Generated Satire</p>
                </div>
            </footer>
        </div>
    );
}
