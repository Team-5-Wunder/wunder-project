import Link from "next/link";
import { useTranslation } from "next-i18next";

import { EventTeaser as EventTeaserType } from "@/lib/zod/event-teaser";

import { ExpertTalksCard } from "./expert-talks-card";

interface LatestEventsProps {
  events?: EventTeaserType[];
}

export function ExpertTalks({ events }: LatestEventsProps) {
  const { t } = useTranslation();

  // Intersection Observer callback function
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add the animation class with a delay for each element
        entry.target.style.animationDelay = `${index * 200}ms`;
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
    const animatedExpertTalks = document.querySelectorAll(".toSlideUpExp");
    // Observe the target element

    if (animatedExpertTalks) {
      animatedExpertTalks.forEach((element) => {
        observer.observe(element);
      });
    }
  }

  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[1664px] mt-20 mb-20 px-6 sm:px-16 flex flex-col">
          <Link href="/news-and-events">
            <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
              {t("expert-talks")}
            </h2>
          </Link>
          <div className="w-full flex flex-wrap gap-8 lg:gap-14 justify-center">
            {events?.map((event) => {
              return (
                <div key={event.id}>
                  <ExpertTalksCard
                    event={event}
                    eventUrl={event.path.alias}
                    className="mt-20 toSlideUpExp opacity-0"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
