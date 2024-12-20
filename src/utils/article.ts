import { log } from "@/src/utils/logger";

interface Article {
    title: string;
    summary: string;
    content: string;
}

function validateArticle(data: Article | null): data is Article {
    if (!data || typeof data !== "object") {
        log("error", "Invalid article: not an object", { data });
        return false;
    }

    if (typeof data.title !== "string" || !data.title.trim()) {
        log("error", "Invalid article: missing or invalid title", {
            title: data.title,
        });
        return false;
    }

    if (typeof data.summary !== "string" || !data.summary.trim()) {
        log("error", "Invalid article: missing or invalid summary", {
            summary: data.summary,
        });
        return false;
    }

    if (typeof data.content !== "string" || !data.content.trim()) {
        log("error", "Invalid article: missing or invalid content", {
            content: data.content,
        });
        return false;
    }

    return true;
}

export function parseArticleContent(text: string): Article | null {
    try {
        log("debug", "Attempting to parse article content", {
            length: text.length,
        });
        // First try direct JSON parse
        const directParse = JSON.parse(text);
        if (validateArticle(directParse)) {
            return directParse;
        }
        log("error", "Direct parse succeeded but validation failed");
        return null;
    } catch (e1) {
        log("debug", "Direct JSON parse failed, trying markdown extraction", {
            error: e1 instanceof Error ? e1.message : "Unknown error",
        });
        // If that fails, try to extract from markdown
        const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            try {
                const markdownParse = JSON.parse(jsonMatch[1]);
                if (validateArticle(markdownParse)) {
                    return markdownParse;
                }
                log("error", "Markdown parse succeeded but validation failed");
                return null;
            } catch (e2) {
                log("error", "Failed to parse extracted JSON from markdown", {
                    error: e2 instanceof Error ? e2.message : "Unknown error",
                    extractedContent: jsonMatch[1],
                });
                return null;
            }
        }
        log("error", "No valid JSON or markdown block found", {
            textPreview: text.slice(0, 100) + "...",
        });
        return null;
    }
}
