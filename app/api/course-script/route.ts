import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { lessonScriptSchema } from "@/schemas/script";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { lessonName } = await req.json(); // Expecting the lesson name in the request body

  const result = streamObject({
    temperature: 0.8,
    model: google("gemini-1.5-flash"),
    system:
      "You are a professional scriptwriter for educational videos. Create a cinematic video script for an educational course based on the lesson name provided, including educational scene descriptions and corresponding voiceover narration that supports the learning objectives of the lesson.",
    schema: lessonScriptSchema,
    messages: [
      {
        role: "user",
        content: `Generate a cinematic educational video script for the lesson titled "${lessonName}". Include at least five scenes that describe key educational concepts with detailed visual elements and voiceover narration to help reinforce the learning objectives of the lesson.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
