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

export default function SearchPage() {
  const { t } = useTranslation();
  const router = useRouter();

  // useNextRouting is a custom hook that will integrate with Next Router with Search UI config
  // config is search-ui configuration.
  // baseUrl is the path to the search page

  return (
    <>
      <ContactForm />
      <MapComponent />
      <Invoicing />
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
