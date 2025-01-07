import { courseMetadataSchema } from "@/schemas/courseMetaData";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// POST request for generating a full course
export const maxDuration = 60; // Extended for comprehensive course generation

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic) {
    return new Response(
      JSON.stringify({
        error: "topic are required.",
      }),
      { status: 400 }
    );
  }

  const result = streamObject({
    temperature: 0.8,
    model: google("gemini-1.5-pro"),
    system:
      "You are an expert course creator specializing in detailed educational content. Each lesson must follow a structured format, including key concepts, impacts, strategies, cooperation, individual actions, and a conclusion.",
    schema: courseMetadataSchema,
    messages: [
      {
        role: "user",
        content: `Create a comprehensive online course metadata on "${topic}".`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
