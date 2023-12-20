import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Media } from "@/components/media";
import { PageHero as PageHeroType } from "@/lib/zod/paragraph";

export function ParagraphPageHero({ paragraph }: { paragraph: PageHeroType }) {
  return (
    <>
      <Media media={paragraph.field_image} priority={true} />
      <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      {paragraph.field_formatted_text && (
        <FormattedText
          html={paragraph.field_formatted_text.processed}
          className="text-left text-md/xl text-white bg-primary-500 p-8 sm:text-lg"
        />
      )}
    </>
  );
}
