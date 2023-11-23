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
      className="grid h-full rounded border border-finnishwinter p-4 transition-all hover:shadow-md"
    >
      <div>
      <h3 className="mb-2 text-heading-xs text-secondary-900">
        {client.title}
      </h3>
        {/* <img className="w-full h-1/2" src={absoluteUrl(client.field_image.uri.url)} alt="Man and woman" /> */}
      </div>
      {client.field_image && (
        <Image
        src={absoluteUrl(client.field_image.uri.url)}
        width={600}
        height={240}
        alt={client.field_image.resourceIdObjMeta.alt}
        // className="h-1/2 object-cover"
        />
      )}
      <div className="my-4">{client.field_excerpt}</div>
    </Link>
  );
}
