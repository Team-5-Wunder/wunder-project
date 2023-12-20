import Image from "next/image";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { Media } from "@/components/media";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Quote as QuoteType } from "@/lib/zod/paragraph";

export function ParagraphQuote({ paragraph }: { paragraph: QuoteType }) {
  return (
    <div className="md:mx-16">
      <FormattedText
        html={paragraph.field_quote.processed}
        className={clsx(
          "text-md/xl text-scapaflow sm:text-lg italic",
          paragraph.field_author && "mt-4",
        )}
      />
      {paragraph.field_author && (
        <div className="flex flex-row justify-end items-center">
          {paragraph.field_image && (
            <Media
              media={paragraph.field_image}
              priority={true}
              width={100}
              height={100}
              classname={"border-0 rounded-full"}
            />
          )}
          <h2 className="text-heading-sm text-scapaflow font-bold ml-4 italic">
            {paragraph.field_author}
          </h2>
        </div>
      )}
    </div>
  );
}
