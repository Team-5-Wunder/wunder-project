import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
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
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  ArticleTeaser as ArticleTeaserType,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalTaxonomyTerm, DrupalNode } from "next-drupal";
import siteConfig from "@/site.config";
import { useRouter } from "next/router";
import { deserialize } from "next-drupal";

import { Checkbox } from "@/ui/checkbox";

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
  const [paginationNewProps, setPaginationNewProps] = useState<object>(paginationProps);
  const [articles, setArticles] = useState<ArticleTeaserType[]>(articleTeasers);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const page = +router.asPath.split("/")[2];
    if (page) {
      setOffset((page - 1) * limit)
      setCurrentPage(page)
    }
  }, [router.asPath])

  useEffect(() => {    
    const useBody = async() => {
      let body = {offset, limit, locale:siteConfig.defaultLocale, tags:tagsSearch}
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
            void router.push([pageRoot, totalPages].join("/"), null, { scroll: false })
          }
          setArticles(nodes.map((teaser) =>
            validateAndCleanupArticleTeaser(teaser),
          ))
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
        })
      }
    }
    useBody();
  }, [limit, offset, tagsSearch])

  /* useEffect(() => {
    Object.keys(articles[1]).map((key) => console.log(articles[1][key]))
  }, [articles]) */

  /* useEffect(() => {
    console.log("Print data: " + JSON.stringify(articles));
  }, [articles]) */
  
  const handleCheckboxChange = (value: string) => {
    if (tagsSearch.includes(value)) {
      setTagsSearch(tagsSearch.filter((tag) => tag !== value));
    } else {
      setTagsSearch([...tagsSearch, value]);
    }
  };

  return (
    <div className=" w-full max-w-[1664px] mt-20 px-6 sm:px-16">
      <Meta title={t("blog")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("blog")}</HeadingPage>
      <div className="mb-16 flex justify-between text-sm text-steelgray">
        <ul>
          <h2 className="text-xl">Filter</h2>
          {tags.map((tag) => (
            <li
            key={tag.id}
            className="flex items-center text-sm text-steelgray">
              <Checkbox
                onClick={() => handleCheckboxChange(tag.name)}
                id={tag.id}
              />
              <label className="ml-2 text-sm" htmlFor={tag.id} id={tag.id}>
                {tag.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-4">
        {articles.length > 0 && articles
        .map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationNewProps}
      />
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

  const tags = await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>('taxonomy_term--tags', context, {})

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
      tags
    },
    revalidate: 60,
  };
};
