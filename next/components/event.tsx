import Image from "next/image";

import { HeadingPage } from "@/components/heading--page";
import { Paragraph } from "@/components/paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import type { Event } from "@/lib/zod/event";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/ui/button";
import { useTranslation } from "next-i18next";

/* import { ParagraphMap } from "./paragraph-map"; */
import EventMap from "./event-map";
import { EventRegistration } from "./event-registration";


interface EventProps {
  event: Event;
}

export function Event({ event }: EventProps) {
  //DATE AND TIME FORMATTING
  //************************
  let startTime = null
  let formattedDate = null
  if (event.field_start_time) {
    // Getting the start_time in format like "19:30"
    const date = new Date(event.field_start_time);
    //Converting the start_time into a format like "27 Dec"
    formattedDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();
    // Getting the start_time in format like "19:30"
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    // Format hours and minutes with leading zeros if needed
    const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  let endTime = null
  if (event.field_end_time) {
    const endDate = new Date(event.field_end_time);
    // Getting the end_time in format like "19:30"
    const endHours = endDate.getUTCHours();
    const endMinutes = endDate.getMinutes();
    endTime = `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  }
  //************************

  const { t } = useTranslation();

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1664px] mb-20 px-6 sm:px-16 flex flex-col">
        <div className="grid gap-8 md:grid-cols-2 w-full mt-20">
          <div>
            <HeadingPage>{event.title}</HeadingPage>
            <div className="my-4 text-md md:text-xl">
              {event.field_excerpt}
            </div>
            <div className="mt-8 flex justify-center items-center">
              {event.field_content_elements?.map((paragraph) => (
                <Paragraph key={paragraph.id} paragraph={paragraph} />
              ))}
            </div>
          </div>
          <div>
            <figure>
              <Image
                src={absoluteUrl(event.field_image.uri.url)}
                width={768}
                height={480}
                alt={event.field_image.resourceIdObjMeta.alt}
                className="mb-10 object-contain"
                priority
              />
              {event.field_image.resourceIdObjMeta.title && (
                <figcaption className="py-2 text-center text-sm text-scapaflow">
                  {event.field_image.resourceIdObjMeta.title}
                </figcaption>
              )}
            </figure>
            <div className="flex flex-col flex-wrap">
              <div className="w-full flex flex-wrap">
                <div className="min-w-[40%] mb-6 mr-4">
                  {event.field_start_time &&
                    <div>
                        <p className="font-bold text-xl text-primary-600">{formattedDate}</p>
                        <div className="text-md">{startTime}{endTime? ` - ${endTime}`:""}</div>
                    </div>
                  }
                  {event.field_location && 
                    <div className="mt-2 text-md">{event.field_location}</div>
                  }
                </div>
                <div className="flex flex-grow">
                  <div className="mb-4 flex justify-start items-center">
                    {event.field_event_speakers[0] && (
                      <div className="flex flex-col">
                        <div className="font-bold text-xl text-primary-600">
                          {t("speakers")}
                        </div>
                        <div className="flex flex-wrap">
                          {event.field_event_speakers.map((paragraph) => (
                            <div key={paragraph.id} className="mr-4">
                              <Paragraph key={paragraph.id} paragraph={paragraph} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {event.field_enable_event_registration === "enable" && 
                <EventRegistration event_id={event.id} event_name={event.title} />
              }
            </div>
            {event.field_location && 
              <div className="mt-8">
                <EventMap address={event.field_location} />;
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
