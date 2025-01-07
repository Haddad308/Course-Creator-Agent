import { courseModulesSchema } from "@/schemas/modules";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";

// POST request for generating a full course
export const maxDuration = 60; // Extended for comprehensive course generation

export async function POST(req: Request) {
  const { topic, numberOfModules } = await req.json();

  if (!topic || !numberOfModules) {
    return new Response(
      JSON.stringify({
        error: "Both topic and number of modules are required.",
      }),
      { status: 400 }
    );
  }

  const result = streamObject({
    temperature: 0.8,
    model: google("gemini-1.5-pro"),
    system:
      "You are an expert course creator specializing in detailed educational content. Generate highly informative, engaging, and structured course modules with in-depth lessons and clear educational objectives.",
    schema: courseModulesSchema,
    messages: [
      {
        role: "user",
        content: `Create a comprehensive course on "${topic}" with ${numberOfModules} modules. Each module should consist of multiple lessons. Ensure every lesson follows this structured format: "Introduction" (a brief overview of the topic), "Key Concepts" (detailed explanations of core ideas with examples), "Impacts and Importance" (why the topic matters and its relevance), "Strategies and Actions" (practical strategies and solutions), "Collaboration and Global Impact" (how collective action plays a role in the topic), "Individual Actions" (what individuals can do to contribute), and "Conclusion" (summary and final insights). Provide detailed and educational content for each section, suitable for learners aiming to deeply understand the topic and take actionable steps.`,
      },
    ],
  });

  return result.toTextStreamResponse();
}
