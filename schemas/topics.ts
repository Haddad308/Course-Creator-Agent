import { z } from "zod";

// define a schema for the notifications
export const topics = z.object({
  topics: z.array(
    z.object({
      name: z.string().describe("Name of a course topic."),
    })
  ),
});
