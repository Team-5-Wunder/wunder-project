import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphTextColumn({ paragraph }: { paragraph: FormattedTextType }) {
    return (
        <div className={clsx(
          paragraph.field_heading ? 
          "grid gap-0 grid-cols-1 lg:grid-cols-4" :
          "md:mx-16"
        )}>
          {paragraph.field_heading && (
            <div className="cols-span-1 bg-primary-500 flex justify-center items-center p-8 lg:p-4">
              <h2 className="text-heading-md text-center font-bold text-white md:text-heading-lg">{paragraph.field_heading}</h2>
            </div>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "text-left text-md/xl text-scapaflow sm:text-lg col-span-3 m-8",
              paragraph.field_heading && "mt-4",
            )}
          />
        </div>
      );
}
