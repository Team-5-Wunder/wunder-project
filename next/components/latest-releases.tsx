import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { ArticleTeaser } from "@/components/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
  heading: string;
}

export function LatestReleases({ articles, heading }: LatestArticlesProps) {
  const { t } = useTranslation();

  useEffect(() => {
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
    const observer = new IntersectionObserver(handleIntersection);

    // Target the element to be animated
    const animatedLatestReleases = document.querySelectorAll(".toSlideUp");

    // Observe the target element
    if (animatedLatestReleases) {
      animatedLatestReleases.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => {
      // Clean up the observer when the component unmounts
      if (animatedLatestReleases) {
        animatedLatestReleases.forEach((element) => {
          observer.unobserve(element);
        });
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="w-screen flex justify-center" id="toSlideUp">
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 flex flex-col justify-start">
        <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
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
