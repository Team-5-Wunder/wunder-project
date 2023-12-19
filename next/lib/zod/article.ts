import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";
import {
  AccordionSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  QuoteSchema,
  TextImageSchema,
  TextQuoteSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

const ArticleElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  QuoteSchema,
  TextQuoteSchema,
  TextImageSchema,
]);

export const ArticleSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
    field_user_image: ImageShape.optional().nullable(),
  }),
  title: z.string(),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  metatag: MetatagsSchema.optional(),
  field_tags: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
  field_content_elements: z.array(ArticleElementsSchema).optional().nullable(),
});

export function validateAndCleanupArticle(article: DrupalNode): Article | null {
  try {
    return ArticleSchema.parse(article);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, article }, null, 2));
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;
