import { z } from "zod";

export const marketingEmailSchema = z.object({
  subject: z.string().describe("The subject line of the marketing email."),
  body: z
    .string()
    .describe(
      "The body of the marketing email, including an introduction, course benefits, and call-to-action."
    ),
});
