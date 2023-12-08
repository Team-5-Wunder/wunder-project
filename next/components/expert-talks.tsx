import NextImage from "next/image";
import { useTranslation } from "next-i18next";
import WunderW from "@/styles/icons/wunder-w.svg";

interface Experts {
  image: string;
  speakers: string[];
  title: string;
  date: string;
  time: string;
  id: number;
  link: string;
}

const contacts: Experts[] = [
  {
    image: "/assets/expert_talks/gpt.png",
    speakers: ["Markus Virtanen", "Jussi Kalliokoski"],
    title: "Chat GPT in Drupal projects.",
    date: "",
    time: "",
    id: 1,
    link: "",
  },
  {
    image: "/expert_2.png",
    speakers: ["Mikko Laitinen", "Jussi Kalliokoski, Markus Virtanen"],
    title: "Headless future with Drupal and NextJs.",
    date: "",
    time: "",
    id: 3,
    link: "",
  },
  {
    image: "/expert_3.png",
    speakers: ["Janne Koponen"],
    title: "How to grow a beautiful beard.",
    date: "",
    time: "",
    id: 2,
    link: "",
  },
];

export function ExpertTalks() {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[1664px] mt-20 mb-20 px-6 sm:px-16 flex flex-col">
          <h2 className="mb-5 md:mb-10 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md lg:text-heading-lg">
            {t("expert-talks")}
          </h2>
          <div className="w-full flex gap-14 justify-center">
            {contacts?.map(({ id, image, title, speakers}) => {

              return (
                <div key={id} className="w-64 h-full rounded border border-finnishwinter p-4 transition-all hover:shadow-md">
                  <div className="w-full h-48 relative">
                    <NextImage
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      alt={title}
                      className=""
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-secondary-900 font-bold text-heading-xs">
                      {title}
                    </h3>
                    <p className="text-steelgray text-sm">{speakers.join(", ")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
