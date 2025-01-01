import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { topic } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: "You are a helpful assistant.",
    messages: [
      {
        role: "user",
        content: `I want to create a course on ${topic}`,
      },
    ],
  });

  return result.toDataStreamResponse();
}
