import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "@/src/utils/logger";
import { generatePrompt } from "./promptGenerator";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateArticle() {
    log("info", "Starting article generation");

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
        });
        log("debug", "Initialized Gemini model");

        const prompt = generatePrompt();
        log("debug", "Generated prompt", { prompt });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        log("debug", "Received response from Gemini", { response: text });
        
        return text;
    } catch (error) {
        log("error", "Error generating article", {
            error: error instanceof Error ? error.message : "Unknown error",
        });
        throw error;
    }
}
