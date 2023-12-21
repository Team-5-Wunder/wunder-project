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
      <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1664px] mb-20 px-6 sm:px-16 flex flex-col">
      <div className="grid gap-8 md:grid-cols-2 w-full mt-20">
        {page.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
      </div>
      </div>
    </>
  );
}
