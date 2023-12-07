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
  VideoSchema,
  QuoteSchema,
  TextQuoteSchema,
  TextImageSchema,
} from "@/lib/zod/paragraph";

const CaseElementsSchema = z.discriminatedUnion("type", [
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

export const CaseSchema = z.object({
  type: z.literal("node--case"),
  id: z.string(),
  title: z.string(),
  field_image: ImageShape,
  field_logo: ImageShape,
  field_excerpt: z.string(),
  field_content_elements: z.array(CaseElementsSchema),
  metatag: MetatagsSchema.optional(),
  field_industry: z.array(z.object({
    name: z.string()
  })).optional(),
  field_solution: z.array(z.object({
    name: z.string()
  })).optional(),
  field_technology: z.array(z.object({
    name: z.string()
  })).optional(),
});

// use client as an alternative name for the case in the code
export function validateAndCleanupCase(client: DrupalNode): Case | null {
  try {
    // Validate the top level fields first.
    const topLevelCaseData = CaseSchema.omit({
      field_content_elements: true,
    }).parse(client);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the case contents.
    const validatedParagraphs = client.field_content_elements
      .map((paragraph: any) => {
        const result = CaseElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating case paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelCaseData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, client }, null, 2));
    return null;
  }
}

export type Case = z.infer<typeof CaseSchema>;
