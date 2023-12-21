import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { buttonVariants } from "@/ui/button";

interface WeAreWunder {
  className?: string | undefined;
}

const WeAreWunder = () => {
  const { t } = useTranslation();
  return (
    <div className="w-screen flex justify-center">
      <div className="min-h-[30vh] max-w-[1664px] mt-20 px-6 sm:px-16 lg:flex">
        <div className="lg:w-1/2">
          <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
            {t("we-are-wunder")}
          </h2>
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-4 text-steelgray text-md">
            {t("Our mission is to bring people together and shape the way digital services are used in everyday life. We help our clients to improve their digital business, competitiveness and customer experience.")}
          </div>
          <Link
            href="/cases"
            className={clsx(
              buttonVariants({ variant: "secondary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3 h-fit w-fit",
            )}
          >
            {t("get-to-know-us")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeAreWunder;
