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
      const apiParams = getNodePageJsonApiParams("node--case");

      if (body.industry.length > 0) {
        body.industry.forEach((tag) => {
          apiParams.addGroup(tag, "AND", "parent_group_industry");
        });
        apiParams.addGroup("parent_group_industry", "AND");
        body.industry.forEach((tag) => {
          apiParams.addFilter("field_industry.name", tag, "CONTAINS", tag);
        });
      }

      if (body.solution.length > 0) {
        body.solution.forEach((tag) => {
          apiParams.addGroup(tag, "AND", "parent_group_solution");
        });
        apiParams.addGroup("parent_group_solution", "AND");
        body.solution.forEach((tag) => {
          apiParams.addFilter("field_solution.name", tag, "CONTAINS", tag);
        });
      }

      if (body.technology.length > 0) {
        body.technology.forEach((tag) => {
          apiParams.addGroup(tag, "AND", "parent_group_technology");
        });
        apiParams.addGroup("parent_group_technology", "AND");
        body.technology.forEach((tag) => {
          apiParams.addFilter("field_technology.name", tag, "CONTAINS", tag);
        });
      }

      const result = await drupal.getResourceCollection<JsonApiResponse>(
        "node--case",
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
            sort: "-sticky,-created",
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
