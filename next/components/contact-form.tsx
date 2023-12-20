import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { AuthGate } from "@/components/auth-gate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";
import { Textarea } from "@/ui/textarea";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";
import React from "react";
import { inter } from "@/styles/fonts";
import { UseTranslation } from "next-i18next";

type Inputs = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  terms: boolean;
};

const SignupSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
  phone: z.number(),
  company: z.string(),
  message: z.string(),
  terms: z.boolean().refine((val) => val === true, "Terms must be accepted."),
});

interface ContactFormProps {
  ref: string;
}

type TSignupSchema = z.infer<typeof SignupSchema>;

export const ContactForm = React.forwardRef<HTMLDivElement, ContactFormProps>(
  ({}, ref) => {
    const router = useRouter();
    const { t } = useTranslation();
    const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitSuccessful },
    } = useForm<Inputs>();

    const [checkboxGroupError, setCheckboxGroupError] = useState("");

    const onSubmit = async (data: TSignupSchema) => {
      if (!data.terms) {
        setCheckboxGroupError("You must ");
        return; // Prevent form submission
      }
      setCheckboxGroupError("");
      const response = await fetch(`/api/contact`, {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          company: data.company,
          message: data.message,
          terms: data.terms,
        }),
        // This will record the submission with the right language:
        headers: {
          "accept-language": router.locale,
        },
      });

      if (!response.ok) {
        alert("Error!");
      }
    };

    const onErrors = (errors) => console.error(errors);

    if (isSubmitSuccessful) {
      return (
        <StatusMessage level="success" className="mx-auto w-full max-w-3xl">
          <p className="mb-4">{t("form-thank-you-message")}</p>
          <Button type="button" onClick={() => reset()}>
            {t("form-send-another-message")}
          </Button>
        </StatusMessage>
      );
    }

    return (
      <div ref={ref}>
        <div className="flex justify-center pt-10 overflow-hidden h-126 lg:mr-14 px-5">
          <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="w-full max-w-lg"
          >
            <p className="">"*" {t("indicates required fields")}</p>
            {/*   <AuthGate text={t("login-to-fill-form")}> */}
            <>
              <div className="flex flex-wrap mb-2 pt-5">
                <div className="w-full md:w-1/2 pr-2 mb-6 md:mb-0 ">
                  <Label htmlFor="firstname">{t("First Name")} *</Label>
                  <Input
                    className="border-primary-100"
                    type="text"
                    id="name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <Label htmlFor="lastname">{t("Last Name")} *</Label>
                  <Input
                    className="border-primary-100"
                    type="text"
                    id="lastname"
                    {...register("lastname", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-full md:w-1/2 pr-2 mb-6 md:mb-0">
                  <Label htmlFor="email">{t("Email")} *</Label>
                  <Input
                    className="border-primary-100"
                    type="email"
                    id="email"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {/*   {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )} */}
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <Label htmlFor="email">{t("Phone")} *</Label>
                  <Input
                    className="border-primary-100"
                    type="number"
                    id="phone"
                    {...register("phone", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap  mb-6">
                <Label htmlFor="company">{t("Company")} *</Label>
                <Input
                  className="border-primary-100"
                  type="text"
                  id="company"
                  {...register("company", {
                    required: true,
                  })}
                />
              </div>

              <div className="flex flex-wrap mb-6">
                <Label htmlFor="message">{t("form-label-message")} *</Label>
                <Textarea
                  className="border-primary-100"
                  id="message"
                  {...register("message", {
                    required: true,
                  })}
                />
              </div>
              <label className="inline-flex items-center">
                <input
                  {...register("terms", {
                    required: true,
                  })}
                  type="checkbox"
                  className="form-checkbox text-primary-100"
                />
                <span className="px-5">
                  {t(
                    "I approve that Wunder process my personal data according to its privacy policy",
                  )}{" "}
                  *
                </span>
              </label>
              <Button className="mt-5" type="submit">
                {t("form-submit")}
              </Button>
            </>
            {/*    </AuthGate> */}
          </form>
        </div>
      </div>
    );
  },
);
