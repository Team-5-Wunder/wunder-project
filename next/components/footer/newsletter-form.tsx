import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Input } from "@/ui/input";
import Link from "next/link";
/* import { toast } from "@/ui/use-toast"; */
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
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
      alert("Thank you for subscribing to our newsletter!");
      /* toast({
        variant: "success",
        title: "Thank you for subscribing to our newsletter!",
      }); */

      const response = await fetch(`/api/footer-newsletter`, {
        method: "POST",
        body: JSON.stringify({
          webform_id: "footer_newsletter",
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
        alert("Please, chose at least one option and accept the terms and conditions.");
     /*  toast({
        variant: "destructive",
        title:
          "Please, chose at least one option and accept the terms and conditions.",
      });
    }*/
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
    <div className="px-6 flex-col">
      <h3 className="text-2xl font-bold uppercase tracking-wider py-2">
        {" "}
        {t("footer-newsletter-subscribe")}
      </h3>
      <p className="max-w-sm text-md">{t("footer-newsletter-intro")}</p>
      <p className="py-3 text-md">{t("footer-newsletter-interest")}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-row  ">
            <FormField
              control={form.control}
              name="news"
              render={({ field }) => (
                <FormItem className="flex flex-row py-0 px-3">
                  <FormControl>
                    <Checkbox
                      aria-label={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="px-2 mt-0 pt-0 flex  text-md">
                    News
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem className="flex flex-row px-3">
                  <FormControl>
                    <Checkbox
                      aria-label={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="px-2 mt-0 pt-0 flex  text-md">
                    Events
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="careers"
              render={({ field }) => (
                <FormItem className="flex flex-row">
                  <FormControl>
                    <Checkbox
                      aria-label={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="px-2 mt-0 pt-0 flex  text-md">
                    Careers
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-4 align-middle ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="py-2 my-2 text-steelgray"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant={"secondary"}
              className="hover:bg-finnishwinter hover:text-primary-800 my-1 min-w-[150px] max-h-12"
              size="md"
              type={"submit"}
            >
              {t("form-subscribe")}
            </Button>
          </div>
          <div className="flex flex-row gap-4 pt-4">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start">
                  <FormControl>
                    <Checkbox
                      aria-label={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <FormLabel htmlFor="terms" className=" max-w-sm text-md px-2">
                    {t("footer-newsletter-terms")}{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-mellow font-bold"
                    >
                      {" "}
                      Privacy Policy{" "}
                    </Link>
                    .*
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
