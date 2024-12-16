import Link from "next/link";
import { db } from "@/src/db";
import { articles } from "@/src/db/schema";
import { desc } from "drizzle-orm";

import GenerateButton from "./components/GenerateButton";

async function getArticles() {
    return await db.select().from(articles).orderBy(desc(articles.createdAt));
}

export default async function Home() {
    const newsArticles = await getArticles();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-center text-gray-800">
                        DerpNews
                    </h1>
                    <p className="text-center text-gray-600 mt-2">
                        AI-Generated Satirical News
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <GenerateButton />
                </div>

                <div className="grid gap-6 max-w-3xl mx-auto">
                    {newsArticles.map((article) => (
                        <article
                            key={article.id}
                            className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <Link
                                href={`/article/${article.id}`}
                                className="block"
                            >
                                <h2 className="text-2xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {article.summary}
                                </p>
                                <div className="mt-4 text-blue-500 text-sm font-medium">
                                    Read more →
                                </div>
                            </Link>
                        </article>
                    ))}

                    {newsArticles.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p className="mb-4">No articles yet!</p>
                            <p>
                                Click the Generate button above to create your
                                first article.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t mt-12 py-6 bg-white">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    <p> 2024 DerpNews - AI-Generated Satire</p>
                </div>
            </footer>
        </div>
    );
}
