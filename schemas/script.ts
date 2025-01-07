import { z } from "zod";

export const lessonScriptSchema = z.object({
  script: z
    .string()
    .describe(
      "A cinematic video script for an educational course, with visuals and voiceover narration that align with the lesson's key points."
    ),
  scenes: z
    .array(
      z.object({
        scene: z
          .string()
          .describe(
            "Detailed description of the educational scene, including visual elements that support the lesson."
          ),
        voiceover: z
          .string()
          .describe(
            "Voiceover narration that explains key concepts or reinforces the lesson in each scene."
          ),
      })
    )
    .describe(
      "Array of educational scenes with corresponding voiceover narration."
    ),
});
