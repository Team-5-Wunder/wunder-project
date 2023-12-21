import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
/* import { useRouter } from "next/router"; */
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
/* import { deserialize } from "next-drupal"; */
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { CaseTeaser } from "@/components/case-teaser";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
/* import { Pagination, PaginationProps } from "@/components/pagination"; */
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getLatestCasesItems } from "@/lib/drupal/get-cases";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  CaseTeaser as CaseTeaserType,
  validateAndCleanupCaseTeaser,
} from "@/lib/zod/case-teaser";
import Chevron from "@/styles/icons/chevron-down.svg";

/* import siteConfig from "@/site.config"; */
import { Checkbox } from "@/ui/checkbox";

interface CasesPageProps extends LayoutProps {
  caseTeasers: CaseTeaserType[];
  /* paginationProps: PaginationProps; */
  languageLinks: LanguageLinks;
  industry: DrupalTaxonomyTerm[];
  solution: DrupalTaxonomyTerm[];
  technology: DrupalTaxonomyTerm[];
}

export default function CasesPage({
  caseTeasers = [],
  /* paginationProps, */
  industry,
  solution,
  technology,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  /* const router = useRouter(); */
  const [industrySearch, setIndustrySearch] = useState<string[]>([]);
  const [solutionSearch, setsSolutionSearch] = useState<string[]>([]);
  const [technologySearch, setTechnologySearch] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  /* const [paginationNewProps, setPaginationNewProps] =
    useState<object>(paginationProps);
  const [cases, setCases] = useState<CaseTeaserType[]>(caseTeasers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [offset, setOffset] = useState<number>(0); */

  /* useEffect(() => {
    const page = +router.asPath.split("/")[2];
    if (page) {
      setOffset((page - 1) * limit);
      setCurrentPage(page);
    }
  }, [router.asPath]);

  useEffect(() => {
    const useBody = async () => {
      const body = {
        offset,
        limit,
        locale: siteConfig.defaultLocale,
        industry: industrySearch,
        solution: solutionSearch,
        technology: technologySearch,
      };
      const response = await fetch("/api/cases-filter", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();

        let totalPages;
        const pageRoot = "/cases";
        if (result.data) {
          const nodes = deserialize(result) as DrupalNode[];
          totalPages = Math.ceil(result.meta.count / limit);
          if (currentPage > totalPages) {
            void router.push([pageRoot, totalPages].join("/"), null, {
              scroll: false,
            });
          }
          setCases(
            nodes.map((teaser) => validateAndCleanupCaseTeaser(teaser)),
          );
        }

        // Create pagination props.
        const prevEnabled = currentPage > 1;
        const nextEnabled = currentPage < totalPages;

        // Create links for prev/next pages.
        const prevPage = currentPage - 1;
        const nextPage = currentPage + 1;
        const prevPageHref =
          currentPage === 2
            ? pageRoot
            : prevEnabled && [pageRoot, prevPage].join("/");
        const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

        setPaginationNewProps({
          currentPage,
          totalPages,
          prevEnabled,
          nextEnabled,
          prevPageHref,
          nextPageHref,
        });
      }
    };
    useBody();
  }, [limit, offset, industrySearch, solutionSearch, technologySearch]); */

  /* useEffect(() => {
    Object.keys(cases[1]).map((key) => console.log(cases[1][key]))
  }, [cases]) */

  /* useEffect(() => {
    console.log("Print data: " + JSON.stringify(cases));
  }, [cases]) */

  const handleCheckboxChange = (value: string, type: string) => {
    switch (type) {
      case "industry":
        if (industrySearch.includes(value)) {
          setIndustrySearch(industrySearch.filter((tag) => tag !== value));
        } else {
          setIndustrySearch([...industrySearch, value]);
        }
        break;
      case "solution":
        if (solutionSearch.includes(value)) {
          setsSolutionSearch(solutionSearch.filter((tag) => tag !== value));
        } else {
          setsSolutionSearch([...solutionSearch, value]);
        }
        break;
      case "technology":
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

  const toggleExpansion = () => {
    setIsExpanded((value) => !value);
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16">
        <Meta title={t("cases")} metatags={[]} />
        <div ref={focusRef} tabIndex={-1} />
        <HeadingPage>{t("our-cases")}</HeadingPage>
        <button
          className={clsx(
            "text-primary-600 flex flex-row w-full justify-between justify-items-center items-center text-heading-sm mt-16 bg-mischka p-8 border-0 rounded-t-2xl",
          )}
          onClick={toggleExpansion}
        >
          {t("apply-filters")}
          <Chevron
            className={clsx(
              "h-10 w-10 transition-all duration-200 ease-in-out",
              isExpanded ? "rotate-180" : "",
            )}
          />
        </button>
        <div
          className={clsx(
            "flex flex-col lg:flex-row justify-between text-sm text-white bg-primary-500 overflow-hidden transition-max-height duration-500 ease-in-out mb-16 px-24 border-0 rounded-b-sm",
            isExpanded ? "max-h-screen p-16" : "max-h-0 p-0",
          )}
        >
          <ul>
            <h2 className="text-xl mb-8">{t("Industry")}</h2>
            {industry.map((tag) => (
              <li
                key={tag.id}
                className="flex items-center text-sm text-steelgray"
              >
                <Checkbox
                  onClick={() => handleCheckboxChange(tag.name, "industry")}
                  id={tag.id}
                  className="bg-white hover:bg-stone transition-colors duration-200 ease-in-out"
                />
                <label
                  className="ml-2 text-sm text-white"
                  htmlFor={tag.id}
                  id={tag.id}
                >
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
          <ul>
            <h2 className="text-xl mb-8 mt-12 lg:mt-0">{t("Solution")}</h2>
            {solution.map((tag) => (
              <li
                key={tag.id}
                className="flex items-center text-sm text-steelgray"
              >
                <Checkbox
                  onClick={() => handleCheckboxChange(tag.name, "solution")}
                  id={tag.id}
                  className="bg-white hover:bg-stone transition-colors duration-200 ease-in-out"
                />
                <label
                  className="ml-2 text-sm text-white"
                  htmlFor={tag.id}
                  id={tag.id}
                >
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
          <ul>
            <h2 className="text-xl mb-8 mt-12 lg:mt-0">{t("Technology")}</h2>
            {technology.map((tag) => (
              <li
                key={tag.id}
                className="flex items-center text-sm text-steelgray"
              >
                <Checkbox
                  onClick={() => handleCheckboxChange(tag.name, "technology")}
                  id={tag.id}
                  className="bg-white hover:bg-stone transition-colors duration-200 ease-in-out"
                />
                <label
                  className="ml-2 text-sm text-white"
                  htmlFor={tag.id}
                  id={tag.id}
                >
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-4 grid gap-8 grid-cols-1 justify-items-center pb-20 md:grid-cols-2 lg:grid-cols-3">
          {caseTeasers
            ?.filter(
              (teaser) =>
                industrySearch.every((industry) =>
                  teaser.field_industry.some((tag) => tag.name === industry),
                ) &&
                solutionSearch.every((solution) =>
                  teaser.field_solution.some((tag) => tag.name === solution),
                ) &&
                technologySearch.every((technology) =>
                  teaser.field_technology.some(
                    (tag) => tag.name === technology,
                  ),
                ),
            )
            .map((client) => (
              <li key={client.id}>
                <CaseTeaser client={client} />
              </li>
            ))}
        </ul>
        {/* <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
      /> */}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
/* export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: ["1"] },
      },
    ],
    fallback: "blocking",
  };
}; */

export const getStaticProps: GetStaticProps<CasesPageProps> = async (
  context,
) => {
  /* // Get the page parameter:
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
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/"); */

  const { cases } = await getLatestCasesItems({
    locale: context.locale,
  });

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage("/cases", context);

  // fetch all taxonomies needed for filtering cases
  const industry = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--industry", context, {});
  const solution = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--solution", context, {});
  const technology = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--technology", context, {});

  return {
    props: {
      ...(await getCommonPageProps(context)),
      caseTeasers: cases.map((teaser) => validateAndCleanupCaseTeaser(teaser)),
      /* paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      }, */
      languageLinks,
      industry: industry,
      solution: solution,
      technology: technology,
    },
    revalidate: 60,
  };
};
