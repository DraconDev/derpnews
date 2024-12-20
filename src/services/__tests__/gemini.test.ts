// import { describe, expect, test, mock } from "bun:test";
// import { generateArticle } from "../gemini";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Mock environment variable
// process.env.GEMINI_API_KEY = "test-key";

// describe("generateArticle", () => {
//     test("should generate article successfully", async () => {
//         const mockArticle = {
//             title: "Test Title",
//             summary: "Test Summary",
//             content: "Test Content",
//         };

//         // Mock the Gemini API response
//         const mockGenerateContent = mock(() =>
//             Promise.resolve({
//                 response: {
//                     text: () => JSON.stringify(mockArticle),
//                 },
//             })
//         );

//         // Create a properly typed mock of GenerativeModel
//         const mockModel = {
//             generateContent: mockGenerateContent,
//             apiKey: "test-key",
//             _requestOptions: {},
//             model: "gemini-2.0-flash-exp",
//             generationConfig: {},
//             countTokens: mock(() => Promise.resolve({ totalTokens: 0 })),
//             startChat: mock(() => ({})),
//             sendMessage: mock(() => Promise.resolve({})),
//             sendMessageStream: mock(() => Promise.resolve({})),
//         };

//         const mockGetModel = mock(() => mockModel);

//         GoogleGenerativeAI.prototype.getGenerativeModel = mockGetModel;

//         const result = await generateArticle();
//         expect(JSON.parse(result)).toEqual(mockArticle);
//         expect(mockGenerateContent).toHaveBeenCalled();
//     });

//     test("should handle empty response", async () => {
//         // Mock empty response
//         const mockGenerateContent = mock(() =>
//             Promise.resolve({
//                 response: null,
//             })
//         );

//         // Create a properly typed mock of GenerativeModel
//         const mockModel = {
//             generateContent: mockGenerateContent,
//             apiKey: "test-key",
//             _requestOptions: {},
//             model: "gemini-2.0-flash-exp",
//             generationConfig: {},
//             countTokens: mock(() => Promise.resolve({ totalTokens: 0 })),
//             startChat: mock(() => ({})),
//             sendMessage: mock(() => Promise.resolve({})),
//             sendMessageStream: mock(() => Promise.resolve({})),
//         };

//         const mockGetModel = mock(() => mockModel);

//         // @ts-ignore - we're mocking the prototype
//         GoogleGenerativeAI.prototype.getGenerativeModel = mockGetModel;

//         await expect(generateArticle()).rejects.toThrow(
//             "Empty response from Gemini API"
//         );
//     });

//     test("should handle API errors", async () => {
//         // Mock API error
//         const mockGenerateContent = mock(() =>
//             Promise.reject(new Error("API Error"))
//         );

//         // Create a properly typed mock of GenerativeModel
//         const mockModel = {
//             generateContent: mockGenerateContent,
//             apiKey: "test-key",
//             _requestOptions: {},
//             model: "gemini-2.0-flash-exp",
//             generationConfig: {},
//             countTokens: mock(() => Promise.resolve({ totalTokens: 0 })),
//             startChat: mock(() => ({})),
//             sendMessage: mock(() => Promise.resolve({})),
//             sendMessageStream: mock(() => Promise.resolve({})),
//         };

//         const mockGetModel = mock(() => mockModel);

//         // @ts-ignore - we're mocking the prototype
//         GoogleGenerativeAI.prototype.getGenerativeModel = mockGetModel;

//         await expect(generateArticle()).rejects.toThrow("API Error");
//     });
// });
