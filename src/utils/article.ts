import { log } from "console";

export function parseArticleContent(text: string) {
    try {
        // First try direct JSON parse
        return JSON.parse(text);
    } catch {
        // If that fails, try to extract from markdown
        const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[1]);
            } catch (e2) {
                log("error", "Failed to parse extracted JSON from markdown", {
                    error: e2 instanceof Error ? e2.message : "Unknown error",
                    extractedContent: jsonMatch[1],
                });
                throw new Error("Invalid article format");
            }
        }
        log("error", "No valid JSON or markdown block found", { text });
        throw new Error("Invalid article format");
    }
}
