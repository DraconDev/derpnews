import { describe, expect, test } from "bun:test";
import { generatePrompt } from "../promptGenerator";

describe("generatePrompt", () => {
    test("should generate valid prompt", () => {
        const prompt = generatePrompt();
        
        // Check that the prompt is a non-empty string
        expect(typeof prompt).toBe("string");
        expect(prompt.length).toBeGreaterThan(0);

        // Check that it contains the required JSON structure
        expect(prompt).toContain('"title":');
        expect(prompt).toContain('"summary":');
        expect(prompt).toContain('"content":');

        // Check that it contains the required instructions
        expect(prompt).toContain("Response must be strictly in this JSON format");
        expect(prompt).toContain("humorous and absurd");
        expect(prompt).toContain("news-like tone");
    });

    test("should generate different prompts", () => {
        const prompt1 = generatePrompt();
        const prompt2 = generatePrompt();
        
        // Check that prompts are different (random generation works)
        expect(prompt1).not.toBe(prompt2);
    });

    test("should include all required elements", () => {
        const prompt = generatePrompt();
        
        // Check for presence of key elements
        const requiredElements = [
            "title",
            "summary",
            "content",
            "JSON format",
            "absurd",
            "news-like",
        ];

        requiredElements.forEach(element => {
            expect(prompt.toLowerCase()).toContain(element.toLowerCase());
        });
    });
});
