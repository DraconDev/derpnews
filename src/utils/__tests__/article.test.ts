import { describe, expect, test } from "bun:test";
import { parseArticleContent } from "../article";

describe("parseArticleContent", () => {
    test("should parse valid JSON article", () => {
        const validArticle = {
            title: "Test Title",
            summary: "Test Summary",
            content: "Test Content",
        };

        const result = parseArticleContent(JSON.stringify(validArticle));
        expect(result).toEqual(validArticle);
    });

    test("should parse valid JSON article from markdown", () => {
        const validArticle = {
            title: "Test Title",
            summary: "Test Summary",
            content: "Test Content",
        };

        const markdown = `Some text before
\`\`\`json
${JSON.stringify(validArticle, null, 2)}
\`\`\`
Some text after`;

        const result = parseArticleContent(markdown);
        expect(result).toEqual(validArticle);
    });

    test("should return null for invalid JSON", () => {
        const result = parseArticleContent("invalid json");
        expect(result).toBeNull();
    });

    test("should return null for missing required fields", () => {
        const invalidArticle = {
            title: "Test Title",
            // missing summary and content
        };

        const result = parseArticleContent(JSON.stringify(invalidArticle));
        expect(result).toBeNull();
    });

    test("should return null for empty fields", () => {
        const invalidArticle = {
            title: "",
            summary: "Test Summary",
            content: "Test Content",
        };

        const result = parseArticleContent(JSON.stringify(invalidArticle));
        expect(result).toBeNull();
    });

    test("should return null for non-string fields", () => {
        const invalidArticle = {
            title: 123,
            summary: "Test Summary",
            content: "Test Content",
        };

        const result = parseArticleContent(JSON.stringify(invalidArticle));
        expect(result).toBeNull();
    });
});
