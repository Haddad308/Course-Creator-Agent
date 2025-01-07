import { z } from "zod";

export const courseMetadataSchema = z.object({
  courseOverview: z
    .string()
    .describe(
      "A detailed description of the course, explaining its purpose, content, and value."
    ),
  courseOutcomes: z.array(
    z
      .string()
      .describe("Key learning outcomes and skills the student will acquire.")
  ),
  courseRequirements: z.array(
    z
      .string()
      .describe("Prerequisites and knowledge needed to succeed in the course.")
  ),
  audiencePersona: z
    .string()
    .describe("A description of the target audience for the course."),
});
