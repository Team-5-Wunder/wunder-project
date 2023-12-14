import { deserialize, DrupalNode, JsonApiResponse } from "next-drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

import siteConfig from "@/site.config";

type GetCasesArgs = {
  locale?: string;
};

export const getCases = async (
  { locale = siteConfig.defaultLocale }: GetCasesArgs,
  apiParams: DrupalJsonApiParams,
): Promise<{
  nodes: DrupalNode[];
}> => {
  let nodes: DrupalNode[] = [];
  try {
    const result = await drupal.getResourceCollection<JsonApiResponse>(
      "node--case",
      {
        deserialize: false,
        params: {
          ...apiParams.getQueryObject(),
          "filter[langcode]": locale,
          "filter[status]": "1",
          sort: "-sticky,-created",
        },
        locale: locale,
        defaultLocale: siteConfig.defaultLocale,
      },
    );
    if (result.data) {
      nodes = deserialize(result) as DrupalNode[];
    }
  } catch (error) {
    console.error(error);
  }

  return {
    nodes,
  };
};

export const getLatestCasesItems = async (
  args: GetCasesArgs,
): Promise<{
  cases: DrupalNode[];
}> => {
  const apiParams = getNodePageJsonApiParams("node--case");
  const { nodes } = await getCases(args, apiParams);

  return {
    cases: nodes,
  };
};
