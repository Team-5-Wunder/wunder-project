import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
  heading: string;
}

export function LatestReleases({ articles, heading }: LatestArticlesProps) {
  const { t } = useTranslation();
  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1500px] mt-20 px-6 sm:px-16 flex flex-col">
        <h2 className="pb-10 text-primary-600 text-heading-lg font-bold">
          {heading}
        </h2>
        <ul>
          {articles?.map((article, index) => (
            <li key={article.id}>
              <ArticleTeaser
                key={article.id}
                article={article}
                isReversed={index % 2 !== 0}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center">
          {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
        </div>
      </div>
    </div>
  );
}
