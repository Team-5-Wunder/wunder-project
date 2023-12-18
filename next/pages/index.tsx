import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import HeroBanner from "@/components/herobanner/heroBanner";
import WeAreWunder from "@/components/we-are-wunder";
import { CaseTeasers } from "@/components/case-teasers";
import OurClients from "@/components/OurClients";
import { LatestReleases } from "@/components/latest-releases";
import { EventTeasers } from "@/components/event-teasers";
import { ExpertTalks } from "@/components/expert-talks";

import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import {
  CaseTeaser,
  validateAndCleanupCaseTeaser,
} from "@/lib/zod/case-teaser";
import {
  EventTeaser,
  validateAndCleanupEventTeaser,
} from "@/lib/zod/event-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";

import LogIn from "./auth/login";
import Register from "./auth/register";
import { Article } from "@/components/article";
import { ContactForm } from "@/components/contact-form";
import { Paragraph } from "@/components/paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";

import { MapComponent } from "@/components/map";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  filteredPromotedArticleTeasers: ArticleTeaser[];
  promotedCaseTeasers: CaseTeaser[];
  promotedEventTeasers: EventTeaser[];
  filteredpromotedEventTeasers: EventTeaser[];
  filteredPromotedExpertTalks: EventTeaser[];
}

export default function IndexPage({
  frontpage,
  filteredPromotedArticleTeasers,
  promotedCaseTeasers,
  promotedEventTeasers,
  filteredpromotedEventTeasers,
  filteredPromotedExpertTalks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <HeroBanner />
      <WeAreWunder />
      <CaseTeasers cases={promotedCaseTeasers} heading={t("our-work")} />
      <OurClients />

      <LatestReleases
        articles={filteredPromotedArticleTeasers}
        heading={t("Latest releases")}
      />
      <EventTeasers events={filteredpromotedEventTeasers} />
      <ExpertTalks events={filteredPromotedExpertTalks} />

      <ContactForm />
    </>
  );
}

// Getting data from Drupal to pass it as props to the IndexPage (frontpage)
export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context,
) => {
  const frontpage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--frontpage",
      context,
      {
        params: getNodePageJsonApiParams("node--frontpage").getQueryObject(),
      },
    )
  ).at(0);

  // Recieving data for CASE TEASERS on the front page
  const promotedCaseTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--case", context, {
    params: getNodePageJsonApiParams("node--case")
      .addPageLimit(4)
      .getQueryObject(),
  });

  // Recieving and filtering data for ARTICLE TEASERS on the front page
  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: getNodePageJsonApiParams("node--article").getQueryObject(),
  });

  const filteredPromotedArticleTeasers = promotedArticleTeasers
    .filter(
      (article) => article.field_tags?.some((tag) => tag.name === "Innovation"),
    )
    .slice(0, 3);

  // Recieving and filtering data for EVENT TEASERS on the front page
  const promotedEventTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getNodePageJsonApiParams("node--event")
      .addSort("field_start_time", "ASC")
      .getQueryObject(),
  });

  const filteredpromotedEventTeasers = promotedEventTeasers
    .filter(
      (event) =>
        !event.field_event_tags?.some((tag) => (tag.name = "Expert Talks")),
    )
    .slice(0, 3);

  // Recieving and filtering data for EXPERT TALKS TEASERS on the front page
  const promotedExpertTalks = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getNodePageJsonApiParams("node--event")
      .addSort("field_start_time", "ASC")
      .getQueryObject(),
  });

  const filteredPromotedExpertTalks = promotedExpertTalks
    .filter(
      (event) =>
        event.field_event_tags?.some((tag) => tag.name === "Expert Talks"),
    )
    .slice(0, 3);

  // Returning the props
  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      filteredPromotedArticleTeasers: filteredPromotedArticleTeasers.map(
        (teaser) => validateAndCleanupArticleTeaser(teaser),
      ),
      promotedCaseTeasers: promotedCaseTeasers.map((teaser) =>
        validateAndCleanupCaseTeaser(teaser),
      ),
      promotedEventTeasers: promotedEventTeasers.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      filteredpromotedEventTeasers: filteredpromotedEventTeasers.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      filteredPromotedExpertTalks: filteredPromotedExpertTalks.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
    },
    revalidate: 60,
  };
};
