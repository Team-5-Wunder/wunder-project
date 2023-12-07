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

  return (
    <div className="flex justify-center">
      <div className="mb-7 mt-5 lg:mb-10 xl:max-w-[80%] max-md:flex max-md:flex-col">
        {article.field_image && (
          <img
            src={absoluteUrl(article.field_image.uri.url)}
            alt={article.field_image.resourceIdObjMeta.alt}
            className={`float-left max-w-[250px] max-h-[250px] h-auto mb-4 mx-4 mr-8 ${isReversed ? "md:ml-8 md:mr-4 md:float-right" : ""}`}
          />
        )}
        <div className={`px-4 group/${article.title} group-hover/${article.title}:bg-scapaflow`}>
          <h3 className="text-primary-600 mb-2 text-heading-xs font-bold">
            {article.title}
          </h3>
          <p>
            {article.field_excerpt}
          </p>
          <Link className={`flex items-center mt-4 group-hover/${article.title}:bg-scapaflow`} href={article.path.alias}>
            <p className="text-primary-600">Read More</p>
            <ColorfulArrows />
          </Link>
        </div>
      </div>
    </div>
  );
}
