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
    <div className="">
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "text-left text-sm/lg text-scapaflow md:text-md/xl",
          paragraph.field_heading && "mt-4",
        )}
      />
    </div>
  );
}
