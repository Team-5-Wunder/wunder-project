import Link from "next/link";
import { useTranslation } from "next-i18next";

import { CaseTeaser } from "@/components/case-teaser";
import { CaseTeaser as CaseTeaserType } from "@/lib/zod/case-teaser";

// This 2 imports are for css
import clsx from "clsx";
import { buttonVariants } from "@/ui/button";

interface LatestCasesProps {
  cases?: CaseTeaserType[];
  heading: string;
}

export function CaseTeasers({ cases, heading }: LatestCasesProps) {
  const { t } = useTranslation();

  // Intersection Observer callback function
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the animation class when the element is in view
            entry.target.classList.add('transition-translate', 'ease-in-out', 'delay-150', 'mt-0', 'duration-500');
            observer.unobserve(entry.target);
        }
    });
  };

  // Create an Intersection Observer
  let observer = null;
  if (typeof window !== "undefined"){
    observer = new IntersectionObserver(handleIntersection);
    // Target the element to be animated
    const animatedDiv = document.getElementById('caseTeasers');
    // Observe the target element
    observer.observe(animatedDiv);
  }


  return (
    <div id="caseTeasers" className="w-screen mt-20 flex justify-center">
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 flex">

        <div className="w-full flex flex-wrap">

          <div className="lg:w-1/2 pr-10 flex flex-col">
            <h2 className="mb-10 text-primary-600 text-heading-lg font-bold">
              {heading}
            </h2>
          
            <div className="2xl:w-4/5 mb-4 text-steelgray text-md">
              <p className="mb-2">We help our clients to improve their digital business, competitiveness and customer experience.</p> 
              <p>Shaping the digital experiences together with our clients. Take a look at some of our success stories.</p>
            </div>
            {cases?.length && (
              <Link href="/cases"
                className={clsx(
                    buttonVariants({ variant: "secondary" }),
                    "text-base mr-4 mt-4 inline-flex px-5 py-3 h-fit w-fit",
                  )}>
                <div>
                  {t("all-works")}
                </div>
              </Link>
            )}
          </div>

          <ul className="lg:w-1/2 mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 ">
            {cases?.map((client) => (
              <li key={client.id}>
                <CaseTeaser client={client} />
              </li>
            ))}
            <div className="flex items-center justify-center">
              {!cases?.length && <p className="py-4">{t("no-content-found")}</p>}
            </div>
          </ul>

        </div>
      </div>
    </div>
  );
}
