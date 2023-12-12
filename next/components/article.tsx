import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Article } from "@/lib/zod/article";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <article {...props}>
      <HeadingPage>{article.title}</HeadingPage>
      {article.field_excerpt && (
        <div className="my-4 text-xl">{article.field_excerpt}</div>
      )}
      <div className="mb-4 text-scapaflow">
        {article.uid?.display_name && (
          <div className="flex flex-row items-center">
            {article.uid?.field_user_image &&
              <Image
                src={absoluteUrl(article.uid?.field_user_image.uri.url)}
                width={50}
                height={50}
                style={{ width: 50, height: 50 }}
                alt={article.uid?.field_user_image.resourceIdObjMeta.alt}
                className="border-0 rounded-full object-cover"
                priority
              />
            }
            {!article.uid?.field_user_image && 
              <img src="/assets/carrot.png" alt="wunder" className="h-[50px] w-[50px] border-0 rounded-full" />
            }
            <span>
              {t("posted-by", { author: article.uid?.display_name })} -{" "}
            </span>
          </div>
        )}
        <span>{formatDate(article.created, router.locale)}</span>
      </div>
      {article.field_image && (
        <figure>
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          {article.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {article.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {article.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}
