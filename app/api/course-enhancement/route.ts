import { courseModulesSchema } from "@/schemas/modules";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const file = formData.get("file");

  const allowedExtensions = [".txt"];
  const fileExtension = path.extname((file as File).name).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    return NextResponse.json(
      { error: "Invalid file type. Only .txt are allowed." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const fileContent = await (file as File).text();

  try {
    const result = streamObject({
      temperature: 0.8,
      model: google("gemini-1.5-pro-001"),
      system:
        "You are an expert course creator specializing in detailed educational content. Generate highly informative, engaging, and structured course modules with in-depth lessons and clear educational objectives.",
      schema: courseModulesSchema,
      messages: [
        {
          role: "user",
          content: `Enhance the course based on this conent: ${fileContent} with just 2 modules. Each module should consist of multiple lessons. Ensure every lesson follows this structured format: "Introduction" (a brief overview of the topic), "Key Concepts" (detailed explanations of core ideas with examples), "Impacts and Importance" (why the topic matters and its relevance), "Strategies and Actions" (practical strategies and solutions), "Collaboration and Global Impact" (how collective action plays a role in the topic), "Individual Actions" (what individuals can do to contribute), and "Conclusion" (summary and final insights). Provide detailed and educational content for each section, suitable for learners aiming to deeply understand the topic and take actionable steps.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
