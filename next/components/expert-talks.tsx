import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { EventTeaser } from "@/components/event-teaser";
import { EventTeaser as EventTeaserType } from "@/lib/zod/event-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestEventsProps {
  events?: EventTeaserType[];
}

export function ExpertTalks({ events }: LatestEventsProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {/* {heading} */}
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

/* import Image from "next/image";
import { useTranslation } from "next-i18next";

import Link from "next/link";

interface Experts {
  image: string;
  speakers: string[];
  title: string;
  date: string;
  time: string;
  id: number;
  link: string;
}

const contacts: Experts[] = [
  {
    image: "/assets/expert_talks/gpt.png",
    speakers: ["Markus Virtanen", "Jussi Kalliokoski"],
    title: "Chat GPT in Drupal projects.",
    date: "21 DEC",
    time: "12:00 - 14:00",
    id: 1,
    link: "",
  },
  {
    image: "/assets/expert_talks/headless.jpg",
    speakers: ["Mikko Laitinen", "Jussi Kalliokoski, Markus Virtanen"],
    title: "Headless future with Drupal and NextJs.",
    date: "07 Jan",
    time: "10:30 - 12:00",
    id: 3,
    link: "",
  },
  {
    image: "/assets/expert_talks/ai.jpg",
    speakers: ["Janne Koponen"],
    title: "AI potential threats.",
    date: "15 JAN",
    time: "9:30 - 11:30",
    id: 2,
    link: "",
  },
];

export function ExpertTalks() {
  const { t } = useTranslation();

    // Intersection Observer callback function
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add the animation class with a delay for each element
          entry.target.style.animationDelay = `${index * 200}ms`;
          entry.target.classList.add('animate-[slideUp_0.5s_ease-in_forwards]');
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
        animatedExpertTalks.forEach(element => {
          observer.observe(element);
        });
      }
    }

  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[1664px] mt-20 mb-20 px-6 sm:px-16 flex flex-col">
          <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
            {t("expert-talks")}
          </h2>
          <div className="w-full flex flex-wrap gap-8 lg:gap-14 justify-center">
            {contacts?.map(({ id, image, title, speakers, date, time}) => {

              return (
                <div key={id} className="toSlideUpExp mt-20 opacity-0 w-80 h-[30rem] group/card rounded border border-finnishwinter hover:shadow-md">
                  <div className="w-full h-1/2 overflow-hidden">
                    <Image
                      src={image}
                      width={500}
                      height={500}
                      alt={title}
                      className="h-full object-cover group-hover/card:scale-110 duration-300"
                    />
                  </div>
                  <div className="relative h-1/2 text-left p-4 flex flex-col">
                    <div className="absolute top-[-70px] left-[50px] w-24 h-24 text-white bg-primary-600 shadow-2xl text-center flex flex-col justify-center">
                      <p className="mb-1 font-bold">{date}</p>
                      <p className="mt-1 text-xs">{time}</p>
                    </div>
                    <Link href="/expert-talks">
                      <h3 className="text-primary-600 mb-4 mt-8 font-bold text-heading-xs">
                        {title}
                      </h3>
                    </Link>
                    <div className="grow flex items-center">
                      <p className="text-secondary-900 text-left text-xs">Speakers: <br/><b>{speakers.join(", ")}</b></p>
                    </div>
                    <div className="flex items-end">
                      <Link href="/expert-talks">
                        <div className="flex items-center mt-4">
                          <p className="text-primary-600">Read more and register</p>
                          <div className="ml-2 flex items-center text-primary-600">
                            <hr className="w-0 border-primary-600 group-hover/card:w-10 duration-200" />
                            &#9654;
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
 */
