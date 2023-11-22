import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { CaseTeaser } from "@/components/case-teaser";
import { CaseTeaser as CaseTeaserType } from "@/lib/zod/case-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestCasesProps {
  cases?: CaseTeaserType[];
  heading: string;
}

export function CaseTeasers({ cases, heading }: LatestCasesProps) {
  const { t } = useTranslation();
  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1664px] mt-20 px-16 flex flex-col">
        <h2 className="mb-10 text-primary-600 text-heading-lg font-bold">
          {heading}
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cases?.map((client) => (
            <li key={client.id}>
              <CaseTeaser client={client} />
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center">
          {!cases?.length && <p className="py-4">{t("no-content-found")}</p>}
          {cases?.length && (
            <Link
              href="/cases"
              className={clsx(
                buttonVariants({ variant: "primary" }),
                "text-base mr-4 mt-4 inline-flex px-5 py-3",
              )}
            >
              {t("cases")}
              <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
