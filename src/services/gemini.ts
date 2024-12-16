import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "@/src/utils/logger";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateArticle() {
    log("info", "Starting article generation");

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
        });
        log("debug", "Initialized Gemini model");

        const prompt = `Write a satirical news article in the style of The Onion. 
            The article should be humorous and absurd while maintaining a news-like tone. 
            Include a catchy headline and a brief summary. 
            Format the response as JSON with the following structure:
            {
              "title": "The headline",
              "summary": "A brief 1-2 sentence summary",
              "content": "The full article content"
            }`;

        log("debug", "Sending prompt to Gemini");
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
