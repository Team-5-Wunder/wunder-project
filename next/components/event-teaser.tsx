import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { EventTeaser } from "@/lib/zod/event-teaser";

interface EventTeaserProps {
  event: EventTeaser;
}

export function EventTeaser({ event }: EventTeaserProps) {
  const { t } = useTranslation();
  return (
    <Link
      href={event.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {event.title}
      </h3>
      {event.field_image && (
        <Image
          src={absoluteUrl(event.field_image.uri.url)}
          width={384}
          height={240}
          alt={event.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
    </Link>
  );
}
