import { ParagraphTextNormal } from "./paragraph--text-normal";
import { ParagraphTextColumn } from "./paragraph--text-columned";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  switch (paragraph.field_text_layout) {
    case "normal": {
      return <ParagraphTextNormal paragraph={paragraph} />;
    }
    case "column": {
      return <ParagraphTextColumn paragraph={paragraph} />;
    }

    default:
      return null;
  }
}
