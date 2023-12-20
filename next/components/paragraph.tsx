import dynamic from "next/dynamic";

import { ParagraphFileAttachments } from "@/components/paragraph--file-attachments";
import { ParagraphHero } from "@/components/paragraph--hero";
import { ParagraphImage } from "@/components/paragraph--image";
import { ParagraphLinks } from "@/components/paragraph--links";
import { ParagraphListingArticles } from "@/components/paragraph--listing-articles";
import { ParagraphListingCareers } from "@/components/paragraph--listing-careers";
import { ParagraphPageHero } from "@/components/paragraph--page_hero";
import { ParagraphQuote } from "@/components/paragraph--quote";
import { ParagraphSpeaker } from "@/components/paragraph--speaker";
import { ParagraphText } from "@/components/paragraph--text";
import { ParagraphTextImage } from "@/components/paragraph--text_image";
import { ParagraphTextQuote } from "@/components/paragraph--text_quote";
import { Paragraph } from "@/lib/zod/paragraph";

// Use dynamic imports to defer loading a component until after initial page load: https://nextjs.org/docs/advanced-features/dynamic-import
const ParagraphVideo = dynamic(() =>
  import("./paragraph--video").then((mod) => mod.ParagraphVideo),
);

const ParagraphAccordion = dynamic(() =>
  import("./paragraph--accordion").then((mod) => mod.ParagraphAccordion),
);

export function Paragraph({ paragraph }: { paragraph: Paragraph }) {
  if (!paragraph) {
    return null;
  }

  switch (paragraph.type) {
    case "paragraph--formatted_text": {
      return <ParagraphText paragraph={paragraph} />;
    }
    case "paragraph--links": {
      return <ParagraphLinks paragraph={paragraph} />;
    }
    case "paragraph--image": {
      return <ParagraphImage paragraph={paragraph} />;
    }
    case "paragraph--video": {
      return <ParagraphVideo paragraph={paragraph} />;
    }
    case "paragraph--accordion": {
      return <ParagraphAccordion paragraph={paragraph} />;
    }
    case "paragraph--hero": {
      return <ParagraphHero paragraph={paragraph} />;
    }
    case "paragraph--listing_articles": {
      return <ParagraphListingArticles paragraph={paragraph} />;
    }
    case "paragraph--file_attachments": {
      return <ParagraphFileAttachments paragraph={paragraph} />;
    }
    case "paragraph--quote": {
      return <ParagraphQuote paragraph={paragraph} />;
    }
    case "paragraph--text_quote": {
      return <ParagraphTextQuote paragraph={paragraph} />;
    }
    case "paragraph--text_image": {
      return <ParagraphTextImage paragraph={paragraph} />;
    }
    case "paragraph--page_hero": {
      return <ParagraphPageHero paragraph={paragraph} />;
    }
    case "paragraph--speaker": {
      return <ParagraphSpeaker paragraph={paragraph} />;
    }
    case "paragraph--listing_careers": {
      return <ParagraphListingCareers paragraph={paragraph} />;
    }
    default:
      return null;
  }
}
