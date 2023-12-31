import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { CareersTeaser } from "@/lib/zod/careers-teaser";

interface CareersTeaserProps {
  careers: CareersTeaser;
}

export function CareersTeaser({ careers }: CareersTeaserProps) {
  const { t } = useTranslation();
  return (
    <Link
      href={careers.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md overflow-hidden"
    >
      {/* <h3 className="line-clamp-2 text-heading-xs font-bold">
        {careers.title}
      </h3> */}
      {careers.field_image && (
        <Image
          src={absoluteUrl(careers.field_image.uri.url)}
          width={384}
          height={240}
          alt={careers.field_image.resourceIdObjMeta.alt}
          className="object-contain h-[240px] w-[384px]"
        />
      )}
      <div className="flex flex-row justify-center items-center pt-2">
        {careers.field_country.map((career) => (
          <div key={career.name} className="bg-mischka p-1 m-1 text-xs">{career.name}</div>
        ))}
      </div>
    </Link>
  );
}
