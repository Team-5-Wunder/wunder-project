import Image from "next/image";

import { HeadingPage } from "@/components/heading--page";
import { Paragraph } from "@/components/paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import type { Event } from "@/lib/zod/event";

interface EventProps {
  event: Event;
}

export function Event({ event }: EventProps) {
  return (
    <div className="grid gap-4 grid-cols-2">
      <div>
        <HeadingPage>{event.title}</HeadingPage>
        <div className="my-4 text-xl">{event.field_excerpt}</div>
        <div>{event.field_date}</div>
      </div>
      <figure>
        <Image
          src={absoluteUrl(event.field_image.uri.url)}
          width={768}
          height={480}
          style={{ width: 768, height: 480 }}
          alt={event.field_image.resourceIdObjMeta.alt}
          className="object-cover"
          priority
        />
        {event.field_image.resourceIdObjMeta.title && (
          <figcaption className="py-2 text-center text-sm text-scapaflow">
            {event.field_image.resourceIdObjMeta.title}
          </figcaption>
        )}
      </figure>
      <div className="grid gap-4 col-span-2">
        {event.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
    </div>
  );
}
