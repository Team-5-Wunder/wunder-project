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
import { ArticleTeaser, validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import { CaseTeaser, validateAndCleanupCaseTeaser } from "@/lib/zod/case-teaser";
import { EventTeaser, validateAndCleanupEventTeaser } from "@/lib/zod/event-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";

import LogIn from "./auth/login";
import Register from "./auth/register";
import { Article } from "@/components/article";
import { ContactForm } from "@/components/contact-form";
import { Paragraph } from "@/components/paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  promotedArticleTeasers: ArticleTeaser[];
  promotedCaseTeasers: CaseTeaser[];
  promotedEventTeasers: EventTeaser[];
  promotedExpertTalks: EventTeaser[];
}

export default function IndexPage({
  frontpage,
  promotedArticleTeasers,
  promotedCaseTeasers,
  promotedEventTeasers,
  promotedExpertTalks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  

  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <HeroBanner />
      <WeAreWunder />
      <CaseTeasers cases={promotedCaseTeasers} heading={t("our-work")} />
      <OurClients />
      <LatestReleases articles={promotedArticleTeasers} heading={t("Latest releases")}/>
      <EventTeasers events={promotedEventTeasers}/>
      <ExpertTalks events={promotedExpertTalks}/>
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

  // Recieving and filtering data for ARTICLE TEASERS on the front page
  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: getNodePageJsonApiParams("node--article")
      .addGroup("Innovation", "AND", "parent_group")
      .addGroup("parent_group", "AND")
      .addFilter("field_tags.name", "Innovation", "CONTAINS", "Innovation")
      .addPageLimit(3)
      .getQueryObject(),
  });
  
  // Recieving data for CASE TEASERS on the front page
  const promotedCaseTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--case", context, {
    params: getNodePageJsonApiParams("node--case")
      .addPageLimit(4)
      .getQueryObject(),
  });

  // Recieving and filtering data for EVENT TEASERS on the front page
  const promotedEventTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getNodePageJsonApiParams("node--event")
      .addGroup("Event", "AND", "parent_group")
      .addGroup("parent_group", "AND")
      .addFilter("field_event_tags.name", "Event", "CONTAINS", "Event")
      .addPageLimit(3)
      .getQueryObject(),
  });

  // Recieving and filtering data for EXPERT TALKS TEASERS on the front page
  const promotedExpertTalks = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getNodePageJsonApiParams("node--event")
      .addGroup("Expert", "AND", "parent_group")
      .addGroup("parent_group", "AND")
      .addFilter("field_event_tags.name", "Expert", "CONTAINS", "Expert")
      .addPageLimit(3)
      .getQueryObject(),
  });
  
  // Returning the props
  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      promotedArticleTeasers: promotedArticleTeasers.map(
        (teaser) => validateAndCleanupArticleTeaser(teaser),
      ),
      promotedCaseTeasers: promotedCaseTeasers.map((teaser) =>
        validateAndCleanupCaseTeaser(teaser),
      ),
      promotedEventTeasers: promotedEventTeasers.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
      promotedExpertTalks: promotedExpertTalks.map((teaser) => 
        validateAndCleanupEventTeaser(teaser),
      ),
    },
    revalidate: 60,
  };
};
