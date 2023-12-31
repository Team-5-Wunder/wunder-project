import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { EventTeaser } from "@/lib/zod/event-teaser";

interface EventTeaserProps {
  event: EventTeaser;
}

export function EventTeaser({ event }: EventTeaserProps) {
  const { t } = useTranslation();
  return (
    <div className="max-w-[22rem] h-[30rem] lg:max-xl:h-[25rem] p-4 group/card rounded border border-finnishwinter hover:shadow-md">
      <Link href={event.path.alias} className="flex flex-col w-full h-full">
        <h3 className="mb-2 text-heading-xs text-secondary-900">
          {event.title}
        </h3>
        <div className="w-full h-[70%] overflow-hidden">
          {event.field_image && (
            <Image
              src={absoluteUrl(event.field_image.uri.url)}
              width={600}
              height={600}
              alt={event.field_image.resourceIdObjMeta.alt}
              className="h-full object-cover group-hover/card:scale-110 duration-300"
            />
          )}
        </div>
        <div className="flex flex-row justify-center items-center my-4">
          {event.field_event_tags &&
            event.field_event_tags.map((tag, index) => (
              <div key={index} className="bg-primary-600 text-white p-2 text-sm border-0 rounded-md">
                {tag.name}
              </div>
            ))}
        </div>
      </Link>
    </div>
  );
}
