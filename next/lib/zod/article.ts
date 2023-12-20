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
  ListingCareersSchema,
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
  ListingCareersSchema,
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
    // Validate the top level fields first.
    const topLevelArticleData = ArticleSchema.omit({
      field_content_elements: true,
    }).parse(article);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the article contents.
    const validatedParagraphs = article.field_content_elements
      .map((paragraph: any) => {
        const result = ArticleElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating article paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelArticleData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, article }, null, 2));
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;
