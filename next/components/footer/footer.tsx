import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { Menu } from "@/lib/zod/menu";
import FacebookIcon from "@/styles/icons/facebook.svg";
import InstagramIcon from "@/styles/icons/instagram.svg";
import LinkedinIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";
import YoutubeIcon from "@/styles/icons/youtube.svg";

import { Button } from "@/ui/button";
import { StatusMessage } from "@/ui/status-message";

const SignupSchema = z
  .object({
    news: z.boolean().default(false),
    careers: z.boolean().default(false),
    events: z.boolean().default(false),
    email: z
      .string()
      .email("Please enter a valid email address")
      .nonempty("Email is required"),
    terms: z.boolean().refine((val) => val === true, "Terms must be accepted."),
  })
  .refine((data) => data.news || data.careers || data.events, {
    message: "You must select at least one option",
    path: ["checkboxGroup"],
  });

type TSignupSchema = z.infer<typeof SignupSchema>;

interface FooterProps {
  menu: Menu;
}

type CustomFieldErrors = FieldErrors<TSignupSchema> & {
  checkboxGroup?: {
    message: string;
  };
};

export function Footer({ menu }: FooterProps) {
  const [checkboxGroupError, setCheckboxGroupError] = useState("");
  const { t } = useTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const [message, setMessage] = useState<string>();
  const customErrors = errors as CustomFieldErrors;

  const onSubmit = async (data: TSignupSchema) => {
    if (!data.news && !data.careers && !data.events) {
      setCheckboxGroupError(t("You must select at least one option"));
      return; // Prevent form submission
    }
    setCheckboxGroupError("");
    console.log(data);

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
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        news: false,
        careers: false,
        events: false,
        email: "",
        terms: false,
      });
      setMessage(t("your-preferences-are-saved"));
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <footer className="pt-10 bg-gradient-to-br from-dark to-violet text-white border-t overflow-hidden px-6 flex flex-col md:flex-row justify-between items-start h-126 relative">
      <div className="mr-10 ml-0 lg:ml-10 lg:pl-8  flex-1 flex flex-col justify-between mb-6 md:mb-0 h-96">
        <div>
          <p className="mb-5">{t("WANT TO HEAR MORE?")}</p>
          <p className="font-normal text-lg">
            {t("Our international experts are ready to help you.")}
            <br />
            <Link href={"/contact"} className="underline">
              Contact us!
            </Link>
          </p>
        </div>
        <div>
          <p className=" mt-10 sm:text-base md:text-lg">{t("Follow us")}</p>
          <div className="mt-2 flex items-center space-x-4">
            <a
              href="https://www.facebook.com/wunder.io"
              className="hover:text-primary-600"
              aria-label="Facebook"
            >
              <FacebookIcon className="inline-block h-8 w-8" aria-hidden />
            </a>
            <a
              href="https://twitter.com/Wunder_io"
              className="hover:text-primary-600"
              aria-label="Twitter"
            >
              <TwitterIcon className="ml-2 inline-block h-8 w-8" aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/company/wunder.io/"
              className="hover:text-primary-600"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="ml-2 inline-block h-8 w-8" aria-hidden />
            </a>
            <a
              href="https://www.youtube.com/channel/UCsBoaJt5sX12IFBu1giXZJg"
              className="text-white hover:text-primary-600"
              aria-label="YouTube"
            >
              <YoutubeIcon className="ml-2 inline-block h-8 w-8" aria-hidden />
            </a>
            <a
              href="https://www.instagram.com/wunder.io/"
              className="hover:text-primary-600"
              aria-label="Instagram"
            >
              <InstagramIcon
                className="ml-2 inline-block h-8 w-8"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 mb-10">
        <p className="pb-5 font-bold sm:text-base md:text-lg">
          {t("Stay up to date with our newsletter")}
        </p>
        <p className="pb-5">"*" {t("indicates required fields")}</p>
        <p className="pb-5">{t("I'M INTERESTED IN")}</p>
        <div>
          {customErrors.checkboxGroup && (
            <p>{customErrors.checkboxGroup.message}</p>
          )}
        </div>

        <div className="pb-5 flex space-x-4 mt-2">
          <label className="inline-flex items-center">
            <input
              {...register("news")}
              type="checkbox"
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">{t("Wunder news")}</span>
          </label>
          <label className="inline-flex items-center">
            <input
              {...register("careers")}
              type="checkbox"
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">{t("Careers")}</span>
          </label>
          <label className="inline-flex items-center">
            <input
              {...register("events")}
              type="checkbox"
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">{t("Events")}</span>
          </label>
        </div>
        <div className="pb-5 mt-4">
          {t("Email")}
          <span className="text-red-500"> *</span>
          <input
            {...register("email")}
            type="email"
            className="bg-transparent mt-1 block w-full border-0 border-b-2 border-white focus:ring-0 focus:border-white text-white placeholder-white"
          />
          {errors.email && <p className="text-white">{errors.email.message}</p>}
        </div>
        <label className="inline-flex items-center">
          <input
            {...register("terms", {
              required: true,
            })}
            type="checkbox"
            className="form-checkbox text-primary-600"
          />
          <span className="ml-2">
            {t(
              "I approve that Wunder process my personal data according to its privacy policy",
            )}
            <span className="text-red-500"> *</span>
          </span>
        </label>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-items-center items-center mt-10"
        >
          <Button variant="quatriary" className="text-white">
            {t("subscribe")}
          </Button>
          {message && (
            <span className="text-white ml-8 text-center items-center">
              {message}
            </span>
          )}
        </form>
      </div>
    </footer>
  );
}
