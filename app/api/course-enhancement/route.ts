import { courseModulesSchema } from "@/schemas/modules";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Validate file type and ensure a file is provided
    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const allowedExtensions = [".txt"];
    const fileExtension = path.extname((file as File).name).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Invalid file type. Only .txt files are allowed." },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await (file as File).text();

    // Make the API request to enhance the course
    const result = streamObject({
      temperature: 0.8,
      model: google("gemini-1.5-pro"),
      system:
        "You are an expert course creator specializing in detailed educational content. Generate highly informative, engaging, and structured course modules with in-depth lessons and clear educational objectives.",
      schema: courseModulesSchema,
      messages: [
        {
          role: "user",
          content: `Enhance the course based on this content: ${fileContent}. Generate two comprehensive modules, each containing multiple lessons. Ensure that every lesson adheres to the following structured format: "Introduction" (a brief overview of the topic), "Key Concepts" (detailed explanations of core ideas with examples), "Impacts and Importance" (why the topic matters and its relevance), "Strategies and Actions" (practical strategies and solutions), "Collaboration and Global Impact" (how collective action plays a role in the topic), "Individual Actions" (what individuals can do to contribute), and "Conclusion" (summary and final insights). Ensure the content is detailed, educational, and suitable for learners who seek a deep understanding and actionable knowledge on the subject.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
};
