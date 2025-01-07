import { marketingEmailSchema } from "@/schemas/email";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Expecting the course title in the request body
  const { courseTitle } = await req.json();
  console.log("Course title:", courseTitle);

  const result = streamObject({
    temperature: 0.8,
    model: google("gemini-1.5-flash"),
    system:
      "You are a professional email marketer. Create a compelling email to market the course based on the course title provided. The email should include an introduction to the course, key benefits, and a strong call-to-action to encourage potential customers to enroll in the course.",
    schema: marketingEmailSchema,
    messages: [
      {
        role: "user",
        content: `Generate a marketing email for the course titled "${courseTitle}". Include a brief introduction, key benefits of the course, and a call-to-action that encourages readers to enroll.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
