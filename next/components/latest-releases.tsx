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

  // Intersection Observer callback function
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the animation class when the element is in view
        entry.target.classList.add("animate-[slideUp_0.5s_ease-in_forwards]");
        observer.unobserve(entry.target);
      }
    });
  };

  // Create an Intersection Observer
  let observer = null;
  if (typeof window !== "undefined") {
    observer = new IntersectionObserver(handleIntersection);
    // Target the element to be animated
    const animatedLatestReleases = document.querySelectorAll(".toSlideUp");
    // Observe the target element

    if (animatedLatestReleases) {
      animatedLatestReleases.forEach((element) => {
        observer.observe(element);
      });
    }
  }

  return (
    <div className="w-screen flex justify-center" id="toSlideUp">
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 flex flex-col justify-start">
        <h2 className="mb-10 text-primary-600 text-heading-lg font-bold">
          {heading}
        </h2>
        {articles?.map((article, index) => (
          <div className="toSlideUp mt-20 opacity-0" key={article.id}>
            <ArticleTeaser article={article} isReversed={index % 2 !== 0} />
          </div>
        ))}

        <div className="flex items-center justify-center">
          {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
        </div>
      </div>
    </div>
  );
}
