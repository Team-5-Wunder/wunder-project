import Link from "next/link";
import { useTranslation } from "next-i18next";


const WeAreWunder = () => {
  const { t } = useTranslation();
  return (
    <div className="w-screen flex justify-center">
      <div className="h-[30vh] max-w-[1664px] mt-20 px-16 lg:flex">
        <div className="lg:w-1/2">
          <div className="mb-10 text-primary-600 text-heading-lg font-bold">
          {t("we-are-wunder")}
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-4 text-steelgray text-md">
            Our mission is to bring people together and shape the way digital services are used in everyday life. We help our clients to improve their digital business, competitiveness and customer experience.
          </div>
          <Link href="/cases">
            <div className="mt-6 flex text-primary-600">
              <div className="">
                Get to know us
              </div>
              <div className="ml-4">
                &#9654;
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeAreWunder;