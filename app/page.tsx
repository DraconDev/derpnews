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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-black">
                        DerpNews
                    </h1>
                    <GenerateButton />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-grow">
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
                                <h2 className="text-2xl font-semibold mb-2 text-black hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-black leading-relaxed">
                                    {article.summary}
                                </p>
                                <div className="mt-4 text-blue-500 text-sm font-medium">
                                    Read more →
                                </div>
                            </Link>
                        </article>
                    ))}

                    {newsArticles.length === 0 && (
                        <div className="text-center py-12 text-black">
                            <p className="mb-4">No articles yet!</p>
                            <p>
                                Click the Generate button above to create your
                                first article.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="bg-white mt-auto border-t py-6">
                <div className="container mx-auto px-4 text-center text-black">
                    <p> 2024 DerpNews - AI-Generated Satire</p>
                </div>
            </footer>
        </div>
    );
}
