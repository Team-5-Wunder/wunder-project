import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { TextQuote as TextQuoteType } from "@/lib/zod/paragraph";

export function ParagraphTextQuote({
  paragraph,
}: {
  paragraph: TextQuoteType;
}) {
  return (
    <>
      {paragraph.field_text_quote_layout === "left" && (
        <div className="md:mx-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className="text-md/xl text-scapaflow sm:text-lg"
          />
          <div className="flex justify-center items-center">
            <FormattedText
              html={paragraph.field_quote.processed}
              className="text-md/xl text-scapaflow sm:text-lg italic"
            />
          </div>
        </div>
      )}
      {paragraph.field_text_quote_layout === "right" && (
        <div className="md:mx-16 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center items-center">
            <FormattedText
              html={paragraph.field_quote.processed}
              className="text-md/xl text-scapaflow sm:text-lg italic"
            />
          </div>
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className="text-md/xl text-scapaflow sm:text-lg"
          />
        </div>
      )}
    </>
  );
}
