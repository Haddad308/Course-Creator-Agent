import { notificationSchema } from "@/schemas/notifications";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { topic } = await req.json();

  const result = streamObject({
    model: google("gemini-1.5-flash"),
    system: "You are a helpful assistant.",
    schema: notificationSchema,
    messages: [
      {
        role: "user",
        content: `I want to create a course on ${topic}`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
