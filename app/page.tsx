"use client";
import { ArticleType } from "@/src/db/schema";
import Link from "next/link";
import { useEffect, useState } from "react";

async function getArticles(): Promise<ArticleType[]> {
    const response = await fetch("/api/articles");
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }
    return response.json();
}

export default function Home() {
    const [articles, setArticles] = useState<ArticleType[]>();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles();
                setArticles(articlesData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchArticles();
    }, []);

    return (
        <main className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-4xl font-bold tracking-tight hover:text-purple-200 transition-colors">
                        <Link href="/">DerpNews</Link>
                    </h1>
                    <form action="/api/articles" method="POST">
                        <button
                            type="submit"
                            className="bg-white text-purple-600 hover:bg-purple-100 font-semibold px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg"
                        >
                            Generate New Article
                        </button>
                    </form>
                </div>
            </header>

            {/* Articles Grid */}
            <div className="container mx-auto flex-grow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles &&
                        articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/article/${article.id}`}
                                className="group"
                            >
                                <article className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition-all duration-300 border border-gray-200 h-full flex flex-col">
                                    <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-600 flex-grow">
                                        {article.summary}
                                    </p>
                                    <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                                        <span>
                                            {new Date(
                                                article.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                        <span className="text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
                                            Read more →
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-gray-100 border-t border-gray-200 py-6">
                <div className="container mx-auto px-6 text-center text-gray-600">
                    <p>
                        {" "}
                        {new Date().getFullYear()} DerpNews - Your Source for
                        AI-Generated Satire
                    </p>
                </div>
            </footer>
        </main>
    );
}
