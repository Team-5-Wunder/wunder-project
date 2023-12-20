import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { StatusMessage } from "@/ui/status-message";

type Inputs = {
  email: string;
};

export function EventRegistration(props) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(`/api/event-registration`, {
      method: "POST",
      body: JSON.stringify({
        event_id: props.event_id,
        event_name: props.event_name,
        email: data.email,
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
        <p className="mb-4">{t("event-registration-message")}</p>
      </StatusMessage>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="mb-4 flex w-[300px] flex-col gap-5 rounded border border-finnishwinter bg-white p-4 shadow-md transition-all hover:shadow-md"
    >
      <h2 className="font-bold text-xl text-primary-600">
        {t("register-to-event")}
      </h2>
        <>
          <div>
            <Label htmlFor="email">{t("form-label-email")}</Label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <Button type="submit">{t("register-button")}</Button>
        </>
    </form>
  );
}
