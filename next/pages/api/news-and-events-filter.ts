import { NextApiRequest, NextApiResponse } from "next";
import { JsonApiResponse } from "next-drupal";

import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

import siteConfig from "@/site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const body = JSON.parse(req.body);
      const apiParams = getNodePageJsonApiParams("node--event");

      if (body.tags.length > 0) {
        body.tags.forEach((tag) => {
          apiParams.addGroup(tag, "AND", "parent_group");
        });
        apiParams.addGroup("parent_group", "AND");
        body.tags.forEach((tag) => {
          apiParams.addFilter("field_event_tags.name", tag, "CONTAINS", tag);
        });
      }

      const result = await drupal.getResourceCollection<JsonApiResponse>(
        "node--event",
        {
          deserialize: false,
          params: {
            ...apiParams.getQueryObject(),
            "filter[langcode]": body.locale,
            "filter[status]": "1",
            page: {
              limit: body.limit,
              offset: body.offset,
            },
            sort: "-sticky,-changed",
          },
          locale: body.locale,
          defaultLocale: siteConfig.defaultLocale,
        },
      );

      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
