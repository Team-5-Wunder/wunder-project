import * as z from "zod";

import { FormControl, FormField, FormItem, FormLabel } from "@/ui/form";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Input } from "@/ui/input";
import Link from "next/link";
/* import { toast } from "@/ui/use-toast"; */
import { useForm } from "react-hook-form";
import router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = {
  news: boolean;
  careers: boolean;
  events: boolean;
  email: string;
  terms: string;
};

const FormSchema = z.object({
  news: z.boolean().default(false).optional(),
  careers: z.boolean().default(false).optional(),
  events: z.boolean().default(false).optional(),
  terms: z.boolean().default(false),
  email: z.string().default(""),
});
export const NewsletterForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (
      (data.careers || data.events || data.news) &&
      data.terms &&
      data.email
    ) {
      const response = await fetch(`/api/footer-newsletter`, {
        method: "POST",
        body: JSON.stringify({
          webform_id: "newsletter",
          news: data.news,
          careers: data.careers,
          events: data.events,
          email: data.email,
          terms: data.terms,
        }),
        headers: {
          "accept-language": router.locale,
        },
      });

      if (!response.ok) {
        alert("Error!");
      }
    } else {
      alert("Succes!");
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      news: false,
      careers: false,
      events: false,
      email: "",
      terms: false,
    },
  });

  return (
    <>
      <div className="ml-12 flex-1 flex flex-col justify-center ">
        <p>WANT TO HEAR MORE?</p>
        <p className="font-normal">
          Our international experts are ready to help you.
          <br />
          <span className="underline">Contact us!</span>
        </p>
      </div>

      <div className="flex-1">
        <p className="pb-5 font-bold">Stay up to date with our newsletter</p>
        <p className="pb-5">"*" indicates required fields</p>
        <p className="pb-5">I'M INTERESTED IN</p>
        <div className="pb-5 flex space-x-4 mt-2">
          <FormField
            control={form.control}
            name="news"
            render={({ field }) => (
              <FormItem className="flex flex-row py-0 px-3">
                <FormControl>
                  <Checkbox
                    aria-label={t("news")}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="px-2 mt-0 pt-0 flex  text-md">
                  {t("news")}
                </FormLabel>
              </FormItem>
            )}
          />
          {/* Repeat similar structure for "careers" and "events" with their respective names */}
          <FormField
            control={form.control}
            name="news"
            render={({ field }) => (
              <FormItem className="flex flex-row py-0 px-3">
                <FormControl>
                  <Checkbox
                    aria-label={t("careers")}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="px-2 mt-0 pt-0 flex  text-md">
                  {t("careers")}
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="news"
            render={({ field }) => (
              <FormItem className="flex flex-row py-0 px-3">
                <FormControl>
                  <Checkbox
                    aria-label={t("events")}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="px-2 mt-0 pt-0 flex  text-md">
                  {t("events")}
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="pb-5 mt-4">
          {/* FormField for email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("Enter your email")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="pb-5 flex space-x-4 mt-2">
          {/* Repeat similar structure for "careers" and "events" with their respective names */}
        </div>
        <div className="pb-5 mt-4">
          {/* FormField for email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("Enter your email")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {/* FormField for terms */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <Button variant="quatriary" className="mt-10 text-white">
            {t("Subscribe")}
          </Button>
        </form>
      </div>
    </>
  );
};
