import { Media } from "@/components/media";
import { Video } from "@/lib/zod/paragraph";

export function ParagraphVideo({ paragraph }: { paragraph: Video }) {
  return <Media 
            media={paragraph.field_video} 
            width={800}
            height={800}
            classname={""}
         />;
}
