import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";

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
import { DrupalTaxonomyTerm } from "next-drupal";

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
  const [tagsSearch, setTagsSearch] = useState<string[]>([]);

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
        {articleTeasers
        ?.filter((teaser) => (
          tagsSearch.every((filteredTag) => (
            teaser.field_tags.some((tag) => tag.name === filteredTag)
          ))))
        .map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
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
