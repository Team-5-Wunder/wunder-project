import { NextApiRequest, NextApiResponse } from "next";
import { drupal } from "@/lib/drupal/drupal-client";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const languagePrefix = request.headers["accept-language"];
  try {
    if (request.method === "POST") {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`);

      // Submit to Drupal.
      const body = JSON.parse(request.body);

      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: "footer_newsletter",
          ...body,
          /* withAuth: true, */
          /*   email: request.body.email,
          news: request.body.news,
          careers: request.body.careers,
          events: request.body.events,
          terms: request.body.terms, */
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(result);

      if (!result.ok) {
        throw new Error();
      }

      response.status(200).end();
    }
  } catch (error) {
    return response.status(400).json(error.message);
  }
}
