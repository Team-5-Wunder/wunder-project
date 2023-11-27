import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import WunderW from "@/styles/icons/wunder-w.svg";

interface Contact {
  image: string;
  name: string;
  title: string;
  phoneNumber: string;
  email: string;
  id: number;
}

const contacts: Contact[] = [
  {
    image: "/expert_1.png",
    name: "Markus Virtanen",
    title: "Chat GPT in Drupal projects.",
    phoneNumber: "",
    email: "",
    id: 1,
  },
  {
    image: "/expert_2.png",
    name: "Mikko Laitinen",
    title: "Headless future with Drupal and NextJs.",
    phoneNumber: "",
    email: "",
    id: 3,
  },
  {
    image: "/expert_3.png",
    name: "Janne Koponen",
    title: "How to grow a beautiful beard.",
    phoneNumber: "",
    email: "",
    id: 2,
  },
];

export function ExpertTalks() {
  const { t } = useTranslation();

  return (
    <>
      {/*       <div className=" mt-10  sm:px-16 flex flex-col"> */}
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 flex">
          <h2 className=" pb-5 text-heading-sm font-bold md:text-heading-md text-primary-600 ">
            Expert talks
          </h2>
          {/*     <div className="max-w-[1664px] grid auto-rows-max grid-cols-1 justify-items-center gap-4 py-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"> */}
          {contacts?.map(({ id, image, name, title, phoneNumber, email }) => {
            const [firstName, lastName] = name.split(" ");

            return (
              <div key={id} className="relative">
                <li className="grid justify-items-center p-4 border border-finnishwinter rounded-lg relative h-[450px] w-[330px] overflow-hidden">
                  <div className="absolute top-0 left-5 pt-5">
                    <WunderW />
                  </div>
                  <div className="flex h-[200px] w-[200px] items-center justify-center border-finnishwinter">
                    <div className="circle-clip">
                      <NextImage
                        src={image}
                        alt={t("image-of", { name })}
                        width={160}
                        height={160}
                      />
                    </div>
                  </div>
                  <div className=" w-[280px] text-right absolute pt-20 mt-20">
                    <p>
                      <span>{firstName}</span>
                      <br /> {lastName}
                    </p>
                  </div>

                  <p className="font-bold max-w-[200px] text-primary-600 text-center">
                    {title}
                  </p>
                  <div className="absolute bottom-4 right-4 flex items-center">
                    <p className="text-primary-600 pr-2">Read</p>
                  </div>
                  <a
                    href={`tel:${phoneNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hyperlink no-underline hover:underline text-primary-600"
                  >
                    {phoneNumber}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hyperlink no-underline hover:underline text-primary-600"
                  >
                    {email}
                  </a>
                </li>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
