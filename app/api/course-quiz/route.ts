import { quizSchema } from "@/schemas/quiz";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// POST request for generating quizzes based on the lesson name
export const maxDuration = 30;

export async function POST(req: Request) {
  const { lessonName } = await req.json();

  if (!lessonName) {
    return new Response(JSON.stringify({ error: "Lesson name is required." }), {
      status: 400,
    });
  }

  const result = streamObject({
    temperature: 0.8,
    model: google("gemini-1.5-pro"),
    system:
      "You are an expert quiz creator. Generate 3-5 multiple-choice quiz questions with correct answers and explanations based on the provided lesson name.",
    schema: quizSchema,
    messages: [
      {
        role: "user",
        content: `Create a quiz for the lesson "${lessonName}" with 3-5 multiple-choice questions. Provide options, a correct answer, and a brief explanation for each.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
