import { Paragraph } from "@/components/paragraph";
import type { Case } from "@/lib/zod/case";

import Image from "next/image";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";

interface CaseProps {
  client: Case;
}

export function Case({ client }: CaseProps) {
  return (
    <div className="grid gap-4 grid-cols-2">
      <div>
        <HeadingPage>{client.title}</HeadingPage>
        <div className="my-4 text-xl">{client.field_excerpt}</div>
        {client.field_industry && (
        client.field_industry.map((tag) => (
          <h4 key={tag.name}>{tag.name}</h4>
          ))
        )}
        {client.field_solution && (
        client.field_solution.map((tag) => (
          <h4 key={tag.name}>{tag.name}</h4>
          ))
        )}
        {client.field_technology && (
        client.field_technology.map((tag) => (
          <h4 key={tag.name}>{tag.name}</h4>
          ))
        )}
      </div>
        <figure>
          <Image
            src={absoluteUrl(client.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={client.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          {client.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {client.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      <div className="grid gap-4 col-span-2">
        {client.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
    </div>
  );
}
