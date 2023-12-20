import { NextApiRequest, NextApiResponse } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "@/lib/drupal/drupal-client";
import { validateAndCleanupCareersTeaser } from "@/lib/zod/careers-teaser";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const languagePrefix =
      req.headers["accept-language"] || siteConfig.defaultLocale;

    const careersTeasers = await drupal.getResourceCollection<DrupalNode[]>(
      "node--careers",
      {
        params: {
          "filter[status]": 1,
          "filter[langcode]": languagePrefix,
          "fields[node--careers]":
            "title,path,field_image,field_content_elements",
          include: "field_image,field_content_elements",
          sort: "-sticky,-created",
        },
        locale: languagePrefix,
        defaultLocale: siteConfig.defaultLocale,
      },
    );

    const validatedCareersTeasers = careersTeasers
      .map((careersNode) => validateAndCleanupCareersTeaser(careersNode))
      // If any career teaser is invalid, it will be replaced by null in the array, so we need to filter it out:
      .filter((teaser) => {
        return teaser !== null;
      });

    // Set cache headers: 60 seconds max-age, stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.json(validatedCareersTeasers);
  }

  res.end();
}
