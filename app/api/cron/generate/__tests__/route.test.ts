import { describe, expect, test, mock } from "bun:test";
import { POST } from "../route";

// Mock environment variables
process.env.GEMINI_API_KEY = "test-key";
process.env.CRON_SECRET = "test-secret-12345-67890-abcdef-ghijklmnop-x"; // 43 chars

// Mock generateArticle
mock.module("@/src/services/gemini", () => ({
    generateArticle: mock(() =>
        Promise.resolve(
            JSON.stringify({
                title: "Test Title",
                summary: "Test Summary",
                content: "Test Content",
            })
        )
    ),
}));

// Mock database operations
mock.module("@/src/db", () => ({
    db: {
        insert: mock(() => ({
            values: mock(() => ({
                returning: mock(() =>
                    Promise.resolve([
                        {
                            id: 1,
                            title: "Test Title",
                            summary: "Test Summary",
                            content: "Test Content",
                            createdAt: new Date(),
                        },
                    ])
                ),
            })),
        })),
    },
}));

describe("POST /api/cron/generate", () => {
    const createRequest = (body: { secret?: string }) =>
        new Request("http://localhost/api/cron/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

    test("should generate article successfully", async () => {
        const request = createRequest({
            secret: process.env.CRON_SECRET ?? "",
        });
        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.article).toBeDefined();
        expect(data.article.id).toBeDefined();
        expect(data.article.title).toBeDefined();
    });

    test("should reject invalid secret", async () => {
        const request = createRequest({ secret: "wrong-secret" });
        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(401);
        expect(data.error).toBe("Invalid secret");
    });

    test("should handle missing secret", async () => {
        const request = createRequest({});
        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe("Secret is required");
    });

    test("should handle invalid JSON", async () => {
        const request = new Request("http://localhost/api/cron/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "invalid-json",
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toContain("Invalid");
    });

    test("should handle article generation failure", async () => {
        // Mock generateArticle to fail
        mock.module("@/src/services/gemini", () => ({
            generateArticle: mock(() =>
                Promise.reject(new Error("Generation failed"))
            ),
        }));

        const request = createRequest({
            secret: "test-secret-12345-67890-abcdef-ghijklmnop-x",
        });
        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toContain("Failed to generate article");
    });

    test("should handle database failure", async () => {
        // Mock db.insert to fail
        mock.module("@/src/db", () => ({
            db: {
                insert: mock(() => {
                    throw new Error("Database error");
                }),
            },
        }));

        const request = createRequest({
            secret: "test-secret-12345-67890-abcdef-ghijklmnop-x",
        });
        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error).toContain("Failed to generate article");
    });
});
