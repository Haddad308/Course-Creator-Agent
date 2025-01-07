import { z } from "zod";

export const courseModulesSchema = z.object({
  modules: z.array(
    z.object({
      name: z.string().describe("The name of the module."),
      lessons: z.array(
        z.object({
          name: z.string().describe("The name of the lesson."),
          sections: z.array(
            z.object({
              title: z.string().describe("The title of the section."),
              content: z
                .string()
                .describe(
                  "Detailed content for the section explaining concepts or actions."
                ),
            })
          ),
        })
      ),
    })
  ),
});
