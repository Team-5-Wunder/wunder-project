import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { CaseTeaser } from "@/lib/zod/case-teaser";

interface CaseTeaserProps {
  client: CaseTeaser;
}

export function CaseTeaser({ client }: CaseTeaserProps) {
  
  return (
    // <Link
    // href={client.path.alias}
    // className="w-80 h-[30rem] p-4 group/card rounded border border-finnishwinter hover:shadow-md"
    // // className="grid h-full rounded border border-finnishwinter p-4 hover:shadow-md"
    // >
    //   <h3 className="mb-2 text-heading-xs text-secondary-900">
    //     {client.title}
    //   </h3>
    //   <div className="w-full h-[80%] overflow-hidden">
    //     {client.field_image && (
    //       <Image
    //       src={absoluteUrl(client.field_image.uri.url)}
    //       width={600}
    //       height={600}
    //       alt={client.field_image.resourceIdObjMeta.alt}
    //       className="h-full object-cover group-hover/card:scale-110 duration-300"
    //       />
    //     )}
    //   </div>
    //   <div className="my-4">{client.field_excerpt}</div>
    // </Link>
    <div className="w-80 h-[30rem] p-4 group/card rounded border border-finnishwinter hover:shadow-md">
      <h3 className="mb-2 text-heading-xs text-secondary-900">
        {client.title}
      </h3>
      <div className="w-full h-[80%] overflow-hidden">
        {client.field_image && (
          <Image
          src={absoluteUrl(client.field_image.uri.url)}
          width={600}
          height={600}
          alt={client.field_image.resourceIdObjMeta.alt}
          className="h-full object-cover group-hover/card:scale-110 duration-300"
          />
        )}
      </div>
      <div className="my-4">{client.field_excerpt}</div>
    </div>
  );
}
