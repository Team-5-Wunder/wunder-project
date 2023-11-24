import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { EventSchema } from "@/lib/zod/event";

export const EventTeaserSchema = EventSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupEventTeaser(
  eventTeaser: DrupalNode,
): EventTeaser | null {
  try {
    return EventTeaserSchema.parse(eventTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, eventTeaser }, null, 2));
    return null;
  }
}

export type EventTeaser = z.infer<typeof EventTeaserSchema>;
