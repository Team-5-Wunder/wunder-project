import { Hero } from "@/components/page-hero-banner";
import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";

interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  return (
    <>
      <Hero title={page.title} image={page.field_hero_image} />
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 grid gap-4">
        {page.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
    </>
  );
}
