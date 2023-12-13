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
    <div className="md:mx-16">
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "text-left text-md/xl text-scapaflow sm:text-lg",
          paragraph.field_heading && "mt-4",
        )}
      />
    </div>
  );
}
