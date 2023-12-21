import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphTextNormal({
  paragraph,
}: {
  paragraph: FormattedTextType;
}) {
  return (
    <div className="mt-10 w-full flex justify-center items-center">
      <div className="max-w-[800px] flex flex-col text-left">
        {paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )}
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className={clsx(
            "text-left text-sm/lg text-scapaflow md:text-md/xl",
            paragraph.field_heading && "mt-0",
          )}
        />
      </div>
    </div>
  );
}
