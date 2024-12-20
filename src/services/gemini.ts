import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "@/src/utils/logger";
import { generatePrompt } from "./promptGenerator";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateArticle() {
    log("info", "Starting article generation");

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
        });
        log("debug", "Initialized Gemini model");

        const prompt = generatePrompt();
        log("debug", "Generated prompt", { prompt });

        const result = await model.generateContent(prompt);

        if (!result || !result.response) {
            log("error", "Empty response from Gemini");
            throw new Error("Empty response from Gemini API");
        }

        const response = result.response;
        const text = response.text();

        if (!text) {
            log("error", "Empty text in Gemini response");
            throw new Error("Empty text in Gemini response");
        }

        log("debug", "Received response from Gemini", { response: text });

        return text;
    } catch (error) {
        log("error", "Error generating article", {
            error: error instanceof Error ? error.message : "Unknown error",
        });
        throw error;
    }
}
