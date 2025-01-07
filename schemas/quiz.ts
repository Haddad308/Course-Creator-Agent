import { z } from "zod";

export const quizSchema = z.object({
  lessonName: z
    .string()
    .describe("The name of the lesson for which the quiz is generated."),
  questions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("A quiz question based on the lesson content."),
        options: z
          .array(z.string())
          .describe("Multiple choice options for the question."),
        correctAnswer: z
          .string()
          .describe("The correct answer for the question."),
        explanation: z
          .string()
          .describe("A brief explanation of the correct answer."),
      })
    )
    .min(3)
    .max(5),
});
