import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { EventTeaser } from "@/components/event-teaser";
import { EventTeaser as EventTeaserType } from "@/lib/zod/event-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestEventsProps {
  events?: EventTeaserType[];
  heading: string;
}

export function EventTeasers({ events, heading }: LatestEventsProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {events?.map((event) => (
          <li key={event.id}>
            <EventTeaser event={event} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!events?.length && <p className="py-4">{t("no-content-found")}</p>}
        {events?.length && (
          <Link
            href="/news-and-events"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("news-and-events")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
