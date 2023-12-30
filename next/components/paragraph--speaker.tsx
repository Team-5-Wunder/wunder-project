import Image from "next/image";
import { Media } from "@/components/media";
import { Speaker as SpeakerType } from "@/lib/zod/paragraph";

export function ParagraphSpeaker({ paragraph }: { paragraph: SpeakerType }) {
  return (
    <>
      <div className="m-2 flex flex-col justify-center items-center">
        {paragraph.field_image && (
          <Media
            media={paragraph.field_image}
            priority={true}
            height={100}
            width={100}
            classname={"object-cover h-[100px] w-[100px] border-0 rounded-full"}
          />
        )}
        {!paragraph.field_image && (
          <Image
            width={100}
            height={100}
            priority={true}
            src="/assets/noPhoto.png"
            alt="no photo"
            className="object-cover h-[100px] w-[100px] border-0 rounded-full"
          />
        )}
        <div className="mt-2 text-secondary-900">{paragraph.field_speaker}</div>
      </div>
    </>
  );
}
