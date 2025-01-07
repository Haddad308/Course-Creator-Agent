import { z } from "zod";

// Define a schema for course topics
export const topics = z.object({
  topics: z.array(
    z.object({
      name: z.string().describe("Name of a course topic."),
    })
  ),
});
