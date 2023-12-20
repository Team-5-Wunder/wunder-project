import clsx from "clsx";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { deserialize } from "next-drupal";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

import { ArticleListItem } from "@/components/article-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  ArticleTeaser as ArticleTeaserType,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";

import siteConfig from "@/site.config";
import { Checkbox } from "@/ui/checkbox";
import Chevron from "@/styles/icons/chevron-down.svg";

interface BlogPageProps extends LayoutProps {
  articleTeasers: ArticleTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
  tags: DrupalTaxonomyTerm[];
}

export default function BlogPage({
  articleTeasers = [],
  paginationProps,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [tagsSearch, setTagsSearch] = useState<string[]>([]);
  const [paginationNewProps, setPaginationNewProps] =
    useState<object>(paginationProps);
  const [articles, setArticles] = useState<ArticleTeaserType[]>(articleTeasers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [offset, setOffset] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
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
        tags: tagsSearch,
      };
      const response = await fetch("/api/blog-filter", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();

        let totalPages;
        const pageRoot = "/blog";
        if (result.data) {
          const nodes = deserialize(result) as DrupalNode[];
          totalPages = Math.ceil(result.meta.count / limit);
          if (currentPage > totalPages) {
            void router.push([pageRoot, totalPages].join("/"), null, {
              scroll: false,
            });
          }
          setArticles(
            nodes.map((teaser) => validateAndCleanupArticleTeaser(teaser)),
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
  }, [limit, offset, tagsSearch]);

  const handleCheckboxChange = (value: string) => {
    if (tagsSearch.includes(value)) {
      setTagsSearch(tagsSearch.filter((tag) => tag !== value));
    } else {
      setTagsSearch([...tagsSearch, value]);
    }
  };

  const toggleExpansion = () => {
    setIsExpanded((value) => !value);
  };

  return (
    <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16">
      <Meta title={t("blog")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("blog")}</HeadingPage>
      <button
        className={clsx(
          "text-primary-600 flex flex-row w-full justify-between justify-items-center items-center text-heading-sm mt-16 bg-mischka p-8 border-0 rounded-t-2xl"
        )}
        onClick={toggleExpansion}
      >
        {t("apply-filters")}
        <Chevron className={clsx(
          "h-10 w-10 transition-all duration-200 ease-in-out",
          isExpanded ? "rotate-180" : ""
        )} />
      </button>
      <div
        className={clsx(
          "flex flex-col lg:flex-row justify-between text-sm text-white bg-primary-500 overflow-hidden transition-max-height duration-500 ease-in-out mb-16 px-24 border-0 rounded-b-sm",
          isExpanded ? 'max-h-screen p-16' : 'max-h-0 p-0'
        )}
      >
        <ul>
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="flex items-center text-sm text-steelgray"
            >
              <Checkbox
                onClick={() => handleCheckboxChange(tag.name)}
                id={tag.id}
                className="bg-white hover:bg-stone transition-colors duration-200 ease-in-out"
              />
              <label className="ml-2 text-sm text-white" htmlFor={tag.id} id={tag.id}>
                {tag.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-4">
        {articles.length > 0 &&
          articles.map((article) => (
            <li key={article.id}>
              <ArticleListItem article={article} />
            </li>
          ))}
      </ul>
      <div className="w-full flex justify-center mt-10 mb-20">
        <div className="max-w-[700px] flex flex-grow justify-between">
          <Pagination
            focusRestoreRef={focusRef}
            paginationProps={paginationNewProps}
          />
        </div>
      </div>
    </div>
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

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context,
) => {
  // Get the page parameter:
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, articles } = await getLatestArticlesItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/blog";
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

  const tags = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--tags", context, {});

  return {
    props: {
      ...(await getCommonPageProps(context)),
      articleTeasers: articles.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
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
      tags,
    },
    revalidate: 60,
  };
};
