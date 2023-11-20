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

  const imageClassName = `px-4 w-full md:w-1/2 ${
    isReversed ? "md:order-last md:ml-auto" : ""
  }`;

  return (
    <Link
      href={article.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <div className="flex flex-wrap -mx-4 ">
        <div className={imageClassName}>
          {article.field_image && (
            <Image
              src={absoluteUrl(article.field_image.uri.url)}
              width={384}
              height={240}
              alt={article.field_image.resourceIdObjMeta.alt}
              className="max-w-full object-cover"
            />
          )}
        </div>
        <div className={`flex flex-col h-full justify-between`}>
          <h3 className="text-primary-600 max-w-xs mb-2 line-clamp-2 text-heading-xs font-bold ${isReversed ? 'text-left' : 'text-right'}">
            {article.title}
          </h3>
          <p className={` ${isReversed ? "text-right" : "text-left"}`}>
            lorem ipsum text here
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
