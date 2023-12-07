import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";
/* import ColorfulArrows from "@/styles/icons/colorful-arrows.svg"; */

interface ArticleTeaserProps {
  article: ArticleTeaser;
  isReversed?: boolean;
}
export function ArticleTeaser({ article, isReversed }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);

  return (
    <div className="flex justify-center">
      <Link
        href={article.path.alias}
        className="p-4 mb-7 lg:mb-10 xl:max-w-[80%] flex"
      >
        <div className="ml-3 mt-5 flex  lg:flex-row">
            {article.field_image && (
              <img
                src={absoluteUrl(article.field_image.uri.url)}
                alt={article.field_image.resourceIdObjMeta.alt}
                className={`float-left max-w-[250px] max-h-[250px] h-auto mb-4 mx-4 flex ${isReversed ? "lg:order-last" : ""}`}
              />
            )}
          <div className=" px-4">
            <h3
              className={`text-primary-600 mb-2 line-clamp-2 text-heading-xs font-bold ${
                isReversed ? "md:text-left" : ""
              }`}
            >
              {article.title}
            </h3>
            <p>
              {article.field_excerpt}
            </p>
            <div className="flex  items-center mt-4">
              <p className="text-primary-600">Read More</p>
              {/*   <ColorfulArrows /> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
