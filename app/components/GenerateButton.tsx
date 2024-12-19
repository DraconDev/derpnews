"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Generatebutton() {
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isGenerating ? "Generating..." : "Generate New Article"}
        </button>
    );
}
