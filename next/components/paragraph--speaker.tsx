import { FormattedText } from "@/components/formatted-text";
import { Media } from "@/components/media";
import { Speaker as SpeakerType } from "@/lib/zod/paragraph";
import { HeadingParagraph } from "@/components/heading--paragraph";

export function ParagraphSpeaker({
  paragraph,
}: {
  paragraph: SpeakerType;
}) {
  return (
    <>
        <div className="grid gap-4">
            {paragraph.field_image && 
                <Media
                    media={paragraph.field_image}
                    priority={true}
                    height={100}
                    width={100}
                    classname={"object-cover h-[100px] w-[100px] border-0 rounded-full"}
                />
            }
            {!paragraph.field_image && 
                <img src="/assets/carrot.png" alt="wunder" className="object-cover h-[100px] w-[100px] border-0 rounded-full" />
            }
            <HeadingParagraph>{paragraph.field_speaker}</HeadingParagraph>
        </div>
    </>
  );
}
