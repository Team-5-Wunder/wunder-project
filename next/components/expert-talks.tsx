import Image from "next/image";
import { useTranslation } from "next-i18next";
import Link from "next/link";
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
          <div className="w-full flex flex-wrap gap-8 lg:gap-14 justify-center">
            {contacts?.map(({ id, image, title, speakers}) => {

              return (
                <div key={id} className="w-80 h-[30rem] rounded border border-finnishwinter transition-all hover:shadow-md">
                  <div className="w-full h-1/2">
                    {/* <Image
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      alt={title}
                      className="w-64 h-64 grayscale-1"
                    /> */}
                  </div>
                  <div className="relative h-1/2 text-left p-4 flex flex-col">
                    {/* <div className="absolut top-0 left-0 w-10 h-10 bg-secondary-200"></div> */}
                    <h3 className="text-primary-600 mb-4 font-bold text-heading-xs">
                      {title}
                    </h3>
                    <div className="grow flex items-center">
                      <p className="text-secondary-900 text-left text-xs">Speakers: <br/><b>{speakers.join(", ")}</b></p>
                    </div>
                    <div className="flex items-end">
                      <Link href="/expert-talks">
                        <div className="flex items-center mt-4">
                          <p className="text-primary-600">Read more and register</p>
                          <div className="ml-2 flex items-center text-primary-600">
                            <hr className="w-0 border-primary-600 group-hover/release:w-10 duration-200" />
                            &#9654;
                          </div>
                        </div>
                      </Link>
                    </div>
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
