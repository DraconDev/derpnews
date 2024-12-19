"use client";
import { ArticleType } from "@/src/db/schema";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, ChevronRight } from "lucide-react";

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

    useEffect(() => {
        const handleRouteChange = () => {
            const fetchArticles = async () => {
                try {
                    const articlesData = await getArticles();
                    setArticles(articlesData);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchArticles();
        };

        window.addEventListener('focus', handleRouteChange);
        return () => {
            window.removeEventListener('focus', handleRouteChange);
        };
    }, []);

    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900">
            {/* Header */}

            {/* Articles Grid */}
            <div className="container mx-auto flex-grow px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                    {articles &&
                        articles.map((article, index) => (
                            <Link
                                key={article.id}
                                href={`/article/${article.id}`}
                                className="group"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <article
                                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-5 border border-slate-700/50 
                                    hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col
                                    hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1
                                    ring-1 ring-cyan-500/10 hover:ring-cyan-500/20"
                                >
                                    <div className="flex flex-col h-full">
                                        <h2
                                            className="text-lg font-semibold mb-3 text-white group-hover:text-cyan-400 
                                            transition-colors line-clamp-2 tracking-tight"
                                        >
                                            {article.title}
                                        </h2>
                                        <p className="text-slate-300 text-sm flex-grow line-clamp-3 leading-relaxed">
                                            {article.summary}
                                        </p>
                                        <div className="mt-4 flex justify-between items-center border-t border-slate-700/50 pt-4">
                                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                                                <Clock size={12} />
                                                <time
                                                    dateTime={new Date(
                                                        article.createdAt
                                                    ).toLocaleDateString()}
                                                >
                                                    {new Date(
                                                        article.createdAt
                                                    ).toLocaleDateString()}
                                                </time>
                                            </div>
                                            <span
                                                className="flex items-center gap-0.5 text-cyan-400 text-sm font-medium 
                                                group-hover:gap-2 transition-all duration-300"
                                            >
                                                Read more
                                                <ChevronRight
                                                    size={16}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                </div>
            </div>
        </main>
    );
}
