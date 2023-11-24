import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";
import ColorfulArrows from "@/styles/icons/colorful-arrows.svg";

interface ArticleTeaserProps {
  article: ArticleTeaser;
  isReversed?: boolean;
}
export function ArticleTeaser({ article, isReversed }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  const imageClassName = `px-4 ${isReversed ? "md:order-last md:ml-auto" : ""}`;

  return (
    <Link
      href={article.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <div className="flex flex-col md:flex-row -mx-4 ">
        <div className={`w-full ${imageClassName}`}>
          {article.field_image && (
            <Image
              src={absoluteUrl(article.field_image.uri.url)}
              width={600}
              height={200}
              alt={article.field_image.resourceIdObjMeta.alt}
              className="max-w-full h-auto object-cover"
            />
          )}
        </div>
        <div className="w-full px-4">
          <h3
            className={`mt-5 text-primary-600 mb-2 line-clamp-2 text-heading-xs font-bold ${
              isReversed ? "md:text-left" : ""
            }`}
          >
            {article.title}
          </h3>
          <p className={`${isReversed ? "" : "text-left"}`}>
            {article.field_excerpt}
          </p>
          <div className="flex  items-center mt-4">
            <p className="text-primary-600">Read More</p>
            <ColorfulArrows />
          </div>
        </div>
      </div>
    </Link>
  );
}
