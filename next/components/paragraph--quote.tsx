import Image from "next/image";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { Media } from "@/components/media";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Quote as QuoteType } from "@/lib/zod/paragraph";

export function ParagraphQuote({ paragraph }: { paragraph: QuoteType }) {
  return (
    <div className="mt-20 mb-10 w-full flex justify-center items-center">
      <div className="max-w-[1000px] flex flex-col text-center justify-center">
        <FormattedText
          html={paragraph.field_quote.processed}
          className={clsx(
            "text-lg text-info italic",
            paragraph.field_author && "mt-4",
          )}
        />
        {paragraph.field_author && (
          <div className="flex flex-row text-center justify-center">
            {paragraph.field_image && (
              <Media
                media={paragraph.field_image}
                priority={true}
                width={100}
                height={100}
                classname={"border-0 rounded-full"}
              />
            )}
            <h2 className="text-sm text-secondary-900">
              {paragraph.field_author.toUpperCase()}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
