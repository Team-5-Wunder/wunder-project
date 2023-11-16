import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { CaseSchema } from "@/lib/zod/case";

export const CaseTeaserSchema = CaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupCaseTeaser(
  caseTeaser: DrupalNode,
): CaseTeaser | null {
  try {
    return CaseTeaserSchema.parse(caseTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, caseTeaser }, null, 2));
    return null;
  }
}

export type CaseTeaser = z.infer<typeof CaseTeaserSchema>;
