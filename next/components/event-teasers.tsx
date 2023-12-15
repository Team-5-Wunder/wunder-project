import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { EventTeaser as EventTeaserType } from "@/lib/zod/event-teaser";
import { absoluteUrl } from "@/lib/drupal/absolute-url";


interface LatestEventsProps {
  events?: EventTeaserType[];
}

export function EventTeasers({ events }: LatestEventsProps) {
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
      const animatedExpertTalks = document.querySelectorAll(".toSlideUpEvent");
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
          <Link href="/news-and-events">
            <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
              {t("coming-events")}
            </h2>
          </Link>
          <div className="w-full flex flex-wrap gap-8 lg:gap-14 justify-center">
            {events?.map((event) => {

              const date = new Date(event.field_start_time);
              //Converting the start_time into a format like "27 Dec"
              const formattedDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }).toUpperCase();
              // Getting the start_time in format like "19:30"
              const hours = date.getUTCHours();
              const minutes = date.getMinutes();
              // Format hours and minutes with leading zeros if needed
              const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
              
              let endTime = null
              if (event.field_end_time) {
                const endDate = new Date(event.field_end_time);
                // Getting the end_time in format like "19:30"
                const endHours = endDate.getUTCHours();
                const endMinutes = endDate.getMinutes();
                endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
              }

              let speakers
              event.field_event_speakers ?
              speakers = event.field_event_speakers.map((speaker) => speaker.field_speaker).join(", ") 
                :
              speakers = null
              
              return (
                <div key={event.id} className="toSlideUpEvent mt-20 opacity-0 w-80 h-[30rem] group/card rounded border border-finnishwinter hover:shadow-md">
                  {!events?.length && <p className="py-4">{t("no-content-found")}</p>}
                  {events?.length && (
                    <>
                      <div className="w-full h-1/2 overflow-hidden">
                        <Image
                          src={absoluteUrl(event.field_image.uri.url)}
                          width={500}
                          height={500}
                          priority={true}
                          alt={event.field_image.resourceIdObjMeta.alt}
                          className="h-full object-cover group-hover/card:scale-110 duration-300"
                        />
                      </div>
                      <div className="relative h-1/2 py-4 text-left flex flex-col">
                        <Link href={event.path.alias}>
                          <h3 className="text-primary-600 mx-4 mb-4 mt-4 font-bold text-heading-xs">
                            {event.title}
                          </h3>
                        </Link>
                        <div className="grow flex justify-end items-center">
                          <div className="p-4 w-52 h-12 text-white bg-secondary-900 flex justify-between items-center shadow-xl">
                            <p className="mx-4 font-bold">{formattedDate}</p>
                            <div className="text-xs">{startTime}{endTime? ` - ${endTime}`:""}</div>
                          </div>
                        </div>
                        <div className="mx-4 flex items-end">
                          <Link href={event.path.alias}>
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
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
