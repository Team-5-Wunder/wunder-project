import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { HeadingPage } from "@/components/heading--page";
import { Paragraph } from "@/components/paragraph";
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
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[1664px] mb-20 px-6 sm:px-16 flex flex-col">
          <div className="grid gap-8 lg:grid-cols-2 w-full mt-20">
            <figure>
              <Image
                src={absoluteUrl(article.field_image.uri.url)}
                width={768}
                height={480}
                alt={article.field_image.resourceIdObjMeta.alt}
                className="mb-10 object-contain"
                priority
              />
              {article.field_image.resourceIdObjMeta.title && (
                <figcaption className="py-2 text-center text-sm text-scapaflow">
                  {article.field_image.resourceIdObjMeta.title}
                </figcaption>
              )}
            </figure>

            <div>
              <HeadingPage>{article.title}</HeadingPage>
              <div className="mt-4 w-full flex flex-wrap">
                <div className="flex flex-grow">
                  <div className="mb-4 flex justify-start items-start">
                    <div className="text-md text-secondary-900">
                      {formatDate(article.created, router.locale)}
                    </div>
                  </div>
                </div>
                <div className="min-w-[40%]">
                  {article.uid?.display_name && (
                    <div className="m-2 flex flex-col justify-center items-center">
                      {article.uid?.field_user_image && (
                        <Image
                          src={absoluteUrl(
                            article.uid?.field_user_image.uri.url,
                          )}
                          width={100}
                          height={100}
                          alt={
                            article.uid?.field_user_image.resourceIdObjMeta.alt
                          }
                          className="object-cover h-[100px] w-[100px] border-0 rounded-full"
                          priority
                        />
                      )}
                      {!article.uid?.field_user_image && (
                        <Image
                          src="/assets/noPhoto.png"
                          width={100}
                          height={100}
                          alt="no photo"
                          className="object-cover h-[100px] w-[100px] border-0 rounded-full"
                          priority
                        />
                      )}
                      <div className="mt-2 text-secondary-900">
                        {t("posted-by", { author: article.uid?.display_name })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="my-4 text-md md:text-xl">
                {article.field_excerpt}
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1664px] mb-20 px-6 sm:px-16 flex flex-col">
            {article.field_content_elements?.map((paragraph) => (
              <Paragraph key={paragraph.id} paragraph={paragraph} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
