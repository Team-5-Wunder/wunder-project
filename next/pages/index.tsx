import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { LatestReleases } from "@/components/latest-releases";
import { CaseTeasers } from "@/components/case-teasers";
import { EventTeasers } from "@/components/event-teasers";
import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
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

import { Divider } from "@/ui/divider";
import HeroBanner from "@/components/herobanner/heroBanner";
import { Article } from "@/components/article";
import OurClients from "@/components/OurClients";
import WeAreWunder from "@/components/we-are-wunder";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  filteredPromotedArticleTeasers: ArticleTeaser[];
  promotedCaseTeasers: CaseTeaser[];
  promotedEventTeasers: EventTeaser[];
}

export default function IndexPage({
  frontpage,
  filteredPromotedArticleTeasers,
  promotedCaseTeasers,
  promotedEventTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <HeroBanner />
      <WeAreWunder />
      <CaseTeasers cases={promotedCaseTeasers} heading={t("our-work")} />
      <OurClients />
      
        {/* <div className="grid gap-4">
          {frontpage?.field_content_elements?.map((paragraph) => (
            <Paragraph paragraph={paragraph} key={paragraph.id} />
          ))}
        </div> */}
        {/* <Divider className="max-w-4xl" /> */}
        {/* <ContactForm />  */}
        {/* <Divider className="max-w-4xl" /> */}

      <LatestReleases
        articles={filteredPromotedArticleTeasers}
        heading={t("latest-releases-and-innovations")}
      />
        {/*      <EventTeasers
        events={promotedEventTeasers}
        heading={t("coming-events")}
      /> */}
        {/*   <ContactList /> */}
        {/*     <LogoStrip /> */}
    </>
  );
}

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

  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: getNodePageJsonApiParams("node--article").getQueryObject(),
  })

  const filteredPromotedArticleTeasers = promotedArticleTeasers
    .filter((article) =>
    article.field_tags?.some((tag) => tag.name === "Innovation")
    )
    .slice(0, 3)

  const promotedCaseTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--case", context, {
    params: getNodePageJsonApiParams("node--case").addPageLimit(4).getQueryObject(),
  });

  const promotedEventTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getNodePageJsonApiParams("node--event").addPageLimit(3).addSort("field_date", "ASC").getQueryObject(),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      filteredPromotedArticleTeasers: filteredPromotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
      promotedCaseTeasers: promotedCaseTeasers.map((teaser) =>
        validateAndCleanupCaseTeaser(teaser),
      ),
      promotedEventTeasers: promotedEventTeasers.map((teaser) =>
        validateAndCleanupEventTeaser(teaser),
      ),
    },
    revalidate: 60,
  };
};
