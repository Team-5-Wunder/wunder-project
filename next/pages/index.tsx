import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Article } from "@/components/article";
import { CaseTeasers } from "@/components/case-teasers";
import { ContactForm } from "@/components/contact-form";
import { EventTeasers } from "@/components/event-teasers";
import { ExpertTalks } from "@/components/expert-talks";
import HeroBanner from "@/components/herobanner/heroBanner";
import { LatestReleases } from "@/components/latest-releases";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import OurClients from "@/components/OurClients";
import { Paragraph } from "@/components/paragraph";
import WeAreWunder from "@/components/we-are-wunder";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
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

import { Divider } from "@/ui/divider";

import { MapComponent } from "@/components/map";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import React, { useMemo } from "react";

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

  /* const libraries: Libraries = ["places"]; */

  /*   const options = useMemo(() => loaderOptions, []); */

  /*  const { isLoaded, loadError } = useJsApiLoader({
    version: "weekly",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  }); */

  /*   if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;
 */
  const locations = [
    {
      name: "Helsinki",
      address: "Kalevankatu 30, 00100 Helsinki",
      latitude: undefined,
      longitude: undefined,
    },
    {
      name: "Turku",
      address: "Aurakatu 8, 20100 Turku",
    },
    {
      name: "Tallinn Estonia",
      address: "Valukoja 8, 11415 Tallinn Estonia",
    },
    {
      name: "Latvia",
      address: "L.Paegles iela 47, Valmiera, LV-4201 Latvia",
    },
    {
      name: "Latvia",
      address: "Z.A. Meierovica bulvāris 16, Riga, LV-1050 Latvia",
    },
  ];
  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <HeroBanner />
      <WeAreWunder />
      <CaseTeasers cases={promotedCaseTeasers} heading={t("our-work")} />
      <OurClients />
      {/*     <StaticMapComponent /> */}

      {/* <div className="grid gap-4 grid-cols-4">
        {promotedCaseTeasers.map((teaser) => (
          <Link
          href={teaser.path.alias}
          className="hover:grayscale"
          >
            <Image
              src={absoluteUrl(teaser.field_logo.uri.url)}
              width={150}
              height={75}
              style={{ width: 150, height: 75 }}
              alt={teaser.field_logo.resourceIdObjMeta.alt}
            />
          </Link>
        ))}
      </div> */}
      <LatestReleases
        articles={filteredPromotedArticleTeasers}
        heading={t("Latest releases")}
      />
      <ExpertTalks />
      <div>
        <h1>Map Page</h1>
        <MapComponent />
      </div>
      {/* <div className="grid gap-4">
          {frontpage?.field_content_elements?.map((paragraph) => (
            <Paragraph paragraph={paragraph} key={paragraph.id} />
          ))}
        </div> */}
      {/* <Divider className="max-w-4xl" /> */}

      {/*      <EventTeasers
        events={promotedEventTeasers}
        heading={t("coming-events")}
      /> */}
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
  });

  const filteredPromotedArticleTeasers = promotedArticleTeasers
    .filter(
      (article) => article.field_tags?.some((tag) => tag.name === "Innovation"),
    )
    .slice(0, 3);

  const promotedCaseTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--case", context, {
    params: getNodePageJsonApiParams("node--case")
      .addPageLimit(4)
      .getQueryObject(),
  });

  /* promotedCaseTeasers.map((teaser) => {
    console.log(teaser.path);
  }) */

  const promotedEventTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--event", context, {
    params: getNodePageJsonApiParams("node--event")
      .addPageLimit(3)
      .addSort("field_date", "ASC")
      .getQueryObject(),
  });

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
    },
    revalidate: 60,
  };
};
