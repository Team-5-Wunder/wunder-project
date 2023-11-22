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
  const { t } = useTranslation();
  return (
    <Link
      href={client.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {client.title}
      </h3>
        <div>
          <img className="w-full h-1/2" src={absoluteUrl(client.field_image.uri.url)} alt="Man and woman" />
          <div>{client.field_excerpt}</div>
        </div>
      {/* {client.field_image && (
        <Image
          src={absoluteUrl(client.field_image.uri.url)}
          width={400}
          height={240}
          alt={client.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )} */}
    </Link>
  );
}
