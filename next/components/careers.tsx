import { Paragraph } from "@/components/paragraph";
import type { Careers } from "@/lib/zod/careers";

interface CareersProps {
  careers: Careers;
}

export function Careers({ careers }: CareersProps) {
  return (
    <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 grid gap-4">
      {careers.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
