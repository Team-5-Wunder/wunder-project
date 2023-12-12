import { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { JsonApiResponse } from "next-drupal";
import siteConfig from "@/site.config";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse,
) {
    try {
        if (req.method === "POST") {
            const body = JSON.parse(req.body);
            const apiParams = getNodePageJsonApiParams("node--article");

            
            if (body.tags.length > 0) {
                body.tags.forEach((tag) => {
                    apiParams.addGroup(tag, "AND", "parent_group")
                })
                apiParams.addGroup("parent_group", "AND")
                body.tags.forEach((tag) => {
                    apiParams.addFilter("field_tags.name", tag, "CONTAINS", tag)
                })
                console.log("adding filter");
                
            }


            const result = await drupal.getResourceCollection<JsonApiResponse>(
                "node--article",
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
            console.log("Result: " + result);
            
            return res.status(200).json(result)
        }
    } catch (error) {
        return res.status(400).json(error.message);
    };
};