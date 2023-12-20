import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";

import { CareersTeaser } from "@/components/careers-teaser";
import { LoadingSpinner } from "@/components/loading-spinner";
import { CareersTeaser as CareersTeaserType } from "@/lib/zod/careers-teaser";

export function CareersListing({ listingId }: { listingId: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useQuery(
    [`careers-${router.locale}-${listingId}`],
    async () => {
      const response = await fetch(`/api/careers-listing/${router.locale}`, {
        headers: {
          "accept-language": router.locale,
        },
      });

      return await response.json();
    },
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          data?.map((careers: CareersTeaserType) => (
            <li key={careers.id}>
              <CareersTeaser careers={careers} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
