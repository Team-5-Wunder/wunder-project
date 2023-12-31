import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Event as EventType } from "@/lib/zod/event";
import { Speaker as SpeakerType } from "@/lib/zod/paragraph";

interface EventProps {
  event?: EventType;
  className?: string;
  eventUrl?: string;
}

export function ExpertTalksCard({ event, className, eventUrl }: EventProps) {
  const { t } = useTranslation();

  const date = new Date(event.field_start_time);
  //Converting the start_time into a format like "27 Dec"
  const formattedDate = date
    .toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    .toUpperCase();
  // Getting the start_time in format like "19:30"
  const hours = date.getUTCHours();
  const minutes = date.getMinutes();
  // Format hours and minutes with leading zeros if needed
  const startTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  let endTime = null;
  if (event.field_end_time) {
    const endDate = new Date(event.field_end_time);
    // Getting the end_time in format like "19:30"
    const endHours = endDate.getUTCHours();
    const endMinutes = endDate.getMinutes();
    // Format hours and minutes with leading zeros if needed
    endTime = `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`;
  }

  let speakers;
  event.field_event_speakers
    ? (speakers = event.field_event_speakers
        .map((speaker: SpeakerType) => speaker.field_speaker)
        .join(", "))
    : (speakers = null);

  return (
    <div
      key={event.id}
      className={clsx(
        className,
        "w-80 h-[30rem] group/card rounded border border-finnishwinter hover:shadow-md",
      )}
    >
      <Link href={eventUrl}>
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
        <div className="relative h-1/2 text-left p-4 flex flex-col">
          <div className="absolute top-[-70px] left-[50px] w-24 h-24 text-white bg-primary-600 shadow-2xl text-center flex flex-col justify-center">
            <p className="mb-1 font-bold">{formattedDate}</p>
            <div className="mt-1 text-xs">
              {startTime}
              {endTime ? ` - ${endTime}` : ""}
            </div>
          </div>

          <h3 className="text-primary-600 mb-4 mt-8 font-bold text-heading-xs">
            {event.title}
          </h3>

          {speakers && (
            <div className="grow flex items-center">
              <p className="text-secondary-900 text-left text-xs">
                Speakers: <br />
                <b>{speakers}</b>
              </p>
            </div>
          )}
          <div className="flex items-end">
            <div className="flex items-center mt-4">
              <p className="text-primary-600">Read more and register</p>
              <div className="ml-2 flex items-center text-primary-600">
                <hr className="w-0 border-primary-600 group-hover/card:w-10 duration-200" />
                &#9654;
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
