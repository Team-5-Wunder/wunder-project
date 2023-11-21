import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";

import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getLatestCasesItems } from "@/lib/drupal/get-cases";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  CaseTeaser as CaseTeaserType,
  validateAndCleanupCaseTeaser,
} from "@/lib/zod/case-teaser";
import { CaseTeaser } from "@/components/case-teaser";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalTaxonomyTerm } from "next-drupal";

import { Checkbox } from "@/ui/checkbox";
import { text } from "stream/consumers";

interface CasesPageProps extends LayoutProps {
  caseTeasers: CaseTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
  industry: DrupalTaxonomyTerm[],
  solution: DrupalTaxonomyTerm[],
  technology: DrupalTaxonomyTerm[],
}

export default function CasesPage({
  caseTeasers = [],
  paginationProps,
  industry,
  solution,
  technology,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  const [industrySearch, setIndustrySearch] = useState<string[]>([]);
  const [solutionSearch, setsSolutionSearch] = useState<string[]>([]);
  const [technologySearch, setTechnologySearch] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, type: string) => {
    switch (type) {
      case 'industry':
        if (industrySearch.includes(value)) {
          setIndustrySearch(industrySearch.filter((tag) => tag !== value));
        } else {
          setIndustrySearch([...industrySearch, value]);
        }
        break;
      case 'solution':
        if (solutionSearch.includes(value)) {
          setsSolutionSearch(solutionSearch.filter((tag) => tag !== value));
        } else {
          setsSolutionSearch([...solutionSearch, value]);
        }
        break;
      case 'technology':
        if (technologySearch.includes(value)) {
          setTechnologySearch(technologySearch.filter((tag) => tag !== value));
        } else {
          setTechnologySearch([...technologySearch, value]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Meta title={t("cases")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("cases")}</HeadingPage>
      <div className="mb-16 flex justify-between text-sm text-steelgray">
        <ul>
          <h2 className="text-xl">Industry</h2>
          {industry.map((tag) => (
            <li
            key={tag.id}
            className="flex items-center text-sm text-steelgray">
              <Checkbox
                onClick={() => handleCheckboxChange(tag.name, 'industry')}
                id={tag.id}
              />
              <label className="ml-2 text-sm" htmlFor={tag.id} id={tag.id}>
                {tag.name}
              </label>
            </li>
          ))}
        </ul>
        <ul>
          <h2 className="text-xl">Solution</h2>
          {solution.map((tag) => (
            <li
            key={tag.id}
            className="flex items-center text-sm text-steelgray">
              <Checkbox
                onClick={() => handleCheckboxChange(tag.name, 'solution')}
                id={tag.id}
              />
              <label className="ml-2 text-sm" htmlFor={tag.id} id={tag.id}>
                {tag.name}
              </label>
            </li>
          ))}
        </ul>
        <ul>
          <h2 className="text-xl">Technology</h2>
          {technology.map((tag) => (
            <li
            key={tag.id}
            className="flex items-center text-sm text-steelgray">
              <Checkbox
                onClick={() => handleCheckboxChange(tag.name, 'technology')}
                id={tag.id}
              />
              <label className="ml-2 text-sm" htmlFor={tag.id} id={tag.id}>
                {tag.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-4 grid gap-4 grid-cols-3">
        {caseTeasers
          ?.filter((teaser) => (
            industrySearch.every((industry) => (
              teaser.field_industry.some((tag) => tag.name === industry)
            )) &&
            solutionSearch.every((solution) => (
              teaser.field_solution.some((tag) => tag.name === solution)
            )) &&
            technologySearch.every((technology) => (
              teaser.field_technology.some((tag) => tag.name === technology)
            ))
          ))
          .map((client) => (
          <li key={client.id}>
            <CaseTeaser client={client} />
          </li>
        ))}
      </ul>
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: ["1"] },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<CasesPageProps> = async (
  context,
) => {
  // Get the page parameter:
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, cases } = await getLatestCasesItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/cases";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);


  // fetch all taxonomies needed for filtering cases
  const industry = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>('taxonomy_term--industry', context, {})
  const solution = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>('taxonomy_term--solution', context, {})
  const technology = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>('taxonomy_term--technology', context, {})

  return {
    props: {
      ...(await getCommonPageProps(context)),
      caseTeasers: cases.map((teaser) =>
        validateAndCleanupCaseTeaser(teaser),
      ),
      paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      },
      languageLinks,
      industry: industry,
      solution: solution,
      technology: technology
    },
    revalidate: 60,
  };
};
