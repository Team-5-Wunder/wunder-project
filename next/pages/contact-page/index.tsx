import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ContactForm } from "@/components/contact-form";
import { Invoicing } from "@/components/invoicing";
import { MapComponent } from "@/components/map";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import { ExpertTalks } from "@/components/expert-talks";
import { HeroBannerContact } from "@/components/hero-banner-contact";
import React, { useRef } from "react";
import { OfficesList } from "@/components/office-list";

export default function ContactPage() {
  const contactFormRef = useRef(null);
  const mapRef = useRef(null);
  const invoicingRef = useRef(null);

  const scrollToRef = (ref) => {
    const offset = 100;

    if (ref.current) {
      const position = ref.current.offsetTop - offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <HeroBannerContact />
      <div className="mt-12 pt-10 flex justify-center overflow-hidden flex-col md:flex-row">
        <div className="w-4/5 -ml-16  flex flex-col">
          <div className="flex items-center border-b border-gray-300 pb-4">
            <div className="mr-4">{t("JUMP TO:")}</div>
            <nav>
              <ul className="flex">
                <li
                  className="mr-4 text-primary-600 cursor-pointer"
                  onClick={() => scrollToRef(contactFormRef)}
                >
                  {t("CONTACT FORM")}
                </li>
                <li
                  className="mr-4 text-primary-600 cursor-pointer"
                  onClick={() => scrollToRef(mapRef)}
                >
                  {t("OUR OFFICES")}
                </li>
                <li
                  className="mr-4 text-primary-600 cursor-pointer"
                  onClick={() => scrollToRef(invoicingRef)}
                >
                  {t("INVOICING")}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-14 grid grid-cols-1 lg:grid-cols-2 mb-6 md:mb-0 pl-10 pr-12">
         <h2 className="text-heading-lg lg:text-heading-lg text-primary-800">
           {t("Send us a message")}
        </h2>
        <ContactForm ref={contactFormRef} />
      </div>
      <MapComponent ref={mapRef} />
      <OfficesList />
      <Invoicing ref={invoicingRef} />
    </>
  );
}

export const getStaticProps: GetStaticProps<CommonPageProps> = async (
  context,
) => {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
    revalidate: 60,
  };
};
