import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { CareersSchema } from "@/lib/zod/careers";

export const CareersTeaserSchema = CareersSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupCareersTeaser(
  careersTeaser: DrupalNode,
): CareersTeaser | null {
  try {
    return CareersTeaserSchema.parse(careersTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, careersTeaser }, null, 2));
    return null;
  }
}

export type CareersTeaser = z.infer<typeof CareersTeaserSchema>;
