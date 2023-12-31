import Image from "next/image";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { CaseTeaser } from "@/lib/zod/case-teaser";

interface CaseTeaserProps {
  client: CaseTeaser;
}

export function CaseTeaser({ client }: CaseTeaserProps) {
  return (
    <div className="max-w-[22rem] h-[30rem] lg:max-xl:h-[25rem] p-4 group/card rounded border border-finnishwinter hover:shadow-md">
      <Link href={client.path.alias} className="flex flex-col w-full h-full">
        <h3 className="mb-2 text-heading-xs text-secondary-900">
          {client.title}
        </h3>
        <div className="w-full h-[70%] overflow-hidden">
          {client.field_image && (
            <Image
              src={absoluteUrl(client.field_image.uri.url)}
              width={1000}
              height={1000}
              alt={client.field_image.resourceIdObjMeta.alt}
              className="h-full object-cover group-hover/card:scale-110 duration-300"
            />
          )}
        </div>
        <div className="mt-4">{client.field_excerpt}</div>
      </Link>
    </div>
  );
}
