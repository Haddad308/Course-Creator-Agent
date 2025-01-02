import { topics } from "@/schemas/topics";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function GET() {
  const result = streamObject({
    temperature: 0.9, // Adjusts randomness in responses
    model: google("gemini-1.5-flash"),
    system:
      "You are a knowledgeable course creator. Your goal is to guide users in discovering the most popular and impactful courses worldwide.",
    schema: topics,
    messages: [
      {
        role: "user",
        content: `Please suggest six course topics inspired by the most popular and in-demand courses globally. Focus on areas with broad appeal and relevance in today's market.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
