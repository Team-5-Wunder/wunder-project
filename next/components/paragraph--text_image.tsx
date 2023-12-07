import { Media } from "@/components/media";
import { FormattedText } from "@/components/formatted-text";
import { TextImage as TextImageType } from "@/lib/zod/paragraph";

export function ParagraphTextImage({ paragraph }: { paragraph: TextImageType }) {
  return (
    <>
      {paragraph.field_text_image_layout === "left" &&
        <div className="grid xl:grid-cols-2">
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className="text-left text-md/xl text-white bg-primary-500 p-8 sm:text-lg"
          />
          <Media
            media={paragraph.field_image}
            priority={true}
            classname={"object-fill"}
          />
        </div>
      }
      {paragraph.field_text_image_layout === "right" &&
        <div className="grid xl:grid-cols-2">
          <Media
            media={paragraph.field_image}
            priority={true}
          />
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className="text-left text-md/xl text-white bg-primary-500 p-8 sm:text-lg"
          />
        </div>
      }
    </>
  );
}
