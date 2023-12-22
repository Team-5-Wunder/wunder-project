import { Media } from "@/components/media";
import { Image } from "@/lib/zod/paragraph";

export function ParagraphImage({ paragraph }: { paragraph: Image }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[800px]">
        <Media 
          media={paragraph.field_image}
          priority={true}
          width={800}
          height={800}
          classname={""}
        />
      </div>
    </div>
  )
}
