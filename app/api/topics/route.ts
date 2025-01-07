import { topics } from "@/schemas/topics";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function GET() {
  const result = streamObject({
    temperature: 0.9,
    model: google("gemini-1.5-flash"),
    system:
      "You are a knowledgeable course creator. Your goal is to suggest impactful course topics relevant to current market trends, focusing on popularity and demand.",
    schema: topics,
    messages: [
      {
        role: "user",
        content: `Please suggest six course topics with a focus on diverse fields, including technology, health, business, and humanities.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
