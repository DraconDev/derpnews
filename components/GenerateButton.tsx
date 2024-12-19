"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function GenerateButton() {
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    const generateArticle = async () => {
        try {
            setIsGenerating(true);
            const response = await fetch("/api/articles", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to generate article");
            }

            router.refresh();
        } catch (error) {
            console.error("Error generating article:", error);
            alert("Failed to generate article. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={generateArticle}
            disabled={isGenerating}
            type="submit"
            className="relative group bg-slate-800 text-white font-semibold px-6 py-3 rounded-md
                border-2 border-cyan-500/20 hover:border-cyan-400/40
                transition-all duration-300
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-600 before:to-blue-600
                before:opacity-0 hover:before:opacity-100 before:transition-opacity
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:before:opacity-0
                hover:shadow-lg hover:shadow-cyan-500/20
                active:scale-[0.98]"
        >
            <span className="relative flex items-center justify-center gap-2">
                {isGenerating ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Generating...</span>
                    </>
                ) : (
                    "Generate New Article"
                )}
            </span>
            <span
                className="absolute inset-0 border-2 border-cyan-400/0 rounded-md
                group-hover:border-cyan-400/20 transition-all duration-300"
            ></span>
        </button>
    );
}
