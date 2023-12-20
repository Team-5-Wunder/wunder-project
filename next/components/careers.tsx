import Image from "next/image";

import { Paragraph } from "@/components/paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import type { Careers } from "@/lib/zod/careers";

interface CareersProps {
  careers: Careers;
}

export function Careers({ careers }: CareersProps) {
  return (
    <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 grid gap-4">
      <Image
        src={absoluteUrl(careers.field_image.uri.url)}
        width={384}
        height={240}
        alt={careers.field_image.resourceIdObjMeta.alt}
        className="object-cover h-[240px] w-[384px]"
      />
      {careers.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
